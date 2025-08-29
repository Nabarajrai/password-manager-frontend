import { CopyIcon } from "../../helpers/Icon.helper";
const ReadOnlyInput = () => {
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
          value="H8ewl;:kfjlkasd"
        />
        <span className="icon">
          <CopyIcon />
        </span>
      </div>
    </div>
  );
};

export default ReadOnlyInput;
