const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const ProductType = require("../models/ProductType");
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
module.exports = router;
