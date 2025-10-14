import { useMemo, memo } from "react";
import classnames from "classnames";

const ProgressBar = ({ strength }) => {
  const percent = (strength.score / 5) * 100;

  const generateClassNames = useMemo(() => {
    let className = "";
    switch (strength.label.toLowerCase()) {
      case "very strong":
        className = "very-strong";
        break;
      case "strong":
        className = "strong";
        break;
      case "good":
        className = "good";
        break;
      case "fair":
        className = "fair";
        break;
      case "weak":
        className = "weak";
        break;
      default:
        className = "very-strong";
    }
    return className;
  }, [strength]);

  const joinClassName = useMemo(() => {
    return classnames(`progress-bar__fill--child ${generateClassNames}`);
  }, [generateClassNames]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress-bar__label">
          <div className="progress-bar__label--left">Password Strength</div>
          <div className="progress-bar__label--right">{strength.label}</div>
        </div>
        <div className="progress-bar__fill">
          <div className={joinClassName} style={{ width: `${percent}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProgressBar);
