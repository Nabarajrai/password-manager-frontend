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

//react query
import { useQuery } from "@tanstack/react-query";
const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);

  const { fetchCategories } = useCategories();

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const [password, setPassword] = useState("ua0YG!}~R;XCbZ`EhEj");
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

  const handleCheckbox = (e) => {
    setOptions((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };
  console.log("password", password, strength, length);
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

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  console.log("categories data:", data);
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
              />
            </div>
            <div className="char-types__type">
              <CheckboxInput
                title="Numbers (0-9)"
                onChange={handleCheckbox}
                name="includeNumbers"
                checked={options?.includeNumbers}
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
              placeholder="E.g: Google Account"
            />
          </div>
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="Username/Email"
              placeholder="E.g: nabaraj2055@gmail.com"
            />
          </div>
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="Password *"
              placeholder="Enter Password"
              icon={<EyeIcon />}
              copy={<CopyIcon />}
            />
          </div>
          <div className="dashboard-add-section">
            <SelectOptionComponent
              type="forPass"
              category="category"
              values={data}
            />
          </div>
        </div>
        <div className="dashboard-addPassword-footer">
          <div className="save-action">
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
                  number="0"
                  icon={<KeyIcon />}
                  iconColor="purple"
                />
              </div>
              <div className="card-list-section">
                <CardComponent
                  title="Categories"
                  number="7"
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
                <SearchInputComponent placeholder="Search Passwords..." />
              </div>
              <div className="category-action">
                <SelectOptionComponent />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
