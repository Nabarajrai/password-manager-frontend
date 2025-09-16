const ProgressBar = ({ strength }) => {
  const percent = (strength.score / 5) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress-bar__label">
          <div className="progress-bar__label--left">Password Strength</div>
          <div className="progress-bar__label--right">{strength.label}</div>
        </div>
        <div className="progress-bar__fill">
          <div
            className="progress-bar__fill--child"
            style={{ width: `${percent}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
