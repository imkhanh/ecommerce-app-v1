const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		userName: { type: String, required: true },
		photoUrl: { type: String, default: 'https://res.cloudinary.com/imkhanh/image/upload/v1631617369/user.png' },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		role: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
