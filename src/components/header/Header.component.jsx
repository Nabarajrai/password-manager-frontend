import { useState, useCallback } from "react";
import { AddUserIcon, PeopleIcon, SecureIcon } from "../../helpers/Icon.helper";
import { UserIcon, AdminIcon, LogoutIcon } from "../../helpers/Icon.helper";
import ModalComponent from "../modal/Modal.component";
import CardComponent from "../card/Card.component";
import ButtonComponent from "../button/Button.component";
import AddPasswordInput from "../addInput/AddPasswordInput";
import ReadOnlyInput from "../readOnlyInput/ReadOnlyInput";
import SelectOptionComponent from "../selectOption/SelectOption.component";
const HeaderComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <>
      <ModalComponent
        title="Admin Panel"
        isModalOpen={modalOpen}
        setIsModalOpen={setModalOpen}
        modalFor="admin"
      >
        <div className="admin-panel-container">
          <div className="admin-panel-dash">
            <div className="admin-panel-card">
              <CardComponent
                title="Total Users"
                number="3"
                icon={<PeopleIcon />}
                iconColor="purple"
              />
            </div>
            <div className="admin-panel-card">
              <CardComponent
                title="Admin Users"
                icon={<SecureIcon />}
                number="2"
                iconColor="green"
              />
            </div>
            <div className="admin-panel-card">
              <CardComponent
                title="Regular Users"
                number="3"
                icon={<PeopleIcon />}
                iconColor="green"
              />
            </div>
          </div>
          <div className="admin-panel-action">
            <ButtonComponent variant="primary">
              <div className="icon">
                <AddUserIcon />
              </div>
              <div className="title">Add New User</div>
            </ButtonComponent>
          </div>
          <div className="admin-panel-useradd-form">
            <h3>Add New User</h3>
            <div className="useradd-form-group">
              <div className="useradd-form-input-section">
                <AddPasswordInput type="text" placeholder="Full Name" />
              </div>
              <div className="useradd-form-input-section">
                <AddPasswordInput type="email" placeholder="Email Address" />
              </div>
              <div className="useradd-form-input-section">
                <AddPasswordInput type="password" placeholder="Password" />
              </div>
              <div className="useradd-form-input-section">
                <AddPasswordInput type="password" placeholder="4 Digit Pin" />
              </div>
              <div className="useradd-form-input-section">
                <SelectOptionComponent type="forPass" />
              </div>
              <div className="useradd-form-action-section">
                <div className="user-form-action-section__add">
                  <ButtonComponent varient="secondary">
                    Add User
                  </ButtonComponent>
                </div>
                <div className="user-from-action-section__cancel">
                  <ButtonComponent varient="copy">Cancel</ButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalComponent>
      <div className="header-container">
        <div className="wrapper">
          <div className="header-section">
            <div className="header-right">
              <div className="icon">
                <SecureIcon />
              </div>
              <div className="header-right-left">
                <h3 className="secureVault">Secure Vault</h3>
                <p> Password manager</p>
              </div>
            </div>
            <div className="header-left">
              <div className="user-profile">
                <div className="icon">
                  <UserIcon />
                </div>
                <div className="name">
                  <p>
                    Nabaraj Rai <span>(Admin)</span>
                  </p>
                </div>
              </div>
              <div className="admin-profile" onClick={handleOpenModal}>
                <div className="icon">
                  <AdminIcon />
                </div>
                <div className="name">Admin</div>
              </div>
              <div className="logout">
                <div className="icon">
                  <LogoutIcon />
                </div>
                <div className="name">Logout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
