import { useState } from "react";
import { saveUser } from "../services/userService";

const initialUserData = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function useUserFormStep({ role, onSuccess }) {
  const [userData, setUserData] = useState(initialUserData);
  const [createdUser, setCreatedUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState("");

  function handleUserChange(event) {
    const { name, value } = event.target;

    setUserData((currentUserData) => ({
      ...currentUserData,
      [name]: value,
    }));

    if (userError) {
      setUserError("");
    }
  }

  async function handleCreateUser(event) {
    event.preventDefault();

    try {
      setLoadingUser(true);
      setUserError("");

      const newUserData = {
        username: userData.username.trim(),
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        email: userData.email.trim(),
        password: userData.password,
        role,
      };

      const response = await saveUser(newUserData);

      setCreatedUser(response.user);

      if (onSuccess) {
        onSuccess(response.user);
      }
    } catch (error) {
      setUserError(error.message || "Error al crear el usuario");
    } finally {
      setLoadingUser(false);
    }
  }

  return {
    userData,
    createdUser,
    loadingUser,
    userError,
    handleUserChange,
    handleCreateUser,
  };
}

export default useUserFormStep;