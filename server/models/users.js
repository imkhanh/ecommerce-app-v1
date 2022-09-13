const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			index: { unique: true },
		},
		password: {
			type: String,
			required: true,
		},
		userRole: {
			type: Number,
			default: 0,
		},
		phoneNumber: {
			type: String,
		},
		userImage: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
