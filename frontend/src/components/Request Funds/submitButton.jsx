import React from 'react';
import './submitButton.css'

const Button = ({ onClick, children }) => {
    return (
      <button className="btn" onClick={onClick}>
        {children}
      </button>
    );
  };
  
  export default Button;