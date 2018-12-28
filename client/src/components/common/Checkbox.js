import React from "react";
import classnames from "classnames";
export default function Checkbox({
  name,
  id,
  value,
  errors,
  placeholder,
  onChange,
  disabled
}) {
  return (
    <div className="form-group form-check">
      <input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        className={classnames("form-check-input", {
          "is-invalid": errors
        })}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled ? disabled : false}
      />
      {errors && <div className="invalid-feedback">{errors}</div>}
      <label className="form-check-label" htmlFor={id}>
        {placeholder}
      </label>
    </div>
  );
}
