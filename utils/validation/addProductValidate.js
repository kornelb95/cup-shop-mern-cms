const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddProductInputData(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Nazwa produktu jest wymagana";
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = "Cena produktu jest wymagana";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
