import { useCallback, useState } from "react";
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
  CopyIcon,
  PasswordIcon,
  EyeIcon,
} from "../../helpers/Icon.helper";
import SelectOptionComponent from "../../components/selectOption/SelectOption.component";
import ButtonComponent from "../../components/button/Button.component";
import PasswordCardComponent from "../../components/passwordCard/PasswordCard.component";
import ModalComponent from "../../components/modal/Modal.component";
import ReadOnlyInput from "../../components/readOnlyInput/ReadOnlyInput";
import ProgressBar from "../../components/progressbar/ProgressBar";
import RangeInput from "../../components/rangeInput/RangeInput";
import AddPasswordInput from "../../components/addInput/AddPasswordInput";
import CheckboxInput from "../../components/checkboxInput/CheckboxInput";
const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const handleAddModalClose = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);
  const handleAddModalOpen = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);
  return (
    <>
      <ModalComponent
        title="Password Generator"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <div className="generate-newpass-input">
          <ReadOnlyInput />
        </div>
        <div className="dashboard-progress-bar-section">
          <ProgressBar />
        </div>
        <div className="dashboard-range-input-section">
          <RangeInput />
        </div>
        <div className="dashboard-password-generator">
          <div className="char">Character Types</div>
          <div className="char-types">
            <div className="char-types__type">
              <CheckboxInput title="Uppercase Letters (A_Z)" />
            </div>
            <div className="char-types__type">
              <CheckboxInput title="Lowercase Letters" />
            </div>
            <div className="char-types__type">
              <CheckboxInput title="Numbers (0-9)" />
            </div>
            <div className="char-types__type">
              <CheckboxInput title="Symbols (!@#$...)" />
            </div>
          </div>
        </div>
        <div className="dashboard-modal-footer">
          <div className="generate-action">
            <ButtonComponent varient="secondary" style="generator">
              <div className="icon">
                <GenerateIcon />
              </div>
              <div className="title">Generate Password</div>
            </ButtonComponent>
          </div>
          <div className="copy-action">
            <ButtonComponent varient="copy" style="generator">
              <div className="icon">
                <CopyIcon />
              </div>
              <div className="title">Copy</div>
            </ButtonComponent>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        title="Add New Password"
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
      >
        <div className="dashboard-add-password">
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="Title *"
              placeholder="E.g: Google Account"
            />
          </div>
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="Username/Email"
              placeholder="E.g: nabaraj2055@gmail.com"
            />
          </div>
          <div className="dashboard-add-section">
            <AddPasswordInput
              label="Password *"
              placeholder="Enter Password"
              icon={<EyeIcon />}
              copy={<CopyIcon />}
            />
          </div>
          <div className="dashboard-add-section">
            <SelectOptionComponent type="forPass" category="category" />
          </div>
        </div>
        <div className="dashboard-addPassword-footer">
          <div className="save-action">
            <ButtonComponent varient="secondary" style="generator">
              <div className="title">Save Password</div>
            </ButtonComponent>
          </div>
          <div className="cancel-action" onClick={handleAddModalClose}>
            <ButtonComponent varient="copy" style="generator">
              <div className="icon">
                <CopyIcon />
              </div>
              <div className="title">Cancel</div>
            </ButtonComponent>
          </div>
        </div>
      </ModalComponent>
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
                <div className="generate-action" onClick={handleOpenModal}>
                  <ButtonComponent>
                    <div className="icon">
                      <GenerateIcon />
                    </div>
                    <div className="title">Generate Password</div>
                  </ButtonComponent>
                </div>
                <div
                  className="addPassword-action"
                  onClick={handleAddModalOpen}
                >
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
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>

              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>

              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
              <div className="password-card-item">
                <PasswordCardComponent
                  handleAddModalOpen={handleAddModalOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
