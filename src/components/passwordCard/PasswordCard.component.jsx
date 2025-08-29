import {
  EditIcon,
  DeleteIcon,
  UserIcon,
  CopyIcon,
  EyeIcon,
} from "../../helpers/Icon.helper";
const PasswordCardComponent = ({ handleAddModalOpen }) => {
  return (
    <div className="password-card-group">
      <div className="password-card-header">
        <div className="password-card-header-des">
          <div className="title">Google Account</div>
          <span className="category">General</span>
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
          <div className="user">nabaraj2055@gmail.com</div>
        </div>
        <div className="password-card-copy">
          <CopyIcon />
        </div>
      </div>
      <div className="password-card-details">
        <div className="password-card-right">
          <span className="password-value">••••••••••••</span>
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
      <div className="password-card-footer">Updated 8/27/2025</div>
    </div>
  );
};

export default PasswordCardComponent;
