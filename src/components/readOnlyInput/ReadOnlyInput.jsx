import { CopyIcon } from "../../helpers/Icon.helper";
import { useMemo, memo } from "react";
const ReadOnlyInput = ({
  value,
  handleCopied,
  copyOpen,
  type,
  otherType,
  ...rest
}) => {
  const classNames = useMemo(() => {
    return type === "card"
      ? "input-section-readonly-card"
      : "input-section-readonly";
  }, [type]);

  return (
    <div className="readonly-input-group">
      {!type == "card" && (
        <label htmlFor="readonly-input" className="input-label">
          Password Generator
        </label>
      )}

      <div className={classNames}>
        <input
          type={otherType || "text"}
          className="readonly-input"
          readOnly
          value={value}
          placeholder={value}
          {...rest}
        />
        {copyOpen ? (
          <span className="readonly-input-copy">Copied</span>
        ) : (
          type !== "card" && (
            <span className="icon" onClick={() => handleCopied(value)}>
              <CopyIcon />
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default memo(ReadOnlyInput);
