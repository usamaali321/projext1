var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    city:String,
    colour:String,
    detail:String,
});

let Product= mongoose.model("Products",productSchema);

function validateProduct(data) {
	const schema = Joi.object({
	  name: Joi.string().min(3).max(20).required(),
	  price: Joi.number().min(0).required(),
      city: Joi.string().required(),
      location: Joi.string().required(),
      detail: Joi.string()
      
	});
	return schema.validate(data, { abortEarly: false });
  }
  module.exports.Product = Product;
  module.exports.validate = validateProduct;
