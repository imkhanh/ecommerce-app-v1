const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		userName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: Number, default: 0 },
		phoneNumber: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
