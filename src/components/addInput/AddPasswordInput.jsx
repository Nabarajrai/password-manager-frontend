import { useCallback, useState } from "react";
//icons
import { EyeOffIcon } from "../../helpers/Icon.helper";

const AddPasswordInput = ({
  label,
  placeholder,
  icon,
  copy,
  reset,
  generatePassword,
  type,
  ...rest
}) => {
  const [show, setShow] = useState(false);
  const handleShowPassword = useCallback(() => {
    return setShow((prev) => !prev);
  }, []);
  return (
    <div className="addPassword-group">
      <div className="addPassword-label">{label}</div>
      <div className="addPassword-input-group">
        <input
          type={type === "password" ? (show ? "text" : "password") : type}
          className="addPassword-input-field"
          placeholder={placeholder}
          {...rest}
        />
        <div className="icon">
          {reset && (
            <div className="copy" onClick={generatePassword}>
              {reset}
            </div>
          )}
          {icon && (
            <div className="eye" onClick={handleShowPassword}>
              {show ? <EyeOffIcon /> : icon}
            </div>
          )}
          {copy && <div className="copy">{copy}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddPasswordInput;
