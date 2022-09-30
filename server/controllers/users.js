const Users = require('../models/users');

const userController = {
	getAllUsers: async (req, res) => {
		try {
			const users = await Users.find({});
			if (users) return res.json({ users });
		} catch (error) {
			console.log(error);
		}
	},
	getSingleUser: async (req, res) => {
		try {
			const user = await Users.findById(req.params.id);
			if (user) return res.json({ user });
		} catch (error) {
			console.log(error);
		}
	},
	deleteUser: async (req, res) => {
		try {
			await Users.findByIdAndDelete(req.params.id);
			return res.json({ success: 'User deleted successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	changePasswordUser: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
	addToCart: async (req, res) => {
		try {
			const user = await Users.findById(req.params.id);
			if (!user) return res.json({ error: 'User does not exists' });

			await Users.findByIdAndUpdate(
				{ _id: req.user.id },
				{
					cart: req.body.cart,
				}
			);
			return res.json({ success: 'Product added successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	addToWish: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = userController;
