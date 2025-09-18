import { useCallback, useState } from "react";
import HeaderComponent from "../../components/header/Header.component";
import CardComponent from "../../components/card/Card.component";
import SearchInputComponent from "../../components/searchInput/SearchInput.component";
//icons
import {
  KeyIcon,
  CategoryIcon,
  SecureIcon,
  GenerateIcon,
  AddIcon,
  CopyIcon,
  PasswordIcon,
  EyeIcon,
  ResetPinIcon,
} from "../../helpers/Icon.helper";
import SelectOptionComponent from "../../components/selectOption/SelectOption.component";
import ButtonComponent from "../../components/button/Button.component";
import PasswordCardComponent from "../../components/passwordCard/PasswordCard.component";
import ModalComponent from "../../components/modal/Modal.component";
import ReadOnlyInput from "../../components/readOnlyInput/ReadOnlyInput";
import ProgressBar from "../../components/progressbar/ProgressBar";
import RangeInput from "../../components/rangeInput/RangeInput";
import AddPasswordInput from "../../components/addInput/AddPasswordInput";
import CheckboxInput from "../../components/checkboxInput/CheckboxInput";
//hooks
import { usePasswordGenerator } from "../../hooks/passwordGenerator/usePasswordGenerator";
import { useCategories } from "../../hooks/categories/useCategories";
import {
  checkValidUrl,
  checkValidEmail,
} from "../../helpers/PasswordCheck.helper";
import { useCrendentails } from "../../hooks/credentail/useCredentails";
import { useToast } from "../../hooks/toast/useToast";
import { useUser } from "../../hooks/user/useUser";

//react query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordAddError, setPasswordAddError] = useState("");
  const [password, setPassword] = useState("ua0YG!}~R;XCbZ`EhEj");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    title: "",
    email: "",
    password: "",
    url: "",
    category_id: "",
  });
  const [limit, setLimit] = useState(50);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  //hooks

  const { fetchCategories } = useCategories();
  const queryClient = useQueryClient();
  const { createPasswordEntry, getAllPasswords } = useCrendentails();
  const { showSuccessToast } = useToast();
  const { user } = useUser();

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const [strength, setStrength] = useState({ score: 0, label: "Weak" });
  const { generateSecurePassword, getPasswordStrength } =
    usePasswordGenerator();

  const handleAddModalClose = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);
  const handleAddModalOpen = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const handleGenerate = useCallback(() => {
    const newPassword = generateSecurePassword({ length, ...options });
    setPassword(newPassword);
    setStrength(getPasswordStrength(newPassword));
  }, [length, options, generateSecurePassword, getPasswordStrength]);

  const generatePasswordOnly = useCallback(() => {
    const newPassword = generateSecurePassword({ length: 12, ...options });
    setPasswordFormData((prev) => ({
      ...prev,
      password: newPassword,
    }));
  }, [options, generateSecurePassword]);

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setOptions((prev) => ({
      ...prev,
      [name]: checked, // true / false
    }));
  };

  const handleCopied = useCallback(async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopyOpen(true);
      setTimeout(() => setCopyOpen(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, []);

  const handleChangeFormData = useCallback((e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  const { data: allPasswords } = useQuery({
    queryKey: ["all-passwords", user?.user_id, limit, search, category],
    queryFn: getAllPasswords,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  const removeErrorMessage = useCallback(() => {
    setPasswordAddError("");
  }, []);

  const mutation = useMutation({
    mutationFn: createPasswordEntry,
    onMutate: async (newCredential) => {
      await queryClient.cancelQueries({ queryKey: ["all-passwords"] });
      const previousPasswords =
        queryClient.getQueriesData("all-password") ?? [];
      queryClient.setQueriesData((old) => {
        const allPassword = {
          ...old,
          ...newCredential,
        };
        return allPassword;
      });
      return { previousPasswords };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["all-passwords"], context?.previousUsers);
      showSuccessToast(error?.message, "error");
      throw error;
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ["all-passwords"] });
      setIsAddModalOpen(false);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["all-passwords"] });
      showSuccessToast("Password created successfully");
      setPasswordFormData({
        title: "",
        email: "",
        password: "",
        url: "",
        category_id: "",
      });
      setIsAddModalOpen(false);
    },
  });

  const handleAddPassword = useCallback(
    (e) => {
      e.preventDefault();
      const { title, email, password, url, category_id } = passwordFormData;
      if (!title || !email || !password || !url || !category_id) {
        setPasswordAddError("All fields are required!");
        return null;
      }
      if (!checkValidEmail(email)) {
        setPasswordAddError("Invalid email format!");
      }

      if (!checkValidUrl(url)) {
        setPasswordAddError("Invalid url format");
      }
      if (mutation.isLoading) return;
      const payload = {
        user_id: user?.user_id,
        title: passwordFormData?.title,
        username: passwordFormData?.email,
        encrypted_password: passwordFormData?.password,
        url: passwordFormData?.url,
        notes: "",
        category_id: passwordFormData?.category_id,
      };
      mutation.mutate(payload);
    },
    [passwordFormData, mutation, user]
  );
  // console.log("passwordFormData", passwordFormData);
  const handleLimitChange = useCallback(() => {
    setLimit((prev) => prev + 1);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  console.log("allPasswords", search, category);
  return (
    <>
      <ModalComponent
        title="Password Generator"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}>
        <div className="generate-newpass-input">
          <ReadOnlyInput
            value={password}
            handleCopied={handleCopied}
            copyOpen={copyOpen}
          />
        </div>
        <div className="dashboard-progress-bar-section">
          <ProgressBar strength={strength} />
        </div>
        <div className="dashboard-range-input-section">
          <RangeInput
            onChange={(e) => setLength(Number(e.target.value))}
            value={length}
          />
        </div>
        <div className="dashboard-password-generator">
          <div className="char">Character Types</div>
          <div className="char-types">
            <div className="char-types__type">
              <CheckboxInput
                title="Uppercase Letters (A_Z)"
                onChange={handleCheckbox}
                name="includeUppercase"
                checked={options?.includeUppercase}
              />
            </div>
            <div className="char-types__type">
              <CheckboxInput
                title="Lowercase Letters"
                onChange={handleCheckbox}
                name="includeLowercase"
                checked={options?.includeLowercase}
                value={options?.includeLowercase}
              />
            </div>
            <div className="char-types__type">
              <CheckboxInput
                title="Numbers (0-9)"
                onChange={handleCheckbox}
                name="includeNumbers"
                checked={options?.includeNumbers}
                value={options?.includeLowercase}
              />
            </div>
            <div className="char-types__type">
              <CheckboxInput
                title="Symbols (!@#$...)"
                onChange={handleCheckbox}
                name="includeSymbols"
                checked={options.includeSymbols}
              />
            </div>
          </div>
        </div>
        <div className="dashboard-modal-footer">
          <div className="generate-action" onClick={handleGenerate}>
            <ButtonComponent varient="secondary" style="generator">
              <div className="icon">
                <GenerateIcon />
              </div>
              <div className="title">Generate Password</div>
            </ButtonComponent>
          </div>
          <div className="copy-action" onClick={() => handleCopied(password)}>
            <ButtonComponent varient="copy" style="generator">
              <div className="icon">
                <CopyIcon />
              </div>
              <div className="title">Copy</div>
            </ButtonComponent>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        title="Add New Password"
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}>
        <div className="dashboard-add-password">
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="Title *"
              type="text"
              placeholder="E.g: Google Account"
              onChange={handleChangeFormData}
              name="title"
              value={passwordFormData?.title}
              onFocus={removeErrorMessage}
              required
            />
          </div>
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="Username/Email"
              type="email"
              placeholder="E.g: nabaraj2055@gmail.com"
              onChange={handleChangeFormData}
              name="email"
              onFocus={removeErrorMessage}
              value={passwordFormData?.email}
              required
            />
          </div>
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="Password *"
              type="password"
              placeholder="Enter Password"
              onChange={handleChangeFormData}
              name="password"
              onFocus={removeErrorMessage}
              icon={<EyeIcon />}
              reset={<ResetPinIcon />}
              generatePassword={generatePasswordOnly}
              value={passwordFormData?.password}
              required
            />
          </div>
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="URl *"
              placeholder="E.g: www.salapbikasbank.com.np"
              type="text"
              onChange={handleChangeFormData}
              onFocus={removeErrorMessage}
              name="url"
              value={passwordFormData?.url}
              required
            />
          </div>
          <div className="dashboard-add-section">
            <SelectOptionComponent
              type="forPass"
              category="category"
              onChange={handleChangeFormData}
              name="category_id"
              onFocus={removeErrorMessage}
              value={passwordFormData?.category_id}
              required>
              {data !== undefined &&
                data.map((option) => (
                  <option key={option.category_id} value={option.category_id}>
                    {option.name}
                  </option>
                ))}
            </SelectOptionComponent>
          </div>
        </div>
        {
          <div className="add-password-error">
            {passwordAddError && (
              <p className="error-text">{passwordAddError}</p>
            )}
          </div>
        }
        <div className="dashboard-addPassword-footer">
          <div className="save-action" onClick={handleAddPassword}>
            <ButtonComponent varient="secondary" style="generator">
              <div className="title">Save Password</div>
            </ButtonComponent>
          </div>
          <div className="cancel-action" onClick={handleAddModalClose}>
            <ButtonComponent varient="copy" style="generator">
              <div className="icon">
                <CopyIcon />
              </div>
              <div className="title">Cancel</div>
            </ButtonComponent>
          </div>
        </div>
      </ModalComponent>
      <div className="dashboard-container">
        <div className="header-section">
          <HeaderComponent />
        </div>
        <div className="dashboard-main-section">
          <div className="wrapper">
            <div className="dashboard-display-card">
              <div className="card-list-section">
                <CardComponent
                  title="Total Passwords"
                  number={allPasswords?.data?.length || 0}
                  icon={<KeyIcon />}
                  iconColor="purple"
                />
              </div>
              <div className="card-list-section">
                <CardComponent
                  title="Categories"
                  number={data?.length || 0}
                  icon={<CategoryIcon />}
                  iconColor="green"
                />
              </div>
              <div className="card-list-section">
                <CardComponent
                  title="Security Score"
                  number="Good"
                  icon={<SecureIcon />}
                  iconColor="green"
                />
              </div>
            </div>
            <div className="dashboard-actions">
              <div className="search-action">
                <SearchInputComponent
                  placeholder="Search Passwords..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="category-action">
                <SelectOptionComponent
                  value={category}
                  onChange={handleCategoryChange}>
                  {data !== undefined &&
                    data.map((option) => (
                      <option key={option.category_id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                </SelectOptionComponent>
              </div>
              <div className="modal-actions">
                <div className="generate-action" onClick={handleOpenModal}>
                  <ButtonComponent>
                    <div className="icon">
                      <GenerateIcon />
                    </div>
                    <div className="title">Generate Password</div>
                  </ButtonComponent>
                </div>
                <div
                  className="addPassword-action"
                  onClick={handleAddModalOpen}>
                  <ButtonComponent varient="secondary">
                    <div className="icon">
                      <AddIcon />
                    </div>
                    <div className="title">Add Password</div>
                  </ButtonComponent>
                </div>
              </div>
            </div>
            {/* <div className="not-found">
            <div className="icon">
              <KeyIcon />
            </div>
            <div className="title">No Passwords Found</div>
            <div className="description">
              Try adding some passwords to get started.
            </div>
          </div> */}

            <div className="password-card-lists">
              <div className="password-card-item">
                {allPasswords?.data !== undefined &&
                  allPasswords?.data.map((data) => (
                    <PasswordCardComponent datas={data} setLimit={setLimit} />
                  ))}
              </div>
              {allPasswords?.data?.length >= limit && (
                <button className="show-more-btn" onClick={handleLimitChange}>
                  Show More
                </button>
              )}

              {/* <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>

              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>

              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
