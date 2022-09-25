const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		userName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		avatar: { type: String, default: 'https://res.cloudinary.com/imkhanh/image/upload/v1631617369/user.png' },
		role: { type: Number, default: 0 },
		cart: [{ type: Array, default: [] }],
		wish: [{ type: Array, default: [] }],
		phoneNumber: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
