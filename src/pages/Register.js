import React from 'react';
import { useHistory } from "react-router-dom";
import Header from '../components/Header'
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    const history = useHistory();

    const handleButtonClick = () => {
      history.push('/login');
    };

  return (
    <div>
      <Header title="Taskill" isLoginPage={false} onButtonClick={handleButtonClick} />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;