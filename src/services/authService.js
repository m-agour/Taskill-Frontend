import axios from "axios";
import Cookies from "js-cookie";
import { getToast } from "./utils";
import "toastify-js/src/toastify.css";

const API_URL = process.env.REACT_APP_API_URL;

const setUserData = (data) => {
  let user_data = {
    id: data.id,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    token: data.token,
  };
  Cookies.set("user", JSON.stringify(user_data), {
    secure: true,
    sameSite: "strict",
  });
};

const getUserData = () => {
  let user_data = Cookies.get("user");
  if (user_data) {
    return JSON.parse(user_data);
  }
  return null;
};

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, userData);
    if (response.status === 201) {
      setUserData(response.data);
      getToast("Registration successful").showToast();
      axios.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
      return response.data;
    }
  } catch (error) {
    console.error("Registration failed:", error.response.data);
    let errors = error.response.data;
    if (error.response && error.response.data) {
      getToast(Object.values(errors)[0], (error = true)).showToast();
    } else {
      getToast("Our servers are down!", (error = true)).showToast();
    }
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, userData);
    if (response.status === 200) {
      setUserData(response.data);
      getToast("Login successful").showToast();
      axios.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
    }
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response.data);
    let errors = error.response.data;
    for (const [key, value] of Object.entries(errors)) {
      getToast(`${value}`, (error = true)).showToast();
    }
  }
};

const isloggedIn = () => {
  try {
    let user_data = Cookies.get("user");
    if (user_data) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getToken = () => {
  let user_data = Cookies.get("user");
  if (user_data) {
    return JSON.parse(user_data).token;
  }
  return null;
};

const logout = () => {
  Cookies.remove("user");
  window.location.href = "/";
};

export { register, login, isloggedIn, getToken, getUserData, logout };
