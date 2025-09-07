import CustomInput from "../../components/customInput/CustomInput";
import ButtonComponent from "../../components/button/Button.component";
import { PasswordIcon, SecureIcon } from "../../helpers/Icon.helper";
import { useCallback, useState } from "react";
const UpdateCredentail = () => {
  const [closeUpdatePassword, setCloseUpdatePassword] = useState(false);
  const closeUpdatePasswordHandle = useCallback((e) => {
    e.preventDefault();
    setCloseUpdatePassword(true);
  }, []);
  return (
    <div className="password-page-container">
      <div className="password-page-header">
        <div className="icon">
          <SecureIcon />
        </div>
        <h3 className="secureVault">Secure Password Manager</h3>
        <p>Your trusted password manager</p>
      </div>

      {closeUpdatePassword ? (
        <div className="password-form-section">
          <div className="password-title">Update Your Pin</div>
          <form>
            <div className="input-section">
              <CustomInput
                placeholder="Enter your pin eg: 1345"
                type="Pin"
                label="Password"
                icon={<PasswordIcon />}
              />
            </div>
            <div className="input-section">
              <CustomInput
                placeholder="Enter your pin eg: 1345"
                type="password"
                label="Confirm Pin"
                icon={<PasswordIcon />}
              />
            </div>
            <div className="password-button">
              <ButtonComponent>Update Pin</ButtonComponent>
            </div>
          </form>
        </div>
      ) : (
        <div className="password-form-section">
          <div className="password-title">Update Your Password First</div>
          <form onSubmit={closeUpdatePasswordHandle}>
            <div className="input-section">
              <CustomInput
                placeholder="Enter your password"
                type="password"
                label="Password"
                icon={<PasswordIcon />}
              />
            </div>
            <div className="input-section">
              <CustomInput
                placeholder="Enter your password"
                type="password"
                label="Confirm Password"
                icon={<PasswordIcon />}
              />
            </div>
            <div className="password-button">
              <ButtonComponent>Update Password</ButtonComponent>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateCredentail;
