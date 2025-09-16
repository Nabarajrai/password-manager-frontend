import CustomInput from "../../components/customInput/CustomInput";
import ButtonComponent from "../../components/button/Button.component";
import { PasswordIcon, SecureIcon } from "../../helpers/Icon.helper";
import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//hooks
import { useUserCreate } from "../../hooks/userCreate/useUserCreate.js";
//helpers
import { ParamQuery } from "../../helpers/ParamQuery.helper.js";
import {
  checkPasswordValid,
  checkPinValid,
} from "../../helpers/PasswordCheck.helper.js";

const UpdateCredentail = () => {
  const [validError, setValidError] = useState("");
  const [updateForm, setUpdateForm] = useState({
    new_password: "",
    confirm_password: "",
    new_pin: "",
    confirm_pin: "",
  });

  const queryClient = useQueryClient();
  const { updateUserCredentials } = useUserCreate();
  const params = ParamQuery();

  const handleUpdateInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUpdateForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const updateCrendentMutate = useMutation({
    mutationFn: updateUserCredentials,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user credentials:", error);
      throw error;
    },
  });

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const { new_password, confirm_password, new_pin, confirm_pin } = updateForm;
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
      token: params?.token,
      new_password: updateForm.new_password,
      new_pin: updateForm.new_pin,
    };
    updateCrendentMutate.mutate(payload);
  };

  const removeErrorMessage = useCallback(() => {
    setValidError("");
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

      <div className="password-form-section">
        <div className="password-title">Update Your Password First</div>
        <form onSubmit={handleUpdateSubmit} className="credentails-form">
          <div className="input-section">
            <CustomInput
              placeholder="Enter your password"
              type="password"
              label="Password"
              icon={<PasswordIcon />}
              name="new_password"
              value={updateForm.new_password}
              onChange={handleUpdateInputChange}
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
              value={updateForm.confirm_password}
              onChange={handleUpdateInputChange}
              onFocus={removeErrorMessage}
            />
            <div className="input-section">
              <CustomInput
                placeholder="Enter your pin eg: 1345"
                type="Pin"
                label="Password"
                icon={<PasswordIcon />}
                name="new_pin"
                value={updateForm.new_pin}
                onChange={handleUpdateInputChange}
                onFocus={removeErrorMessage}
              />
            </div>
            <div className="input-section">
              <CustomInput
                placeholder="Enter your pin eg: 1345"
                type="password"
                label="Confirm Pin"
                icon={<PasswordIcon />}
                name="confirm_pin"
                value={updateForm.confirm_pin}
                onChange={handleUpdateInputChange}
                onFocus={removeErrorMessage}
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

export default UpdateCredentail;
