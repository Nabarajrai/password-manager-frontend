import HeaderComponent from "../../components/header/Header.component";
import CardComponent from "../../components/card/Card.component";
const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <div className="header-section">
        <HeaderComponent />
      </div>
      <div className="dashboard-main-section">
        <div className="wrapper">
          <div className="dashboard-display-card">
            <CardComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
