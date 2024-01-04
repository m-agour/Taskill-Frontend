import React, { useState } from 'react';

const AlertComponent = ({ message, onClose }) => {
  return (
    <div className="alert">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const AlertExample = () => {
  const [alert, setAlert] = useState({ show: false, message: '' });

  const showAlert = (message) => {
    setAlert({ show: true, message });
  };

  const hideAlert = () => {
    setAlert({ show: false, message: '' });
  };

  // Function to simulate an error (e.g., API request failure)
  const simulateError = () => {
    showAlert('An error occurred!');
  };

  return (
    <div>
      <h1>Alert Example</h1>
      <button onClick={simulateError}>Simulate Error</button>

      {alert.show && (
        <AlertComponent
          message={alert.message}
          onClose={hideAlert}
        />
      )}
    </div>
  );
};

export default AlertExample;
