import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FormInput from "./FormInput";
import { login } from "../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const LoginForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      if (res) window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <div className="container mt-5 register-div">
        <div className="register-header-div">
          <h2 className="form-header"> Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
