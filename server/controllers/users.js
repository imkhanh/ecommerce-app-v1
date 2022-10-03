const Users = require('../models/users');
const bcypt = require('bcrypt');

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
	editUser: async (req, res) => {
		try {
			const { fullName, userName, phoneNumber, email } = req.body;

			const editUser = await Users.findByIdAndUpdate(
				{ _id: req.params.id },
				{ fullName, userName, phoneNumber, email, updatedAt: Date.now() },
				{ new: true }
			);

			if (editUser) return res.json({ success: 'User edited successfully' });
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
			const { uId, oldPassword, newPassword } = req.body;
			if (!uId || !oldPassword || !newPassword) return res.json({ error: 'All fileds must be required' });

			const data = await Users.findOne({ _id: uId });
			if (!data) {
				return res.json({ error: 'Invalid User' });
			}
			const oldPasswordCheck = await bcypt.compare(oldPassword, data.password);
			if (oldPasswordCheck) {
				const newPasswordHash = await bcypt.hash(newPassword, 10);
				const changePassword = await Users.findByIdAndUpdate(uId, { password: newPasswordHash }, { new: true });
				if (changePassword) return res.json({ success: 'Password updated successfully' });
			}
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = userController;
