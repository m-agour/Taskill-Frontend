import React, { useState } from 'react';
import FormInput from './FormInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Perform actions like sending data to the server or any other logic here
  };

  return (
    <div className="container">

      <div className="container mt-5 register-div">
        <h2 className='form-header'>Register</h2>

        <form onSubmit={handleSubmit}>
        <FormInput
            label="First Name"
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Last Name"
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
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
          <button type="submit" className="btn btn-primary register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
