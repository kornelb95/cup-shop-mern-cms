const express = require("express");
const router = express.Router();
const passport = require("passport");

const Product = require("../../models/Product");

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
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {
      name,
      productType,
      productCategory,
      description,
      price,
      purches
    } = req.body;
    const product = new Product({
      name,
      productCategory,
      productType,
      description,
      price,
      purches
    });
    product
      .save()
      .then(product => res.json(product))
      .catch(err => res.error(err));
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
