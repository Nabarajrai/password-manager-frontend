import React from "react";

const SearchInputComponent = ({ placeholder }) => {
  return (
    <div className="search-input-container">
      <input type="text" placeholder={placeholder} className="search-input" />
    </div>
  );
};

export default SearchInputComponent;
