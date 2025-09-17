import { memo, useCallback, useState } from "react";

import {
  EditIcon,
  DeleteIcon,
  UserIcon,
  CopyIcon,
  EyeIcon,
  LinkIcon,
} from "../../helpers/Icon.helper";
//components
import ReadOnlyInput from "../readOnlyInput/ReadOnlyInput";

//hooks
import { usePasswordGenerator } from "../../hooks/passwordGenerator/usePasswordGenerator";
const PasswordCardComponent = ({ handleAddModalOpen, datas }) => {
  console.log("datas", datas);
  const [copyOpen, setCopyOpen] = useState(false);
  const { getPasswordStrength } = usePasswordGenerator();
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

  return (
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
            <ReadOnlyInput value={datas?.encrypted_password} type="card" />
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
          <div className="icon">
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
    </div>
  );
};

export default memo(PasswordCardComponent);
