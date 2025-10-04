import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//components
import CustomInput from "../../components/customInput/CustomInput";
import ButtonComponent from "../../components/button/Button.component";
//icons
import { SecureIcon, PasswordIcon } from "../../helpers/Icon.helper";
//helpers
import { checkPinValid } from "../../helpers/PasswordCheck.helper";
import { ParamQuery } from "../../helpers/ParamQuery.helper";
//hooks
import { useUserCreate } from "../../hooks/userCreate/useUserCreate";
import { useToast } from "../../hooks/toast/useToast";
const ResetPin = () => {
  const [validError, setValidError] = useState("");
  const [formData, setFormData] = useState({
    new_pin: "",
    confirm_pin: "",
  });

  const { resetPin } = useUserCreate();
  const queryClient = useQueryClient();
  const params = ParamQuery();
  const navigate = useNavigate();
  const { showSuccessToast } = useToast();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const removeErrorMessage = () => {
    setValidError("");
  };

  const mutation = useMutation({
    mutationFn: resetPin,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      showSuccessToast("Pin reset successfully");
      navigate("/login");
      setFormData({
        new_pin: "",
        confirm_pin: "",
      });
    },
    onError: (error) => {
      console.error("Error updating pin:", error);
      showSuccessToast(error.message, "error");
      throw error;
    },
  });

  const handleUpdatePassword = useCallback(
    (e) => {
      e.preventDefault();
      const { new_pin, confirm_pin } = formData;
      const payload = { token: params?.token, new_pin: new_pin.trim() };
      if (new_pin !== confirm_pin) {
        setValidError("Pins do not match");
        return;
      }
      if (!checkPinValid(new_pin)) {
        setValidError("Pin must be 4 digits long and contain only numbers");
        return;
      }
      if (mutation.isPending) return;
      mutation.mutate(payload);
      // Proceed with pin update logic here
    },
    [formData, mutation, params]
  );
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
              label="Pin"
              icon={<PasswordIcon />}
              name="new_pin"
              onChange={handleChangeValue}
              value={formData.new_password}
              onFocus={removeErrorMessage}
              maxLength={4}
            />
          </div>
          <div className="input-section">
            <CustomInput
              placeholder="Enter your password"
              type="password"
              label="Confirm Pin"
              icon={<PasswordIcon />}
              name="confirm_pin"
              onChange={handleChangeValue}
              value={formData.confirm_pin}
              onFocus={removeErrorMessage}
              maxLength={4}
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

export default ResetPin;
