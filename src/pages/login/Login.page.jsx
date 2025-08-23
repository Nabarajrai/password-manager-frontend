//icons
import { SecureIcon, EmailIcon, PasswordIcon } from "../../helpers/Icon.helper";
//components
import CustomInput from "../../components/customInput/CustomInput";
import ButtonComponent from "../../components/button/Button.component";

//route router
import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-page-header">
        <div className="icon">
          <SecureIcon />
        </div>
        <h3 className="secureVault">Secure Password Manager</h3>
        <p>Your trusted password manager</p>
      </div>
      <div className="login-form-section">
        <div className="login-top-section">
          <h4 className="login-top-title">Welcome Back</h4>
          <p className="login-top-des">Sign in to access your passwords</p>
        </div>
        <form>
          <div className="input-section">
            <CustomInput
              placeholder="Enter your email"
              label="Email Address"
              icon={<EmailIcon />}
            />
          </div>
          <div className="input-section">
            <CustomInput
              placeholder="Enter your password"
              type="password"
              label="Password"
              icon={<PasswordIcon />}
            />
          </div>
          <div className="login-button">
            <ButtonComponent>Login</ButtonComponent>
          </div>
        </form>
        <div className="login-footer-section">
          <p className="login-footer-text">
            Don't have an account?{" "}
            <span className="signup-text">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
