import React from 'react';

const Button = ({ className, text, onClick }) => {
  return (
    <button className={`w-[30%] p-2 text-white rounded-md ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
