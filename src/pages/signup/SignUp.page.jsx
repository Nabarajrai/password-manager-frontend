import { useCallback, useState } from "react";
//components
import CustomInput from "../../components/customInput/CustomInput";
import ButtonComponent from "../../components/button/Button.component";
//icons
import { SecureIcon, EmailIcon, PasswordIcon } from "../../helpers/Icon.helper";
import { Link } from "react-router";
//hooks
import { useAuth } from "../../hooks/user/useAuth.js";
//helpers
//helpers
import {
  checkPasswordValid,
  checkPinValid,
} from "../../helpers/PasswordCheck.helper.js";
const SignUpPage = () => {
  const [registerFormValues, setRegisterFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    pin: "",
  });
  const { signup, authError, loading, setAuthError } = useAuth();
  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();
      if (
        !registerFormValues.fullName ||
        !registerFormValues.email ||
        !registerFormValues.password ||
        !registerFormValues.confirmPassword ||
        !registerFormValues.pin
      ) {
        setAuthError("Please fill in all fields.");
        return;
      }
      if (registerFormValues.password !== registerFormValues.confirmPassword) {
        setAuthError("Passwords do not match.");
        return;
      }
      if (!checkPasswordValid(registerFormValues.password)) {
        setAuthError(
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        );
        return;
      }
      if (!checkPinValid(registerFormValues.pin)) {
        setAuthError(
          "Pin must be exactly 4 digits and only numbers not charectors."
        );
        return;
      }
      if (loading) return;
      const userData = {
        fullName: registerFormValues.fullName,
        email: registerFormValues.email,
        password: registerFormValues.password,
        pin: registerFormValues.pin,
        role_name: "ADMIN",
      };
      await signup(userData);
    },
    [signup, loading, setAuthError, registerFormValues]
  );

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setRegisterFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);
  const handleErrorClear = useCallback(() => {
    if (authError) {
      setAuthError("");
    }
  }, [authError, setAuthError]);
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
          <form onSubmit={handleRegister} className="signup-form">
            <div className="input-section">
              <CustomInput
                placeholder="Enter your full name"
                label="Full Name"
                icon={<EmailIcon />}
                name="fullName"
                value={registerFormValues.fullName}
                onChange={handleInputChange}
                onFocus={handleErrorClear}
                type="text"
              />
            </div>
            <div className="input-section">
              <CustomInput
                placeholder="Enter your email"
                label="Email Address"
                icon={<EmailIcon />}
                name="email"
                value={registerFormValues.email}
                onChange={handleInputChange}
                type="email"
                onFocus={handleErrorClear}
              />
            </div>
            <div className="input-section">
              <CustomInput
                placeholder="Create a password"
                type="password"
                label="Password"
                icon={<PasswordIcon />}
                name="password"
                value={registerFormValues.password}
                onChange={handleInputChange}
                onFocus={handleErrorClear}
              />
            </div>
            <div className="input-section">
              <CustomInput
                placeholder="Create a confirmed password"
                type="password"
                label="Confirmed Password"
                icon={<PasswordIcon />}
                name="confirmPassword"
                value={registerFormValues.confirmPassword}
                onChange={handleInputChange}
                onFocus={handleErrorClear}
              />
              <div className="input-section">
                <CustomInput
                  placeholder="Create a secret pin password"
                  type="password"
                  label="Pin Password"
                  icon={<PasswordIcon />}
                  name="pin"
                  value={registerFormValues.pin}
                  onChange={handleInputChange}
                  onFocus={handleErrorClear}
                />
              </div>
            </div>
            <div className="signup-error">
              {authError && <p className="error-text">{authError}</p>}
            </div>
            <div className="signup-button">
              <ButtonComponent disabled={loading}>
                {loading ? "Registering..." : "Sign Up"}
              </ButtonComponent>
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
