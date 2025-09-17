import { memo, useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  EditIcon,
  DeleteIcon,
  UserIcon,
  CopyIcon,
  EyeIcon,
  LinkIcon,
  ShareIcon,
  ResetPinIcon,
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

//helpers
import {
  checkValidEmail,
  checkValidUrl,
} from "../../helpers/PasswordCheck.helper";

const PasswordCardComponent = ({ datas }) => {
  const [copyOpen, setCopyOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [removeSharedPasswordModal, setRemoveSharedPasswordModal] =
    useState(false);
  const [passId, setPassId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(true);
  const [formData, setFormData] = useState({
    userId: "",
    permisson_level: "",
  });
  const [deleteFormData, setDeleteFormData] = useState({
    password_id: "",
    user_id: "",
  });
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
  const { fetchUsers } = useUserCreate();
  const {
    shareWithPassword,
    updatePassword,
    removeSharedPassword,
    deletePassword,
  } = useCrendentails();
  const { showSuccessToast } = useToast();
  const { user } = useUser();
  const { fetchCategories } = useCategories();

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
    console.log("nabaraj", params);
    return className;
  }, []);

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

  const handlePassword = useCallback(() => {
    setType((prev) => !prev);
  }, []);
  const openModal = useCallback((passId) => {
    setPassId(passId);
    setIsModalOpen(true);
  }, []);

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: categoryDatas } = useQuery({
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
    },
    onError: (error) => {
      console.error("Error sharing password:", error);
      showSuccessToast(error || "Something went wrong", "error");
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

  const handleSharePassword = useCallback(() => {
    const { userId, permisson_level } = formData;
    console.log("formdata", formData);
    if (!userId || !permisson_level) {
      showSuccessToast("All field are required");
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

  // console.log("formdata", formData);
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
        showSuccessToast("All fields are required!");
        return null;
      }
      if (!checkValidEmail(email)) {
        showSuccessToast("Invalid email format!");
      }

      if (!checkValidUrl(url)) {
        showSuccessToast("Invalid url format");
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
        "You are not authorized person to remove this password card"
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
      showSuccessToast("All field are required to delete this password card");
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

  const deletePasswordModal = useCallback(
    (userInfo) => {
      setDeleteModal(true);
      setDeleteFormData({
        password_id: userInfo?.password_id,
        user_id: user?.owner_user_id,
      });
    },
    [user]
  );
  const cancelDeletePasswordModal = useCallback(() => {
    setDeleteModal(false);
  }, []);
  return (
    <>
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
        title="Update  Password"
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
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="Password *"
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChangeInput}
              value={passwordFormData?.password}
              icon={<EyeIcon />}
              reset={<ResetPinIcon />}
              required
            />
          </div>
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
              {categoryDatas !== undefined &&
                categoryDatas.map((option) => (
                  <option key={option.category_id} value={option.category_id}>
                    {option.name}
                  </option>
                ))}
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
          <div className="password-card-copy">
            <CopyIcon />
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
            <div className="icon">
              <CopyIcon />
            </div>
          </div>
        </div>

        <div className="password-card-details">
          <div className="password-card-right">
            <span className="password-value">
              <ReadOnlyInput
                value={datas?.encrypted_password}
                type="card"
                otherType={type}
              />
            </span>
            <span
              className={`password-category ${generateClassNames(
                getPasswordStrength(datas?.encrypted_password).label
              )}`}>
              {getPasswordStrength(datas?.encrypted_password) &&
                getPasswordStrength(datas?.encrypted_password).label}
            </span>
          </div>
          <div className="password-card-left">
            <div className="icon" onClick={handlePassword}>
              <EyeIcon />
            </div>
            <div className="icon">
              <CopyIcon />
            </div>
          </div>
        </div>
        <div className="password-card-footer">
          <div className="date">{datas?.created_at}</div>
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
