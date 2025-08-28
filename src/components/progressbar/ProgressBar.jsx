const ProgressBar = () => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress-bar__label">
          <div className="progress-bar__label--left">Password Strength</div>
          <div className="progress-bar__label--right">Weak</div>
        </div>
        <div className="progress-bar__fill">
          <div className="progress-bar__fill--child"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
