const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
//api
const apiAuth = require("./api/auth");
const apiAdminUsers = require("./api/admin/users");
const apiAdminProductCategory = require("./api/admin/productCategory");
const apiAdminProductType = require("./api/admin/productType");
const apiAdminProduct = require("./api/admin/product");
const apiProducts = require("./api/products");
//MongoDB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error(err));

const app = express();
// Passport Config
require("./config/passport")(passport);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
//Api routes
app.use("/users", apiAuth);
app.use("/admin/users", apiAdminUsers);
app.use("/admin/productCategories", apiAdminProductCategory);
app.use("/admin/productTypes", apiAdminProductType);
app.use("/admin/products", apiAdminProduct);
app.use("/products", apiProducts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
