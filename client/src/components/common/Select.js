import React from "react";
export default function Select({ name, id, value, options, errors, onChange }) {
  return (
    <div className="form-label-group">
      <select
        value={value}
        name={name}
        className="form-control"
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
