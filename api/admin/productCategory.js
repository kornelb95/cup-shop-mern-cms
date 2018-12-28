const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const ProductCategory = require("../../models/ProductCategory");
/*
@public GET
@pobranie wszystkich kategorii produktów
*/
router.get("/", (req, res) => {
  ProductCategory.find()
    .then(productCategories => res.json(productCategories))
    .catch(err =>
      res.status(404).json({ noprodcatfound: "Nie znaleziono kategorii" })
    );
});
/*
@PRIVATE POST
@STWORZENIE NOWEJ KATEGORII
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    new ProductCategory({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      hidden: req.body.hidden
    })
      .save()
      .then(productCategory => res.json(productCategory))
      .catch(err => res.error(err));
  }
);
/*
@PRIVATE DELETE
@USUNIĘCIE KATEGORII PRODUKTU
*/
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProductCategory.findById(req.params.id)
      .then(productCategory => {
        productCategory.remove().then(() => res.json({ deleted: true }));
      })
      .catch(err =>
        res.status(404).json({
          productCategorynotfound: "Nie znaleziono typu produktu o podanym id"
        })
      );
  }
);
module.exports = router;
