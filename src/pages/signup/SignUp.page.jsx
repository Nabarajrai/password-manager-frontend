//components
import CustomInput from "../../components/customInput/CustomInput";
import ButtonComponent from "../../components/button/Button.component";
//icons
import { SecureIcon, EmailIcon, PasswordIcon } from "../../helpers/Icon.helper";
import { Link } from "react-router";
const SignUpPage = () => {
  return (
    <div className="signup-page-container">
      <div className="signup-page-wrapper">
        <div className="signup-page-header">
          <div className="icon">
            <SecureIcon />
          </div>
          <h3 className="secureVault">Secure Password Manager</h3>
          <p>Your trusted password manager</p>
        </div>
        <div className="signup-form-section">
          <div className="signup-top-section">
            <h4 className="signup-top-title">Create Account</h4>
            <p className="signup-top-des">Sign up to manage your passwords</p>
          </div>
          <form>
            <div className="input-section">
              <CustomInput
                placeholder="Enter your full name"
                label="Full Name"
                icon={<EmailIcon />}
              />
            </div>
            <div className="input-section">
              <CustomInput
                placeholder="Enter your email"
                label="Email Address"
                icon={<EmailIcon />}
              />
            </div>
            <div className="input-section">
              <CustomInput
                placeholder="Create a password"
                type="password"
                label="Password"
                icon={<PasswordIcon />}
              />
            </div>
            <div className="input-section">
              <CustomInput
                placeholder="Create a confirmed password"
                type="password"
                label="Confirmed Password"
                icon={<PasswordIcon />}
              />
              <div className="input-section">
                <CustomInput
                  placeholder="Create a secret pin password"
                  type="password"
                  label="Pin Password"
                  icon={<PasswordIcon />}
                />
              </div>
            </div>
            <div className="signup-button">
              <ButtonComponent>Sign Up</ButtonComponent>
            </div>
          </form>
          <div className="signup-footer-section">
            <p className="signup-footer-text">
              Already have an account?{" "}
              <span className="login-text">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
