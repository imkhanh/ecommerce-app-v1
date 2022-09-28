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
		color: { type: String, enum: ['Black', 'White', 'Silver', 'Gray', 'Teal'] },
		size: { type: String, enum: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
		brand: { type: String, enum: ['Nike', 'Adidas', 'Puma', 'New Blance', 'Under Armour'] },
		status: { type: String, enum: ['New', 'Pre Order', 'Sale', 'Sold Out'] },
		shipping: { type: String, enum: ['Yes', 'No'] },
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
