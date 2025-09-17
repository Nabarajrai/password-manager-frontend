import { memo, useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  EditIcon,
  DeleteIcon,
  UserIcon,
  CopyIcon,
  EyeIcon,
  LinkIcon,
  ShareIcon,
} from "../../helpers/Icon.helper";
//components
import ReadOnlyInput from "../readOnlyInput/ReadOnlyInput";
import ModalComponent from "../modal/Modal.component";
import SelectOptionComponent from "../selectOption/SelectOption.component";
import ButtonComponent from "../button/Button.component";

//hooks
import { usePasswordGenerator } from "../../hooks/passwordGenerator/usePasswordGenerator";
import { useUserCreate } from "../../hooks/userCreate/useUserCreate";
const PasswordCardComponent = ({ handleAddModalOpen, datas }) => {
  const [copyOpen, setCopyOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(true);
  const { getPasswordStrength } = usePasswordGenerator();
  const { fetchUsers } = useUserCreate();

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
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  console.log("users", data);
  return (
    <>
      <ModalComponent
        title="Share with"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}>
        <div className="share-with-container">
          <div className="share-with-input">
            <SelectOptionComponent>
              {data?.users !== undefined &&
                data?.users.map((option) => (
                  <option key={option?.id} value={option?.id}>
                    {option.username}
                  </option>
                ))}
            </SelectOptionComponent>
          </div>
          <div className="share-with-action">
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
            <div className="icon" onClick={handleAddModalOpen}>
              <EditIcon />
            </div>
            <div className="icon-d">
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
          <div className="shared-by">
            {datas?.shared_by_name && datas?.shared_by_name}
          </div>
        </div>
        <button
          className="password-card-share"
          title="share with"
          onClick={openModal}>
          <ShareIcon />
        </button>
      </div>
    </>
  );
};

export default memo(PasswordCardComponent);
