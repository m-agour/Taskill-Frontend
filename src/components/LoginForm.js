import React, { useState } from 'react';
import FormInput from './FormInput';
import { login } from '../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const response = await login(formData);
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container">

      <div className="container mt-5 register-div">
        <div className="register-header-div">
          <h2 className='form-header'> Login</h2>
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
          <button type="submit" className="btn register-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
