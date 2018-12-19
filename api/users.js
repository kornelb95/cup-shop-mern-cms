const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const User = require("../models/User");
const validateRegisterInputData = require("../utils/validation/register");
const validateLoginInputData = require("../utils/validation/login");

router.get("/test", (req, res) => res.json({ msg: "Hello" }));

router.post("/register", (req, res) => {
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
router.post("/registerFb", (req, res) => {
  const { errors, isValid } = validateRegisterInputData(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          token
        });
      });
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
            .then(user => {
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
              };
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token
                  });
                }
              );
            })
            .catch(err => console.error(err));
        });
      });
    }
  });
});
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInputData(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Nie znaleziono użytkownika o takim adresie email";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token
            });
          }
        );
      } else {
        errors.password = "Nieprawidłowe hasło";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
