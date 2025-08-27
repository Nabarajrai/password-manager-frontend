import HeaderComponent from "../../components/header/Header.component";
import CardComponent from "../../components/card/Card.component";
import SearchInputComponent from "../../components/searchInput/SearchInput.component";
//icons
import {
  KeyIcon,
  CategoryIcon,
  SecureIcon,
  GenerateIcon,
  AddIcon,
} from "../../helpers/Icon.helper";
import SelectOptionComponent from "../../components/selectOption/SelectOption.component";
import ButtonComponent from "../../components/button/Button.component";
import PasswordCardComponent from "../../components/passwordCard/PasswordCard.component";
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
          <div className="dashboard-actions">
            <div className="search-action">
              <SearchInputComponent placeholder="Search Passwords..." />
            </div>
            <div className="category-action">
              <SelectOptionComponent />
            </div>
            <div className="modal-actions">
              <div className="generate-action">
                <ButtonComponent>
                  <div className="icon">
                    <GenerateIcon />
                  </div>
                  <div className="title">Generate Password</div>
                </ButtonComponent>
              </div>
              <div className="addPassword-action">
                <ButtonComponent varient="secondary">
                  <div className="icon">
                    <AddIcon />
                  </div>
                  <div className="title">Add Password</div>
                </ButtonComponent>
              </div>
            </div>
          </div>
          {/* <div className="not-found">
            <div className="icon">
              <KeyIcon />
            </div>
            <div className="title">No Passwords Found</div>
            <div className="description">
              Try adding some passwords to get started.
            </div>
          </div> */}

          <div className="password-card-lists">
            <div className="password-card-item">
              <PasswordCardComponent />
            </div>
            <div className="password-card-item">
              <PasswordCardComponent />
            </div>
            <div className="password-card-item">
              <PasswordCardComponent />
            </div>
            <div className="password-card-item">
              <PasswordCardComponent />
            </div>

            <div className="password-card-item">
              <PasswordCardComponent />
            </div>
            <div className="password-card-item">
              <PasswordCardComponent />
            </div>
            <div className="password-card-item">
              <PasswordCardComponent />
            </div>
            <div className="password-card-item">
              <PasswordCardComponent />
            </div>
            <div className="password-card-item">
              <PasswordCardComponent />
            </div>
            <div className="password-card-item">
              <PasswordCardComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
