import { useState, useCallback } from "react";
//icons
import { SecureIcon, EmailIcon, PasswordIcon } from "../../helpers/Icon.helper";
//components
import CustomInput from "../../components/customInput/CustomInput";
import ButtonComponent from "../../components/button/Button.component";

//route router
import { Link } from "react-router";
//hooks
import { useAuth } from "../../hooks/user/useAuth.js";
const LoginPage = () => {
  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: "",
  });
  const { login, authError, loading, setAuthError } = useAuth();
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoginFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);
  const logHandleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!loginFormValues.email || !loginFormValues.password) {
        setAuthError("Please fill in all fields.");
        return;
      }
      if (loading) return;
      await login(loginFormValues);
    },
    [login, loginFormValues, loading, setAuthError]
  );
  const handleErrorClear = useCallback(() => {
    if (authError) {
      setAuthError("");
    }
  }, [authError, setAuthError]);
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
        <form onSubmit={logHandleSubmit} className="login-form">
          <div className="input-section">
            <CustomInput
              placeholder="Enter your email"
              label="Email Address"
              icon={<EmailIcon />}
              name="email"
              value={loginFormValues.email}
              onChange={handleInputChange}
              onFocus={handleErrorClear}
              type="email"
            />
          </div>
          <div className="input-section">
            <CustomInput
              placeholder="Enter your password"
              type="password"
              label="Password"
              icon={<PasswordIcon />}
              name="password"
              value={loginFormValues.password}
              onChange={handleInputChange}
              onFocus={handleErrorClear}
            />
          </div>
          <div className="login-error">
            {authError && <p className="error-text">{authError}</p>}
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
