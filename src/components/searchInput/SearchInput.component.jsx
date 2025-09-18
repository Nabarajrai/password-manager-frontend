import React from "react";

const SearchInputComponent = ({ placeholder, ...rest }) => {
  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        {...rest}
      />
    </div>
  );
};

export default SearchInputComponent;
