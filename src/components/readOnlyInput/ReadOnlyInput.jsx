import { CopyIcon } from "../../helpers/Icon.helper";
const ReadOnlyInput = ({ value, handleCopied, copyOpen }) => {
  return (
    <div className="readonly-input-group">
      <label htmlFor="readonly-input" className="input-label">
        Password Generator
      </label>
      <div className="input-section-readonly">
        <input
          type="text"
          className="readonly-input"
          readOnly
          value={value}
          placeholder={value}
        />
        {copyOpen ? (
          <span className="readonly-input-copy">Copied</span>
        ) : (
          <span className="icon" onClick={() => handleCopied(value)}>
            <CopyIcon />
          </span>
        )}
      </div>
    </div>
  );
};

export default ReadOnlyInput;
