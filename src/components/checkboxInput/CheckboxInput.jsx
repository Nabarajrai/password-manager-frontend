import { memo } from "react";

const CheckboxInput = ({ title, ...rest }) => {
  return (
    <label className="checkbox-input-group">
      <input
        type="checkbox"
        className="checkbox-input"
        id="checkbox"
        {...rest}
      />
      <span htmlFor="checkbox" className="checkbox-label">
        {title}
      </span>
    </label>
  );
};

export default memo(CheckboxInput);
