const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		userName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		avatar: { type: String, default: 'https://res.cloudinary.com/imkhanh/image/upload/v1631617369/user.png' },
		role: { type: Number, default: 0 },
		phoneNumber: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
