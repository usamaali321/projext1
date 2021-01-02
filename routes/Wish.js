var express = require('express');
var router = express.Router();
var {Wish,validate} = require("../DBmodles/wish");
var checkSessionAuth = require("../middleware/sessionAuth");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Wish.find();
  res.render("wishs/list", { title: "Branches in Our Brand", products });
});
router.get("/add",checkSessionAuth, async function (req, res, next) {
  res.render("wishs/add");
});
router.post("/add", async function (req, res, next) {
  const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
  let product = new Wish(req.body);
  await product.save();
  res.redirect("/wishs");
});
router.get("/delete/:id", async function (req, res, next) {
  let product = await Wish.findByIdAndDelete(req.params.id);
  res.redirect("/wishs");
});

module.exports = router;
