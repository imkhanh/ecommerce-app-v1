const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
	register: async (req, res) => {
		try {
			const { fullName, userName, email, password } = req.body;
			if (!fullName || !userName || !email || !password) return res.json({ error: 'All fields must not be empty' });

			if (userName.length < 3 || userName.length > 255) return res.json({ error: 'User name must be 3 - 255 character long' });

			if (password.length < 6) return res.json({ error: 'Password must be at least 6 character long' });

			const user = await userModel.findOne({ email });
			if (user) return res.json({ error: 'Email already exists' });

			const passwordHash = await bcrypt.hash(password, 12);
			const newUser = new userModel({ name, email, password: passwordHash });

			await newUser.save();

			return res.json({ success: 'Created account successfully. Login now' });
		} catch (error) {
			console.log(error);
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) return res.json({ error: 'All fields must not be empty' });

			const user = await userModel.findOne({ email });
			if (!user) return res.json({ error: 'Email not exists' });

			if (password.length < 6) return res.json({ error: 'Password must be at least 6 character long' });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return res.json({ error: 'Password is incorrect' });

			const token = jwt.sign({ _id: user._id, name: user.name, userRole: user.userRole }, process.env.JWT_SECRET, { expiresIn: '1d' });
			const decode = jwt.verify(token, process.env.JWT_SECRET);

			return res.json({ token, user: decode });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = authController;
