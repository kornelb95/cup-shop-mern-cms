const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInputData(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Nazwa powinna zawierać od 2 do 30 znaków";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Nazwa użytkownika jest wymagana";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Adres email jest wymagany";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Adres email jest nieprawidłowy";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Hasło jest wymagane";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Hasło musi mieć od 6 do 30 znaków";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Potwierdzenie hasła jest wymagane";
  } else {
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Potwierdzenie hasła nieprawidłowe";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
