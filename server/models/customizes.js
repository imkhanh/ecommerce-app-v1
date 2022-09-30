const mongoose = require('mongoose');

const customizeSchema = new mongoose.Schema(
	{
		slideImage: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('customizes', customizeSchema);
