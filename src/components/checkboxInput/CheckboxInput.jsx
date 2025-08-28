import { memo } from "react";

const CheckboxInput = ({ title }) => {
  return (
    <label className="checkbox-input-group">
      <input type="checkbox" className="checkbox-input" id="checkbox" />
      <span htmlFor="checkbox" className="checkbox-label">
        {title}
      </span>
    </label>
  );
};

export default memo(CheckboxInput);
