import React from "react";

const Input = ({
  name,
  value,
  placeholder,
  onChange,
  className,
  autoFocus,
  error,
}) => {
  return (
    <div class='mb-3'>
      <input
        autoFocus={autoFocus ? true : undefined}
        value={value}
        onChange={onChange}
        type={name}
        class={className}
        id={name}
        name={name}
        placeholder={placeholder}
      />
      {error && <div className='aler alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;
