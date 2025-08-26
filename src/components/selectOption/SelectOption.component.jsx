import React from "react";

const SelectOptionComponent = () => {
  return (
    <div className="select-option-group">
      <select className="select-option">
        <option value="all">All</option>
        <option value="cbs">CBS</option>
        <option value="nchl">NCHL</option>
        <option value="outlook">Outlook</option>
        <option value="gmail">Gmail</option>
      </select>
    </div>
  );
};

export default SelectOptionComponent;
