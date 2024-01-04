import React from 'react';
import Header from '../components/Header'

const NotFoundPage = () => {
  const handleButtonClick = () => {
    // Handle navigation or state change to go to the Login page
  };

  return (
    <div>
      <Header title="Taskill" isLoginPage={false} onButtonClick={handleButtonClick} />

        <div className="container">
            <div className="container mt-5 register-div">
                <div>
                <h2 className='form-header'>404 Not Found</h2>
                </div>
            </div>
        </div>
      
    </div>
  );
};

export default NotFoundPage;