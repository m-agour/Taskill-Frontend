import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push("/register");
  };

  return (
    <div>
      <Header
        title="Taskill"
        buttonText="Register"
        onButtonClick={handleButtonClick}
      />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
