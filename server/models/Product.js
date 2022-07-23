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
		colors: [{ type: String, required: true }],
		sizes: [{ type: String, required: true }],
		quantity: { type: Number, default: 0 },
		status: { type: String, default: 'active' },
		images: { type: Array, default: [] },
		ratingReviews: [
			{
				user: { type: ObjectId, ref: 'user' },
				rating: String,
				review: String,
				createdAt: {
					type: Date,
					default: Date.now(),
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('product', productSchema);
