import React from "react";
function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required={required}
    />
  );
}
export default Input;