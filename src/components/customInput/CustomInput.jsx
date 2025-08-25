import { useCallback, useMemo, useState } from "react";
import { EyeIcon, EyeOffIcon } from "../../helpers/Icon.helper";
//classnames
import classnames from "classnames";
const CustomInput = ({
  placeholder,
  label,
  type = "text",
  size = "lg",
  icon,
  ...rest
}) => {
  const [show, setShow] = useState(false);
  const sizeClassName = useMemo(() => {
    return size && `input-container__${size}`;
  }, [size]);
  const combinedClassName = useMemo(() => {
    return classnames("input-container", sizeClassName);
  }, [sizeClassName]);

  const handleShowPassword = useCallback(() => {
    return setShow((prev) => !prev);
  }, []);
  return (
    <div className={combinedClassName}>
      <div className="input-lebal">
        <label htmlFor="input" className="lebal-text">
          {label}
        </label>
      </div>
      <div className="input-group">
        {icon && <div className="icon">{icon}</div>}

        <input
          type={type === "password" ? (show ? "text" : "password") : type}
          className="input-field"
          placeholder={placeholder}
          {...rest}
        />
        {type === "password" && (
          <div className="eye-icon" onClick={handleShowPassword}>
            {show ? <EyeOffIcon /> : <EyeIcon />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
