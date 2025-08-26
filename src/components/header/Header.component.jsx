import { SecureIcon } from "../../helpers/Icon.helper";
import { UserIcon, AdminIcon, LogoutIcon } from "../../helpers/Icon.helper";

const HeaderComponent = () => {
  return (
    <div className="header-container">
      <div className="wrapper">
        <div className="header-section">
          <div className="header-right">
            <div className="icon">
              <SecureIcon />
            </div>
            <div className="header-right-left">
              <h3 className="secureVault">Secure Vault</h3>
              <p> Password manager</p>
            </div>
          </div>
          <div className="header-left">
            <div className="user-profile">
              <div className="icon">
                <UserIcon />
              </div>
              <div className="name">
                <p>
                  Nabaraj Rai <span>(Admin)</span>
                </p>
              </div>
            </div>
            <div className="admin-profile">
              <div className="icon">
                <AdminIcon />
              </div>
              <div className="name">Admin</div>
            </div>
            <div className="logout">
              <div className="icon">
                <LogoutIcon />
              </div>
              <div className="name">Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
