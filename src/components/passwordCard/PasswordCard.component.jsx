import { memo, useCallback, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  EditIcon,
  DeleteIcon,
  UserIcon,
  CopyIcon,
  EyeIcon,
  LinkIcon,
  ShareIcon,
  EnablePasswordIcon,
  RemoveShareIcon,
} from "../../helpers/Icon.helper";
//components
import ReadOnlyInput from "../readOnlyInput/ReadOnlyInput";
import ModalComponent from "../modal/Modal.component";
import SelectOptionComponent from "../selectOption/SelectOption.component";
import ButtonComponent from "../button/Button.component";
import AddPasswordInput from "../addInput/AddPasswordInput";

//hooks
import { usePasswordGenerator } from "../../hooks/passwordGenerator/usePasswordGenerator";
import { useUserCreate } from "../../hooks/userCreate/useUserCreate";
import { useToast } from "../../hooks/toast/useToast";
import { useUser } from "../../hooks/user/useUser";
import { useCrendentails } from "../../hooks/credentail/useCredentails";
import { useCategories } from "../../hooks/categories/useCategories";
import { useClipboard } from "../../hooks/clipboard/useClipboard";
import { useAuth } from "../../hooks/user/useAuth";

//helpers
import {
  checkValidEmail,
  checkValidUrl,
  checkPinValid,
} from "../../helpers/PasswordCheck.helper";
import { FormatDate } from "../../helpers/DateFormat.helper";

const PasswordCardComponent = ({ datas }) => {
  const [copyOpen, setCopyOpen] = useState(false);
  const [copyUrl, setCopyUrl] = useState(false);
  const [copyPassword, setCopyPassword] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [otpNumber, setOtpNumber] = useState("");
  const [otpEnableNumber, setOtpEnableNumber] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [removeSharedPasswordModal, setRemoveSharedPasswordModal] =
    useState(false);
  const [passId, setPassId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    permisson_level: "",
  });
  const [serverPassword, setServerPassword] = useState(null);

  const [passwordFormData, setPasswordFormData] = useState({
    title: "",
    email: "",
    password: "",
    url: "",
    category_id: "",
    password_id: "",
  });

  const [userInfo, setUserInfo] = useState(null);

  const { getPasswordStrength } = usePasswordGenerator();
  const { pinService } = useAuth();
  const { fetchUsers } = useUserCreate();
  const {
    shareWithPassword,
    updatePassword,
    removeSharedPassword,
    deletePassword,
    passwordEntry,
  } = useCrendentails();
  const { showSuccessToast } = useToast();
  const { user } = useUser();
  const { fetchCategories } = useCategories();
  const { handleCopied } = useClipboard();

  const queryClient = useQueryClient();

  const generateClassNames = useCallback((params) => {
    let className = "";
    switch (params.toLowerCase()) {
      case "very strong":
        className = "very-strong";
        break;
      case "strong":
        className = "strong";
        break;
      case "good":
        className = "good";
        break;
      case "fair":
        className = "fair";
        break;
      case "weak":
        className = "weak";
        break;
      default:
        className = "very-strong";
    }
    return className;
  }, []);

  const openModal = useCallback((passId) => {
    setPassId(passId);
    setIsModalOpen(true);
  }, []);

  const {
    data,
    isError: isUserError,
    isPending: isUserPending,
    error: userError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const {
    data: categoryDatas,
    isError: isCategoryError,
    isPending: isCategoryPending,
    error: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  const mutation = useMutation({
    mutationFn: shareWithPassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-passwords"] });
      showSuccessToast("Password shared successfully");
    },
    onError: (error) => {
      console.error("Error sharing password:", error);
      showSuccessToast(error?.message || "Something went wrong", "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-passwords"] });
      showSuccessToast("Password shared successfully");
    },
    onError: (error) => {
      console.error("Error sharing password:", error);
      showSuccessToast(error || "Something went wrong", "error");
    },
  });

  const removePasswordSharedMutation = useMutation({
    mutationFn: removeSharedPassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-passwords"] });
      showSuccessToast("Password shared removed successfully");
      setRemoveSharedPasswordModal(false);
    },
    onError: (error) => {
      console.error("Error sharing password:", error);
      showSuccessToast(error || "Something went wrong", "error");
      setRemoveSharedPasswordModal(false);
    },
  });

  const removePasswordMutation = useMutation({
    mutationFn: deletePassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-passwords"] });
      showSuccessToast("Password deleted successfully");
    },
    onError: (error) => {
      console.error("Error sharing password:", error);
      showSuccessToast(error || "Something went wrong", "error");
    },
  });

  const getPasswordMutation = useMutation({
    mutationFn: passwordEntry,
    onSuccess: async (data) => {
      console.log("data", data?.decrypted_password);
      setServerPassword(data?.decrypted_password);
      showSuccessToast(data?.message || "Password fetched successfully");
    },
    onError: (error) => {
      console.error("Error pinning password:", error);
      showSuccessToast(error || "Something went wrong", "error");
    },
  });

  const getPasswordMutationCopy = useMutation({
    mutationFn: passwordEntry,
    onSuccess: async (data) => {
      setCopyPassword(data?.decrypted_password);
      handleCopied(data?.decrypted_password, setCopyPassword);
      showSuccessToast("Password copied successfully");
      setShowCopyModal(false);
    },
    onError: (error) => {
      console.error("Error pinning password:", error);
      showSuccessToast(error || "Something went wrong", "error");
      setShowCopyModal(false);
    },
  });

  const getPasswordMutationEnable = useMutation({
    mutationFn: passwordEntry,
    onSuccess: async (data) => {
      setPasswordFormData({
        ...passwordFormData,
        password: data?.decrypted_password,
      });
      showSuccessToast("Password retrieved successfully");
      setEditModal(true);
      setOtpEnableNumber("");
    },
    onError: (error) => {
      console.error("Error pinning password:", error);
      showSuccessToast(error || "Something went wrong", "error");
      setEditModal(false);
      setOtpEnableNumber("");
    },
  });

  const pinServiceMutation = useMutation({
    mutationFn: pinService,
    onSuccess: async () => {
      const payload = {
        userId: datas?.owner_user_id,
        passwordId: datas?.password_id,
      };
      getPasswordMutation.mutate(payload);
      setOtpModal(false);
      setOtpNumber("");
    },
    onError: (error) => {
      console.error("Error pinning password:", error);
      showSuccessToast(error || "Something went wrong", "error");
      setOtpModal(false);
      setOtpNumber("");
    },
  });
  const pinServiceMutationCopy = useMutation({
    mutationFn: pinService,
    onSuccess: async () => {
      const payload = {
        userId: datas?.owner_user_id,
        passwordId: datas?.password_id,
      };
      getPasswordMutationCopy.mutate(payload);
      setOtpModal(false);
      setOtpNumber("");
    },
    onError: (error) => {
      console.error("Error pinning password:", error);
      showSuccessToast(error || "Something went wrong", "error");
      setOtpModal(false);
      setOtpNumber("");
    },
  });

  const pinServiceMutationEnable = useMutation({
    mutationFn: pinService,
    onSuccess: async () => {
      const payload = {
        userId: datas?.owner_user_id,
        passwordId: datas?.password_id,
      };
      getPasswordMutationEnable.mutate(payload);
      setShowPin(false);
      setOtpEnableNumber("");
      setPasswordFormData((prev) => ({ ...prev, password: "" }));
      showSuccessToast("You can now see the password field");
    },
    onError: (error) => {
      console.error("Error pinning password:", error);
      showSuccessToast(error || "Something went wrong", "error");
      setShowPin(false);
      setOtpEnableNumber("");
      setPasswordFormData((prev) => ({ ...prev, password: "" }));
    },
  });

  const handleSharePassword = useCallback(() => {
    const { userId, permisson_level } = formData;
    if (!userId || !permisson_level) {
      showSuccessToast("All field are required", "error");
      return;
    }
    const payload = {
      user_id: user?.user_id,
      password_id: passId,
      shared_with_user_id: Number(formData?.userId),
      permission_level: formData?.permisson_level,
    };
    mutation.mutate(payload);
  }, [formData, showSuccessToast, user, passId, mutation]);

  const handleInput = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleOpenEdit = useCallback((passwordInfo) => {
    setPasswordFormData({
      title: passwordInfo?.title,
      email: passwordInfo?.username,
      password: passwordInfo?.encrypted_password,
      url: passwordInfo?.url,
      category_id: passwordInfo?.category_id,
      password_id: Number(passwordInfo?.password_id),
    });
    setEditModal(true);
  }, []);

  const handleChangeInput = useCallback((e) => {
    const { name, value } = e.target;
    setPasswordFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);
  const closeEditModal = useCallback(() => {
    setEditModal(false);
  }, []);

  const handleSubmitPassword = useCallback(
    (e) => {
      e.preventDefault();
      const { title, email, password, url, category_id } = passwordFormData;
      if (!title || !email || !password || !url || !category_id) {
        showSuccessToast("All fields are required!", "error");
        return null;
      }
      if (!checkValidEmail(email)) {
        showSuccessToast("Invalid email format!", "error");
      }

      if (!checkValidUrl(url)) {
        showSuccessToast("Invalid url format", "error");
      }
      if (updateMutation.isLoading) return;
      const payload = {
        user_id: user?.user_id,
        password_id: passwordFormData?.password_id,
        title: passwordFormData?.title,
        username: passwordFormData?.email,
        encrypted_password: passwordFormData?.password,
        url: passwordFormData?.url,
        notes: "",
        category_id: Number(passwordFormData?.category_id),
      };
      updateMutation.mutate(payload);
    },
    [updateMutation, passwordFormData, showSuccessToast, user]
  );

  const handlePasswordSharedModal = useCallback((userInfo) => {
    setRemoveSharedPasswordModal(true);
    setUserInfo(userInfo);
  }, []);
  const cancelPasswordShareModal = useCallback(() => {
    setRemoveSharedPasswordModal(false);
  }, []);
  const handleRemoveSharedPassword = useCallback(() => {
    const payload = {
      share_id: userInfo?.share_id,
      user_id: userInfo?.owner_user_id,
    };

    if (!payload.user_id || !payload.share_id) {
      showSuccessToast(
        "You are not authorized person to remove this password card",
        "error"
      );
      setRemoveSharedPasswordModal(false);
      return;
    }
    removePasswordSharedMutation.mutate(payload);
  }, [showSuccessToast, removePasswordSharedMutation, userInfo]);

  const handleDeletePassword = useCallback(() => {
    const payload = {
      password_id: datas?.password_id,
      user_id: user?.user_id,
    };
    if (!payload.user_id || !payload.password_id) {
      showSuccessToast(
        "All field are required to delete this password card",
        "error"
      );
      return;
    }
    if (removePasswordMutation.isLoading) return;
    removePasswordMutation.mutate(payload);
    setDeleteModal(false);
  }, [
    datas?.password_id,
    user?.user_id,
    removePasswordMutation,
    showSuccessToast,
  ]);

  const deletePasswordModal = useCallback(() => {
    setDeleteModal(true);
  }, []);
  const cancelDeletePasswordModal = useCallback(() => {
    setDeleteModal(false);
  }, []);

  const copyToClipboard = useCallback(
    (datas) => {
      handleCopied(datas, setCopyOpen);
    },
    [handleCopied]
  );

  const copyToUrlClipboard = useCallback(
    (datas) => {
      handleCopied(datas, setCopyUrl);
    },
    [handleCopied]
  );

  const copyToPasswordClipboard = useCallback(() => {
    setOtpModal(true);
  }, []);

  const validPinSubmit = useCallback(
    (datas) => {
      const payload = {
        email: datas?.username,
        pin: otpNumber,
      };
      if (!otpNumber) {
        showSuccessToast("OTP is required", "error");
        return;
      }
      if (!checkPinValid(otpNumber)) {
        showSuccessToast("Invalid pin format", "error");
        return;
      }
      pinServiceMutation.mutate(payload);
    },
    [pinServiceMutation, otpNumber, showSuccessToast]
  );

  const validPinSubmitCopy = useCallback(
    (datas) => {
      const payload = {
        email: datas?.username,
        pin: copyPassword,
      };
      if (!copyPassword) {
        showSuccessToast("OTP is required", "error");
        return;
      }
      if (!checkPinValid(copyPassword)) {
        showSuccessToast("Invalid pin format", "error");
        return;
      }
      pinServiceMutationCopy.mutate(payload);
    },
    [pinServiceMutationCopy, showSuccessToast, copyPassword]
  );
  const handleShowCopyModal = useCallback(() => {
    setShowCopyModal(true);
  }, []);

  const enablePasswordHandle = useCallback(() => {
    const payload = {
      email: datas?.username,
      pin: otpEnableNumber,
    };
    if (!otpEnableNumber) {
      showSuccessToast("OTP is required", "error");
      return;
    }
    if (!checkPinValid(otpEnableNumber)) {
      showSuccessToast("Invalid pin format", "error");
      return;
    }
    if (pinServiceMutationEnable.isLoading) return;
    pinServiceMutationEnable.mutate(payload);
  }, [pinServiceMutationEnable, datas, otpEnableNumber, showSuccessToast]);

  const cancelUpdatePasswordModal = useCallback(() => {
    setShowPin(false);
    setOtpEnableNumber("");
  }, []);

  useEffect(() => {
    if (serverPassword) {
      const timer = setTimeout(() => {
        setServerPassword(null);
        setPasswordFormData((prev) => ({ ...prev, password: "" }));
      }, 60 * 1000); // 1 min

      return () => clearTimeout(timer); // cleanup if password changes or unmounts
    }
  }, [serverPassword]);

  return (
    <>
      <ModalComponent
        title="Enter your 4 digit OTP number to copy password"
        isModalOpen={showCopyModal}
        setIsModalOpen={setShowCopyModal}>
        <div className="remove-password-containers">
          <div className="remove-password-input">
            <AddPasswordInput
              label="OTP *"
              type="text"
              placeholder="E.g: 1234"
              name="otp"
              onChange={(e) => setCopyPassword(e.target.value)}
              value={copyPassword}
              maxLength={4}
              required
            />
          </div>
          <div className="remove-password-actions">
            <div
              className="remove-password-btn"
              onClick={() => validPinSubmitCopy(datas)}>
              <ButtonComponent varient="secondary">Submit OTP</ButtonComponent>
            </div>
            <div className="remove-password-btn">
              <ButtonComponent varient="copy">Cancel</ButtonComponent>
            </div>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        title="Enter your 4 digit OTP number to see password"
        isModalOpen={otpModal}
        setIsModalOpen={setOtpModal}>
        <div className="remove-password-containers">
          <div className="remove-password-input">
            <AddPasswordInput
              label="OTP *"
              type="text"
              placeholder="E.g: 1234"
              name="otp"
              onChange={(e) => setOtpNumber(e.target.value)}
              value={otpNumber}
              maxLength={4}
              required
            />
          </div>
          <div className="remove-password-actions">
            <div className="remove-password-btn">
              <ButtonComponent
                varient="secondary"
                onClick={() => validPinSubmit(datas)}>
                Submit OTP
              </ButtonComponent>
            </div>
            <div
              className="remove-password-btn"
              onClick={cancelDeletePasswordModal}>
              <ButtonComponent varient="copy">Cancel</ButtonComponent>
            </div>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        title="Are you sure to delete this Password?"
        isModalOpen={deleteModal}
        setIsModalOpen={setDeleteModal}>
        <div className="remove-password-container">
          <div className="remove-password-btn" onClick={handleDeletePassword}>
            <ButtonComponent varient="secondary">Yes</ButtonComponent>
          </div>
          <div
            className="remove-password-btn"
            onClick={cancelDeletePasswordModal}>
            <ButtonComponent varient="copy">No</ButtonComponent>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        title="Remove Password share with user"
        isModalOpen={removeSharedPasswordModal}
        setIsModalOpen={setRemoveSharedPasswordModal}>
        <div className="remove-password-container">
          <div
            className="remove-password-btn"
            onClick={handleRemoveSharedPassword}>
            <ButtonComponent varient="secondary">Yes</ButtonComponent>
          </div>
          <div
            className="remove-password-btn"
            onClick={cancelPasswordShareModal}>
            <ButtonComponent varient="copy">No</ButtonComponent>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        title="Update Password"
        size="lg"
        isModalOpen={editModal}
        setIsModalOpen={setEditModal}>
        <div className="dashboard-add-password">
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="Title *"
              type="text"
              placeholder="E.g: Google Account"
              name="title"
              onChange={handleChangeInput}
              value={passwordFormData?.title}
              required
            />
          </div>
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="Username/Email"
              type="email"
              placeholder="E.g: nabaraj2055@gmail.com"
              name="email"
              onChange={handleChangeInput}
              value={passwordFormData?.email}
              required
            />
          </div>
          {!showPin ? (
            <div className="dashboard-add-section">
              <div className="dashboard-add-input">
                <AddPasswordInput
                  label="Password *"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleChangeInput}
                  value={passwordFormData?.password}
                  icon={<EyeIcon />}
                  disabled={passwordFormData?.password === ""}
                  required
                />
              </div>
              <div
                className="dashboard-add-btn"
                onClick={() => setShowPin((prev) => !prev)}>
                <ButtonComponent varient="secondary" style="generator">
                  <div className="icon">
                    <EnablePasswordIcon />
                  </div>
                  <div className="title">Enable</div>
                </ButtonComponent>
              </div>
            </div>
          ) : (
            <div className="remove-password-containers">
              <div className="remove-password-input">
                <AddPasswordInput
                  label="Enter OTP to enable password field"
                  type="text"
                  placeholder="E.g: 1234"
                  name="otp"
                  onChange={(e) => setOtpEnableNumber(e.target.value)}
                  value={otpEnableNumber}
                  maxLength={4}
                  required
                />
              </div>
              <div className="remove-password-actions">
                <div
                  className="remove-password-btn"
                  onClick={() => enablePasswordHandle(datas)}>
                  <ButtonComponent varient="secondary">
                    Submit OTP
                  </ButtonComponent>
                </div>
                <div
                  className="remove-password-btn"
                  onClick={cancelUpdatePasswordModal}>
                  <ButtonComponent varient="copy">Cancel</ButtonComponent>
                </div>
              </div>
            </div>
          )}

          <div className="dashboard-add-section">
            <AddPasswordInput
              label="URl *"
              placeholder="E.g: www.salapbikasbank.com.np"
              type="text"
              name="url"
              onChange={handleChangeInput}
              value={passwordFormData?.url}
              required
            />
          </div>
          <div className="dashboard-add-section">
            <SelectOptionComponent
              type="forPass"
              category="category"
              name="category_id"
              onChange={handleChangeInput}
              value={passwordFormData?.category_id}
              required>
              {isCategoryPending && (
                <option value="">Loading Categories...</option>
              )}
              {categoryDatas !== undefined && categoryDatas.length === 0 && (
                <option value="">No Categories Available</option>
              )}
              {categoryDatas !== undefined &&
                categoryDatas.map((option) => (
                  <option key={option.category_id} value={option.category_id}>
                    {option.name}
                  </option>
                ))}
              {isCategoryError && (
                <option value="">
                  {categoryError?.message || "Error fetching categories"}
                </option>
              )}
            </SelectOptionComponent>
          </div>
        </div>

        <div className="dashboard-addPassword-footer">
          <div className="save-action">
            <ButtonComponent
              varient="secondary"
              style="generator"
              onClick={handleSubmitPassword}>
              <div className="title">Update Password</div>
            </ButtonComponent>
          </div>
          <div className="cancel-action" onClick={closeEditModal}>
            <ButtonComponent varient="copy" style="generator">
              <div className="icon">
                <CopyIcon />
              </div>
              <div className="title">Cancel</div>
            </ButtonComponent>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        title="Share with"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}>
        <div className="share-with-container">
          <div className="share-with-input">
            <SelectOptionComponent
              onChange={handleInput}
              name="userId"
              required>
              <option value="">Select user to share</option>
              {isUserPending && <option value="">Loading users...</option>}
              {isUserError && (
                <option value="">
                  {userError?.message || "Error fetching users"}
                </option>
              )}

              {data !== undefined && data.length === 0 && (
                <option value="">No Users Available</option>
              )}
              {data?.users !== undefined &&
                data?.users.map((option) => (
                  <option key={option?.id} value={option?.id}>
                    {option.username}
                  </option>
                ))}
            </SelectOptionComponent>
          </div>
          <div className="share-with-permission">
            <SelectOptionComponent
              onChange={handleInput}
              name="permisson_level"
              required>
              <option value="">Choose Permission Level</option>
              <option value="EDIT">EDIT</option>
              <option value="VIEW">VIEW</option>
            </SelectOptionComponent>
          </div>
          <div className="share-with-action" onClick={handleSharePassword}>
            <ButtonComponent varient="secondary">Share it</ButtonComponent>
          </div>
        </div>
      </ModalComponent>
      <div className="password-card-group">
        <div className="password-card-header">
          <div className="password-card-header-des">
            <div className="title">{datas?.title}</div>
            <span className="category">{datas?.category_name}</span>
          </div>
          <div className="password-card-action">
            <div className="icon" onClick={() => handleOpenEdit(datas)}>
              <EditIcon />
            </div>
            <div className="icon-d" onClick={() => deletePasswordModal(datas)}>
              <DeleteIcon />
            </div>
          </div>
        </div>
        <div className="password-card-userInfo">
          <div className="card-userInfo-details">
            <div className="icon">
              <UserIcon />
            </div>
            <div className="user">{datas?.username}</div>
          </div>
          <div
            className="password-card-copy"
            onClick={() => copyToClipboard(datas?.username)}>
            {copyOpen ? <span>Copied</span> : <CopyIcon />}
          </div>
        </div>
        <div className="password-card-link">
          <div className="icon">
            <LinkIcon />
          </div>
          <div className="title">
            <a href={datas?.url} target="_blank">
              {new URL(datas?.url).hostname.replace(/^www\./, "")}
            </a>
          </div>
          <div className="icon" onClick={() => copyToUrlClipboard(datas?.url)}>
            {copyUrl ? <span>Copied</span> : <CopyIcon />}
          </div>
        </div>

        <div className="password-card-details">
          <div className="password-card-right">
            {!serverPassword ? (
              <span className="star">*********</span>
            ) : (
              <>
                <span className="password-value">
                  <ReadOnlyInput
                    value={serverPassword}
                    type="card"
                    otherType="text"
                  />
                </span>
                <span
                  className={`password-category ${generateClassNames(
                    getPasswordStrength(serverPassword).label
                  )}`}>
                  {getPasswordStrength(serverPassword) &&
                    getPasswordStrength(serverPassword).label}
                </span>
              </>
            )}
          </div>
          <div className="password-card-left">
            {copyPassword ? (
              <span>Copied</span>
            ) : (
              <>
                <div className="icon" onClick={copyToPasswordClipboard}>
                  <EyeIcon />
                </div>
                <div className="icon" onClick={() => handleShowCopyModal()}>
                  <CopyIcon />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="password-card-footer">
          <div className="date">{FormatDate(datas?.created_at)}</div>
          {datas?.shared_by_name && (
            <div className="shared-by">
              {` Shared By (${
                datas?.shared_by_name && datas?.shared_by_name
              }) `}
            </div>
          )}
        </div>
        <div className="password-card-actions">
          <button
            className="password-card-share"
            title="share with"
            onClick={() => openModal(datas?.password_id)}>
            <ShareIcon />
          </button>
          <button
            title="Remove shared"
            className="password-card-delete"
            onClick={() => handlePasswordSharedModal(datas)}>
            <RemoveShareIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(PasswordCardComponent);
