const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const validateRegisterInputData = require("../../utils/validation/register");
const validateUpdateUserData = require("../../utils/validation/updateUser");
const User = require("../../models/User");

router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
    .catch(err =>
      res.status(404).json({ nousersfound: "Nie znaleziono użytkowników" })
    );
});
router.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(user => res.json(user))
    .catch(err =>
      res.status(404).json({ nouserfound: "Nie znaleziono użytkownika" })
    );
});
//create user by admin
router.post("/", (req, res) => {
  const { errors, isValid } = validateRegisterInputData(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Konto z takim adresem email już istnieje";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role ? req.body.role : 2
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.error(err));
        });
      });
    }
  });
});
//update user by admin
router.put("/", (req, res) => {
  const { errors, isValid } = validateUpdateUserData(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const fields = {};
  if (req.body.email) fields.email = req.body.email;
  if (req.body.name) fields.name = req.body.name;
  if (req.body.role) fields.role = req.body.role;
  if (req.body.password) {
    fields.password = req.body.password;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(fields.password, salt, (err, hash) => {
        if (err) throw err;
        fields.password = hash;
      });
    });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      //update user data
      User.findOneAndUpdate(
        { email: fields.email },
        { $set: fields },
        { new: true }
      ).then(user => res.json(user));
    }
  });
});
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.remove().then(() => res.json({ deleted: true }));
    })
    .catch(err =>
      res
        .status(404)
        .json({ usernotfound: "Nie znaleziono użytkownika o podanym id" })
    );
});
module.exports = router;
