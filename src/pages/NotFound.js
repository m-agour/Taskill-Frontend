import React from 'react';
import Header from '../components/Header'


const NotFoundPage = () => {
  return (
    <div>
      <Header title="Taskill" noButton="yes" />

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