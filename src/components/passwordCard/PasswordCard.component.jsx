import { memo } from "react";
import {
  EditIcon,
  DeleteIcon,
  UserIcon,
  CopyIcon,
  EyeIcon,
} from "../../helpers/Icon.helper";
const PasswordCardComponent = ({ handleAddModalOpen, datas }) => {
  console.log("datas", datas);
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
      <div className="password-card-details">
        <div className="password-card-right">
          <span className="password-value">{datas?.encrypted_password}</span>
          <span className="password-category">Weak</span>
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
