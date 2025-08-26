import HeaderComponent from "../../components/header/Header.component";
import CardComponent from "../../components/card/Card.component";
//icons
import { KeyIcon, CategoryIcon, SecureIcon } from "../../helpers/Icon.helper";
const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <div className="header-section">
        <HeaderComponent />
      </div>
      <div className="dashboard-main-section">
        <div className="wrapper">
          <div className="dashboard-display-card">
            <div className="card-list-section">
              <CardComponent
                title="Total Passwords"
                number="0"
                icon={<KeyIcon />}
                iconColor="purple"
              />
            </div>
            <div className="card-list-section">
              <CardComponent
                title="Categories"
                number="7"
                icon={<CategoryIcon />}
                iconColor="green"
              />
            </div>
            <div className="card-list-section">
              <CardComponent
                title="Security Score"
                number="Good"
                icon={<SecureIcon />}
                iconColor="green"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
