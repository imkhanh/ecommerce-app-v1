const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
	{
		products: [
			{
				id: { type: ObjectId, ref: 'products' },
				quantity: Number,
			},
		],
		user: { type: ObjectId, ref: 'users', require: true },
		amount: { type: Number, require: true },
		transactionId: { type: String, require: true },
		address: { type: String, require: true },
		phoneNumber: { type: Number, require: true },
		status: {
			type: String,
			default: 'Not processed',
			enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('orders', orderSchema);
