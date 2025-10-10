import { useCallback } from "react";
import { useNavigate } from "react-router";
//helpers
// import { clearLocalStorage } from "../../helpers/LocalStroage.helper";
const SessionComponent = () => {
  const navigate = useNavigate();
  const handleReload = useCallback(() => {
    // clearLocalStorage();
    navigate("/login");
    window.location.reload();
  }, [navigate]);
  return (
    <div className="session-component-container">
      <p className="session-component-text">
        Due to security reasons, Your session has expired. Please log in again.
      </p>
      <div className="session-component-btn">
        <button onClick={handleReload}>Log In Again</button>
      </div>
    </div>
  );
};

export default SessionComponent;
