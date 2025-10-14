import { memo } from "react";
const RangeInput = ({ value, ...rest }) => {
  return (
    <div className="range-input-group">
      <label htmlFor="range-input" className=" range-input-label">
        <div className="range-input-label__length">Length</div>
        <div className="range-input-label__char">{value} characters</div>
      </label>
      <div className="range-input">
        <input
          className="range-input__input"
          type="range"
          min={6}
          max={19}
          {...rest}
        />
      </div>
    </div>
  );
};

export default memo(RangeInput);
