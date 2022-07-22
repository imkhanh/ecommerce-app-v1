const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		content: { type: String, required: true },
		description: { type: String, required: true },
		category: { type: ObjectId, ref: 'category' },
		price: { type: Number, default: 0 },
		offer: { type: Number, default: 0 },
		quantity: { type: Number, default: 0 },
		status: { type: String, default: 'active' },
		images: [{ type: String, required: true }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('product', productSchema);
