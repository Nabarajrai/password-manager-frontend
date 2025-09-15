import { useState, useCallback, useMemo } from "react";
import { AddUserIcon, PeopleIcon, SecureIcon } from "../../helpers/Icon.helper";
import { UserIcon, AdminIcon, LogoutIcon } from "../../helpers/Icon.helper";
import ModalComponent from "../modal/Modal.component";
import CardComponent from "../card/Card.component";
import ButtonComponent from "../button/Button.component";
import AddPasswordInput from "../addInput/AddPasswordInput";
import SelectOptionComponent from "../selectOption/SelectOption.component";
import classnames from "classnames";
//react-query
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
//icons
import {
  ResetKeyIcon,
  ResetPinIcon,
  DeleteIcon,
} from "../../helpers/Icon.helper";
//helpers
import { useAuth } from "../../hooks/user/useAuth.js";
//hooks
import { useRole } from "../../hooks/roles/useRole.js";
import { useUserCreate } from "../../hooks/userCreate/useUserCreate.js";

const HeaderComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [addUserSection, setAddUserSection] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    pin: "",
    role_id: 2,
  });
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const { createUser, fetchUsers } = useUserCreate();
  const { fetchRoles } = useRole();
  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const handleAdduser = useCallback(() => {
    setAddUserSection(true);
  }, []);
  const handleAdduserClose = useCallback(() => {
    setAddUserSection(false);
  }, []);
  const handleAdduserSection = useMemo(() => {
    const activeClass = addUserSection && "active";
    return classnames("admin-panel-useradd-form", activeClass);
  }, [addUserSection]);

  const {
    data,
    isError,
    error: userError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onMutate: async (newUser) => {
      console.log("new user", newUser);
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData(["users"]);
      queryClient.setQueryData(["users"], (old = []) => [
        ...old,
        { ...newUser, temp_id: Math.random().toString(36).slice(2, 11) },
      ]);
      return { previousUsers };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["users"], context?.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onSuccess: () => {
      setAddUserSection(false);
    },
  });

  const handleCreateUser = useCallback(
    async (e) => {
      e.preventDefault();
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.password ||
        !formData.pin
      ) {
        setError("All fields are required");
        return;
      }

      if (mutation.isLoading) return;

      const userInfo = {
        username: formData.fullName,
        email: formData.email,
        temp_password: formData.password,
        pin_hash: formData.pin,
        role_id: Number(formData.role_id),
      };
      mutation.mutate(userInfo);
    },
    [mutation, formData]
  );
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  return (
    <>
      <ModalComponent
        title="Admin Panel"
        isModalOpen={modalOpen}
        setIsModalOpen={setModalOpen}
        modalFor="admin">
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
          <div className="admin-panel-action" onClick={handleAdduser}>
            <ButtonComponent variant="primary">
              <div className="icon">
                <AddUserIcon />
              </div>
              <div className="title">Add New User</div>
            </ButtonComponent>
          </div>
          <div className={handleAdduserSection}>
            <h3>Add New User</h3>
            <form className="useradd-form-group" onSubmit={handleCreateUser}>
              <div className="useradd-form-input-section">
                <AddPasswordInput
                  type="text"
                  placeholder="Full Name"
                  onChange={handleInputChange}
                  name="fullName"
                  value={formData.fullName}
                />
              </div>
              <div className="useradd-form-input-section">
                <AddPasswordInput
                  type="email"
                  placeholder="Email Address"
                  onChange={handleInputChange}
                  name="email"
                  value={formData.email}
                />
              </div>
              <div className="useradd-form-input-section">
                <AddPasswordInput
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  name="password"
                  value={formData.password}
                />
              </div>
              <div className="useradd-form-input-section">
                <AddPasswordInput
                  type="password"
                  placeholder="4 Digit Pin"
                  onChange={handleInputChange}
                  name="pin"
                  value={formData.pin}
                />
              </div>
              <div className="useradd-form-input-section">
                <SelectOptionComponent
                  type="forPass"
                  onChange={handleInputChange}
                  values={roles?.data}
                  name="role_id"
                  value={formData.role_id}
                />
              </div>
              <div className="useradd-form-action-section">
                <div className="user-form-action-section__add">
                  <ButtonComponent varient="secondary">
                    Add User
                  </ButtonComponent>
                </div>
                <div
                  className="user-from-action-section__cancel"
                  onClick={handleAdduserClose}>
                  <ButtonComponent varient="copy">Cancel</ButtonComponent>
                </div>
              </div>
            </form>
            <div className="login-error">
              {error && <p className="error-text">{error}</p>}
            </div>
          </div>
          <div className="admin-panel-table-section">
            <div className="admin-panel-table-section__head">
              User Management
            </div>
            <div className="admin-panel-table" style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Rol</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users?.map((user) => (
                    <tr>
                      <td className="admin-user">
                        <div className="admin-user__name">
                          {/* Nabaraj Rai <span>(You)</span> */}
                          {user?.username}
                        </div>
                        <div className="admin-user__email">{user?.email}</div>
                      </td>
                      <td>
                        <span className="admin-user-admin">
                          {user?.role_name}
                        </span>
                      </td>
                      <td>{user?.created_at}</td>
                      <td className="action-btns">
                        <button className="reset-key" title="Reset Password">
                          <ResetKeyIcon />
                        </button>
                        <button className="reset-pin" title="Reset Pin">
                          <ResetPinIcon />
                        </button>
                        <button className="delete-user" title="Delete User">
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="table-error">
                {isError && <p className="error-text">{userError}</p>}
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
              <div className="logout" onClick={logout}>
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
