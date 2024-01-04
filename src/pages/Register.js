import React from 'react';
import Header from '../components/Header'
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  const handleButtonClick = () => {
    // Handle navigation or state change to go to the Login page
  };

  return (
    <div>
      <Header title="Register" isLoginPage={false} onButtonClick={handleButtonClick} />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;