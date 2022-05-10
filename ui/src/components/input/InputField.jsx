import React  from "react";
import './InputField.css'
const InputField = ({ value, label, name, placeholder, type, onChange, onKeyDown }) => (
  <div className="form-group">
    {label && <label htmlFor="input-field">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className="form-control InputField"
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  </div>
);

export default InputField