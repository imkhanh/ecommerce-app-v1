const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		images: { type: Array, default: [] },
		price: { type: Number, required: true },
		quantity: { type: Number, required: true },
		category: { type: ObjectId, ref: 'categories' },
		offer: { type: Number, default: 0 },
		brand: String,
		status: String,
		shipping: String,
		reviews: [
			{
				user: { type: mongoose.Types.ObjectId, ref: 'users' },
				title: String,
				review: String,
				rating: String,
				createdAt: { type: Date, default: Date.now() },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('products', productSchema);
