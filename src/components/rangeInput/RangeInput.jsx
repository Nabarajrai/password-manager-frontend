import React from "react";

const RangeInput = () => {
  return (
    <div className="range-input-group">
      <label htmlFor="range-input" className=" range-input-label">
        <div className="range-input-label__length">Length</div>
        <div className="range-input-label__char">19 characters</div>
      </label>
      <div className="range-input">
        <input className="range-input__input" type="range" min={0} max={50} />
      </div>
    </div>
  );
};

export default RangeInput;
