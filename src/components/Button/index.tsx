import React from 'react';

type ButtonProps = {
  className: string;
  text: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ className, text, onClick }) => {
  return (
    <button className={`w-[30%] p-2 text-white rounded-md ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
