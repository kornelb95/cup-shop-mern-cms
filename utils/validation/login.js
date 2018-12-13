const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInputData(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email jest nieprawidłowy";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Wpisz adres email";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Wpisz hasło";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
