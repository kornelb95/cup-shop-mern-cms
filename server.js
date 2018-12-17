const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// const passport = require("passport");
// const path = require("path");

const apiUsers = require("./api/users");
const apiAdminUsers = require("./api/admin/users");

//Database
const db = require("./config/keys").mongoURI;
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error(err));

//Api routes
app.use("/users", apiUsers);
app.use("/admin/users", apiAdminUsers);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
