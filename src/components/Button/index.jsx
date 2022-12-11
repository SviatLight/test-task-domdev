import React from 'react';

const Button = ({ btnClass, text, func }) => {
  return (
    <button className={`w-[30%] p-2 text-white rounded-md ${btnClass}`} onClick={func}>
      {text}
    </button>
  );
};

export default Button;
