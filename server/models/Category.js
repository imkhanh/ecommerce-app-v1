const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		content: { type: String, required: true },
		description: { type: String, required: true },
		status: { type: String, default: 'active' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('category', categorySchema);
