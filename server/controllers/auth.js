const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
	register: async (req, res) => {
		try {
			const { fullName, userName, email, password } = req.body;
			if (!fullName) return res.json({ error: 'Please enter your full name' });
			if (!userName) return res.json({ error: 'Please enter your user name' });
			if (!email) return res.json({ error: 'Please enter your email' });
			if (!password) return res.json({ error: 'Please enter your password' });

			if (userName.length < 3 || userName.length > 255)
				return res.json({ error: 'User name must be 3 - 255 characters long' });

			if (password.length < 6) return res.json({ error: 'Password must be at least 6 characters long' });

			const user = await userModel.findOne({ email });
			if (user) return res.json({ error: 'Email already exists' });

			const passwordHash = await bcrypt.hash(password, 12);
			const newUser = new userModel({ fullName, userName, email, password: passwordHash });

			await newUser.save();

			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
			return res.json({
				success: 'Created account successfully. Login now',
				token,
				user: {
					id: user.id,
					fullName: user.fullName,
					userName: user.userName,
					email: user.email,
					password: '',
					role: user.role,
				},
			});
		} catch (error) {
			return res.json({ error: error.message });
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email) return res.json({ error: 'Please enter your email' });
			if (!password) return res.json({ error: 'Please enter your password' });

			const user = await userModel.findOne({ email });
			if (!user) return res.json({ error: 'The email not exists' });

			if (password.length < 6) return res.json({ error: 'Password must be at least 6 characters long' });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return res.json({ error: 'Password is incorrect' });

			const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

			return res.json({
				success: 'Login successfully',
				token,
				user: {
					id: user.id,
					fullName: user.fullName,
					userName: user.userName,
					email: user.email,
					password: '',
					role: user.role,
				},
			});
		} catch (error) {
			return res.json({ error: error.message });
		}
	},
};

module.exports = authController;
