import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import FormInput from './FormInput';
import { register } from '../services/authService'; // Adjust the path accordingly
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


const RegisterForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
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
      const response = await register(formData);
      console.log('Registration successful:', response);
      history.push('/dashboard');

    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="container">

      <div className="container mt-5 register-div">
      <div className="register-header-div">
          <h2 className='form-header'> Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
        <FormInput
            label="First Name"
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Last Name"
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
