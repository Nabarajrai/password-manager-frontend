import { useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import CustomInput from "../../components/customInput/CustomInput";
import ButtonComponent from "../../components/button/Button.component";
//icons
import { SecureIcon, PasswordIcon } from "../../helpers/Icon.helper";
//hooks
import { useAuth } from "../../hooks/user/useAuth";
import { useToast } from "../../hooks/toast/useToast";
import { useVerifyToken } from "../../hooks/verifyToken/VerifyToken";
//helpers
import {
  checkPasswordValid,
  checkPinValid,
} from "../../helpers/PasswordCheck.helper";
//query
import { useMutation, useQueryClient } from "@tanstack/react-query";
const SetCrendentail = () => {
  const [formValues, setFormValues] = useState({
    new_password: "",
    confirm_password: "",
    new_pin: "",
    confirm_pin: "",
  });
  const [validError, setValidError] = useState("");

  //costom hooks
  const { updateCredentials } = useAuth();
  const { showSuccessToast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useVerifyToken();
  const user = data?.user;

  if (!user) {
    navigate("/login", { replace: true });
  }

  //form submit
  const updateCredentailMutate = useMutation({
    mutationFn: updateCredentials,
    onSuccess: async () => {
      await queryClient.removeQueries(); // 👈 clear auth cache
      showSuccessToast("User credentials updated successfully");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      showSuccessToast(error, "error");
      throw error;
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { new_password, confirm_password, new_pin, confirm_pin } = formValues;
    if (!checkPasswordValid(new_password)) {
      setValidError(
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
      );
      return;
    }
    if (!checkPinValid(new_pin)) {
      setValidError("Pin must be exactly 4 digits not character");
      return;
    }
    if (new_password !== confirm_password) {
      setValidError("Passwords do not match");
      return;
    }
    if (new_pin !== confirm_pin) {
      setValidError("Pins do not match");
      return;
    }
    const payload = {
      userId: user?.userId,
      newPassword: formValues.new_password,
      newPin: formValues.new_pin,
    };
    updateCredentailMutate.mutate(payload);
  };

  //input change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="password-page-container">
      <div className="password-page-header">
        <div className="icon">
          <SecureIcon />
        </div>
        <h3 className="secureVault">Your Password Manager</h3>
        <p>Your trusted password manager</p>
      </div>

      <div className="password-form-section">
        <div className="password-title">Update Your Password First</div>
        <form className="credentails-form" onSubmit={handleSubmit}>
          <div className="input-section">
            <CustomInput
              placeholder="Enter your password"
              type="password"
              label="Password"
              icon={<PasswordIcon />}
              name="new_password"
              value={formValues.new_password}
              onChange={handleChange}
            />
          </div>
          <div className="input-section">
            <CustomInput
              placeholder="Enter your password"
              type="password"
              label="Confirm Password"
              icon={<PasswordIcon />}
              name="confirm_password"
              value={formValues.confirm_password}
              onChange={handleChange}
            />
            <div className="input-section">
              <CustomInput
                placeholder="Enter your pin eg: 1345"
                type="password"
                label="Password"
                icon={<PasswordIcon />}
                name="new_pin"
                value={formValues.new_pin}
                onChange={handleChange}
                maxLength={4}
              />
            </div>
            <div className="input-section">
              <CustomInput
                placeholder="Enter your pin eg: 1345"
                type="password"
                label="Confirm Pin"
                icon={<PasswordIcon />}
                name="confirm_pin"
                value={formValues.confirm_pin}
                onChange={handleChange}
                maxLength={4}
              />
            </div>
          </div>
          <div className="credentails-error">
            {validError && <p className="error-text">{validError}</p>}
          </div>
          <div className="password-button">
            <ButtonComponent>Update Password</ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetCrendentail;
