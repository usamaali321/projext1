var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var productSchema = mongoose.Schema({
  name: String,
  company: String,
});
const Wish = mongoose.model("Wish", productSchema);

function validateBranch(data) {
	const schema = Joi.object({
	  name: Joi.string().min(3).max(20).required(),
	  company: Joi.string().required(),

	});
	return schema.validate(data, { abortEarly: false });
  }
  module.exports.Wish = Wish;
  module.exports.validate = validateBranch;
