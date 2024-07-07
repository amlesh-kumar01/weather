import React, { useState } from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="error-message">
      <span>{message}</span>
      <span className="close-icon" onClick={() => setVisible(false)}>&times;</span>
    </div>
  );
};

export default ErrorMessage;
