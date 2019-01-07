const express = require("express");
const router = express.Router();
const passport = require("passport");
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const ProductType = require("../models/ProductType");
const LikedProduct = require("../models/LikedProduct");

/*
@public GET
@pobranie wszystkich kategorii produktów
*/
router.get("/productCategories", (req, res) => {
  ProductCategory.find()
    .then(productCategories => res.json(productCategories))
    .catch(err =>
      res.status(404).json({ noprodcatfound: "Nie znaleziono kategorii" })
    );
});
/*
@public GET
@pobranie wszystkich produktów
*/
router.get("/products", (req, res) => {
  Product.find()
    .populate("productType")
    .populate("productCategory")
    .then(products => res.json(products))
    .catch(err =>
      res.status(404).json({ noproductsfound: "Nie znaleziono produktów" })
    );
});
/*
@PUBLIC GET
@POBRANIE WSZYSTKICH TYPÓW PRODUKTÓW
*/
router.get("/productTypes", (req, res) => {
  ProductType.find()
    .then(productTypes => res.json(productTypes))
    .catch(err =>
      res.status(404).json({ noprodtypefound: "Nie znaleziono typu produktów" })
    );
});
/*
@PRIVATE POST
@DODANIE DO PRODUKTU DO ULUBIONYCH
*/
router.post(
  "/likedproduct",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { product, user } = req.body;
    const likedProduct = new LikedProduct({
      product,
      user
    });
    likedProduct
      .save()
      .then(likedProduct => res.json(likedProduct))
      .catch(err => res.json(err));
  }
);
/*
@public GET
@pobranie wszystkich produktów
*/
router.get("/likedproduct", (req, res) => {
  LikedProduct.find()
    .populate("user")
    .populate("product")
    .then(likedProducts => res.json(likedProducts))
    .catch(err =>
      res
        .status(404)
        .json({ nolikedProductsfound: "Nie znaleziono ulubionych produktów" })
    );
});

router.delete(
  "/likedproduct/:product/:user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    LikedProduct.findOne({
      product: { _id: req.params.product },
      user: { _id: req.params.user }
    })
      .then(likedProduct => {
        likedProduct.remove().then(() => res.json({ deleted: true }));
      })
      .catch(err =>
        res.status(404).json({
          likedProductnotfound: "Nie znaleziono produktu o podanym id"
        })
      );
  }
);
module.exports = router;
