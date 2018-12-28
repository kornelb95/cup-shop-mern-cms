const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const ProductType = require("../../models/ProductType");
/*
@PUBLIC GET
@POBRANIE WSZYSTKICH TYPÓW PRODUKTÓW
*/
router.get("/", (req, res) => {
  ProductType.find()
    .then(productTypes => res.json(productTypes))
    .catch(err =>
      res.status(404).json({ noprodtypefound: "Nie znaleziono typu produktów" })
    );
});
/*
@PRIVATE POST
@STWORZENIE NOWEGO TYPU
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    new ProductType({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name
    })
      .save()
      .then(productType => res.json(productType))
      .catch(err => res.error(err));
  }
);
/*
@PRIVATE DELETE
@USUNIĘCIE TYPU PRODUKTU
*/
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProductType.findById(req.params.id)
      .then(productType => {
        productType.remove().then(() => res.json({ deleted: true }));
      })
      .catch(err =>
        res.status(404).json({
          productTypenotfound: "Nie znaleziono typu produktu o podanym id"
        })
      );
  }
);
module.exports = router;
