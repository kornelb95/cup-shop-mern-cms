import React from "react";
import classnames from "classnames";
export default function TextInputDefault({
  type,
  name,
  id,
  defaultValue,
  errors,
  placeholder,
  onChange,
  disabled
}) {
  return (
    <div className="form-label-group">
      <input
        type={type ? type : "text"}
        name={name}
        id={id}
        defaultValue={defaultValue}
        className={classnames("form-control", {
          "is-invalid": errors
        })}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled ? disabled : false}
      />
      {errors && <div className="invalid-feedback">{errors}</div>}
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
}
