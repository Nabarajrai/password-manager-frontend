import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
//comment
/**
 * Reset Password Page
 * This page allows users to reset their password.
 */
///endcomment
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomInput from "../../components/customInput/CustomInput";
import ButtonComponent from "../../components/button/Button.component";
import { SecureIcon, PasswordIcon } from "../../helpers/Icon.helper";
//helpers
import { checkPasswordValid } from "../../helpers/PasswordCheck.helper";
import { ParamQuery } from "../../helpers/ParamQuery.helper";
//hooks
import { useUserCreate } from "../../hooks/userCreate/useUserCreate";

const ResetPassword = () => {
  const [validError, setValidError] = useState("");
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });

  const queryClient = useQueryClient();
  const { updatePassword } = useUserCreate();
  const params = ParamQuery();
  const navigate = useNavigate();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      navigate("/");
      setFormData({
        new_password: "",
        confirm_password: "",
      });
    },
    onError: (error) => {
      console.error("Error updating password:", error);
      throw error;
    },
  });

  const handleUpdatePassword = useCallback(
    (e) => {
      e.preventDefault();
      const { new_password, confirm_password } = formData;
      const payload = {
        token: params?.token,
        new_password: new_password.trim(),
      };
      if (new_password !== confirm_password) {
        setValidError("Passwords do not match");
        return;
      }
      if (!checkPasswordValid(new_password)) {
        setValidError(
          "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
        );
        return;
      }
      if (mutation.isPending) {
        return;
      }
      mutation.mutate(payload);
    },
    [formData, mutation, params]
  );

  const removeErrorMessage = () => {
    setValidError("");
  };
  return (
    <div className="password-page-container">
      <div className="password-page-header">
        <div className="icon">
          <SecureIcon />
        </div>
        <h3 className="secureVault">Secure Password Manager</h3>
        <p>Your trusted password manager</p>
      </div>

      <div className="password-form-section">
        <div className="password-title">Update Your Password First</div>
        <form className="reset-password-form" onSubmit={handleUpdatePassword}>
          <div className="input-section">
            <CustomInput
              placeholder="Enter your password"
              type="password"
              label="Password"
              icon={<PasswordIcon />}
              name="new_password"
              onChange={handleChangeValue}
              value={formData.new_password}
              onFocus={removeErrorMessage}
            />
          </div>
          <div className="input-section">
            <CustomInput
              placeholder="Enter your password"
              type="password"
              label="Confirm Password"
              icon={<PasswordIcon />}
              name="confirm_password"
              onChange={handleChangeValue}
              value={formData.confirm_password}
              onFocus={removeErrorMessage}
            />
          </div>
          <div className="credentails-error">
            {validError && <p className="error-text">{validError}</p>}
          </div>
          <div className="password-button">
            <ButtonComponent disabled={mutation.isPending}>
              Update Password
            </ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
