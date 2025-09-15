import { useState, useCallback, useMemo, useEffect } from "react";
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
import { useUser } from "../../hooks/user/useUser.jsx";
import { useToast } from "../../hooks/toast/useToast.js";

//helpres

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
  const { showSuccessToast } = useToast();
  const { logout } = useAuth();
  const {
    createUser,
    fetchUsers,
    fetchTempUsers,
    deleteUser,
    deleteTempUser,
    passwordResetLink,
    sendResetPinLink,
  } = useUserCreate();
  const { fetchRoles } = useRole();
  const { user } = useUser();
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
    isPending: userPending,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });

  const { data: tempUsers = [] } = useQuery({
    queryKey: ["temp-users"],
    queryFn: fetchTempUsers,
  });

  const deleteMutate = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessToast("User deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      showSuccessToast(error?.message, "error");
      throw error;
    },
  });

  const deleteTempUserMutate = useMutation({
    mutationFn: deleteTempUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["temp-users"] });
      showSuccessToast("Temporary user deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting temp users", error);
      showSuccessToast(error?.message, "error");
      throw error;
    },
  });

  const passwordResetLinkMutation = useMutation({
    mutationFn: passwordResetLink,
    onSuccess: async () => {
      showSuccessToast("Password reset link sent successfully");
    },
    onError: (error) => {
      console.error("Error sending password reset link:", error);
      showSuccessToast(error?.message, "error");
      throw error;
    },
  });
  const sendResetPinLinkMutation = useMutation({
    mutationFn: sendResetPinLink,
    onSuccess: async () => {
      showSuccessToast("Reset pin link sent successfully");
    },
    onError: (error) => {
      console.error("Error sending reset pin link:", error);
      showSuccessToast(error?.message, "error");
      throw error;
    },
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["temp-users"] });
      const previousUsers = queryClient.getQueryData(["temp-users"]) ?? [];
      queryClient.setQueryData(["temp-users"], (old) => {
        const newData = [
          ...old,
          {
            temp_id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            role_name: "USER",
            ...newUser,
          },
        ];
        setAddUserSection(false);
        return newData;
      });
      return { previousUsers };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["temp-users"], context?.previousUsers);
      showSuccessToast(error?.message, "error");
      throw error;
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setAddUserSection(false);
    },
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      queryClient.invalidateQueries({ queryKey: ["temp-users"] });
      showSuccessToast("User created successfully");
      setAddUserSection(false);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        pin: "",
        role_id: "",
      });
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

  const handleDeleteUser = useCallback(
    (userId) => {
      if (mutation.isLoading) return;
      deleteMutate.mutate(userId);
    },
    [deleteMutate, mutation]
  );

  const handleTempUserDelete = useCallback(
    (userId) => {
      console.log("tempuser id", userId);
      if (deleteTempUserMutate.isLoading) return;
      deleteTempUserMutate.mutate(userId);
    },
    [deleteTempUserMutate]
  );

  const sendResetLinkPassword = useCallback(
    (userInfo) => {
      const payload = {
        username: userInfo.username,
        email: userInfo.email,
      };
      if (passwordResetLinkMutation.isLoading) return;
      passwordResetLinkMutation.mutate(payload);
    },
    [passwordResetLinkMutation]
  );

  const sendResetPinLinks = useCallback(
    (userInfo) => {
      const payload = {
        username: userInfo.username,
        email: userInfo.email,
      };
      if (sendResetPinLinkMutation.isLoading) return;
      sendResetPinLinkMutation.mutate(payload);
    },
    [sendResetPinLinkMutation]
  );

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
          {tempUsers?.length > 0 && (
            <div className="admin-panel-table-section">
              <div className="admin-panel-table-section__head">
                Temporary User Management
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
                    {userPending ? (
                      <h3>Loading....</h3>
                    ) : (
                      tempUsers.map((user, idx) => (
                        <tr key={idx}>
                          <td className="admin-user">
                            <div className="admin-user__name">
                              {user?.username}
                            </div>
                            <div className="admin-user__email">
                              {user?.email}
                            </div>
                          </td>
                          <td>
                            <span className="admin-user-admin">
                              {user?.role_name}
                            </span>
                          </td>
                          <td>{user?.created_at}</td>
                          <td className="action-btns">
                            <button
                              className="reset-key"
                              title="Reset Password">
                              <ResetKeyIcon />
                            </button>
                            <button className="reset-pin" title="Reset Pin">
                              <ResetPinIcon />
                            </button>
                            <button
                              className="delete-user"
                              title="Delete User"
                              onClick={() => handleTempUserDelete(user.id)}>
                              <DeleteIcon />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="table-error">
                  {isError && <p className="error-text">{userError}</p>}
                </div>
              </div>
            </div>
          )}
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
                  {data?.users?.map((user, idx) => (
                    <tr key={idx}>
                      <td className="admin-user">
                        <div className="admin-user__name">{user?.username}</div>
                        <div className="admin-user__email">{user?.email}</div>
                      </td>
                      <td>
                        <span className="admin-user-admin">
                          {user?.role_name}
                        </span>
                      </td>
                      <td>{user?.created_at}</td>
                      <td className="action-btns">
                        <button
                          className="reset-key"
                          title="Reset Password"
                          onClick={() => sendResetLinkPassword(user)}>
                          <ResetKeyIcon />
                        </button>
                        <button
                          className="reset-pin"
                          title="Reset Pin"
                          onClick={() => sendResetPinLinks(user)}>
                          <ResetPinIcon />
                        </button>
                        <button
                          className="delete-user"
                          title="Delete User"
                          onClick={() => handleDeleteUser(user.id)}>
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="table-error">
                {isError && <p className="error-text">{userError?.message}</p>}
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
                    Nabaraj Rai{" "}
                    {user?.role_name === "ADMIN" ? (
                      <span>(Admin)</span>
                    ) : (
                      <span>(User)</span>
                    )}
                  </p>
                </div>
              </div>
              {user?.role_name === "ADMIN" && (
                <div className="admin-profile" onClick={handleOpenModal}>
                  <div className="icon">
                    <AdminIcon />
                  </div>
                  <div className="name">Admin</div>
                </div>
              )}

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
