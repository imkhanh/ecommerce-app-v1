const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
		description: { type: String, required: true },
		images: { type: Array, default: [] },
		price: { type: String, required: true },
		quantity: { type: Number, required: true },
		status: String,
		offer: String,
		ratingReviews: [
			{
				user: { type: mongoose.Types.ObjectId, ref: 'users' },
				rating: String,
				review: String,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('products', productSchema);
