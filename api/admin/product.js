const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const Product = require("../../models/Product");
const uuidv4 = require("uuid/v4");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  }
});
const upload = multer({ storage });

router.get("/", (req, res) => {
  Product.find()
    .populate("productType")
    .populate("productCategory")
    .then(products => res.json(products))
    .catch(err =>
      res.status(404).json({ noproductsfound: "Nie znaleziono produktów" })
    );
});

router.post(
  "/",
  [
    passport.authenticate("jwt", { session: false }),
    upload.single("productImage")
  ],
  (req, res) => {
    const {
      name,
      productType,
      productCategory,
      description,
      price,
      limit
    } = req.body;
    const product = new Product({
      name,
      productCategory,
      productType,
      description,
      price,
      limit,
      productImage: req.file.filename
    });
    product
      .save()
      .then(product => res.json(product))
      .catch(err => res.json(err));
  }
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then(product => {
        product.remove().then(() => res.json({ deleted: true }));
      })
      .catch(err =>
        res
          .status(404)
          .json({ productnotfound: "Nie znaleziono produktu o podanym id" })
      );
  }
);
module.exports = router;
