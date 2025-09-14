import React from "react";

const AddPasswordInput = ({
  label,
  placeholder,
  icon,
  copy,
  type,
  ...rest
}) => {
  return (
    <div className="addPassword-group">
      <div className="addPassword-label">{label}</div>
      <div className="addPassword-input-group">
        <input
          type={type}
          className="addPassword-input-field"
          placeholder={placeholder}
          {...rest}
        />
        <div className="icon">
          {icon && <div className="eye">{icon}</div>}
          {copy && <div className="copy">{copy}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddPasswordInput;
