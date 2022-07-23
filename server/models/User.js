const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		fullname: { type: String, required: true },
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		avatar: { type: String, default: 'https://res.cloudinary.com/imkhanh/image/upload/v1631617369/user.png' },
		role: { type: Number, default: 1 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
