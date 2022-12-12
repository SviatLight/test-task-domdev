import React from 'react';

interface ButtonProps {
  className: string;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, onClick, children }) => {
  return (
    <button className={`w-[30%] p-2 text-white rounded-md ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
