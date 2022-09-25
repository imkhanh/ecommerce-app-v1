const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
	register: async (req, res) => {
		try {
			const { fullName, userName, email, password } = req.body;
			if (!fullName || !userName || !email || !password) return res.status(400).json({ error: 'All fields must not be empty' });

			if (userName.length < 3 || userName.length > 255) return res.status(400).json({ error: 'User name must be 3 - 255 character long' });

			if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 character long' });

			const user = await userModel.findOne({ email });
			if (user) return res.status(400).json({ error: 'Email already exists' });

			const passwordHash = await bcrypt.hash(password, 12);
			const newUser = new userModel({ fullName, userName, email, password: passwordHash });

			await newUser.save();

			const accessToken = createAccessToken({ id: newUser._id });
			const refreshToken = createRefreshToken({ id: newUser._id });

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				path: '/api/refresh-token',
				maxAge: 1 * 24 * 60 * 60 * 1000,
			});

			return res.status(200).json({ success: 'Created account successfully. Login now', accessToken });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) return res.status(400).json({ error: 'All fields must not be empty' });

			const user = await userModel.findOne({ email });
			if (!user) return res.status(400).json({ error: 'The email not exists' });

			if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 character long' });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return res.status(400).json({ error: 'Password is incorrect' });

			const accessToken = createAccessToken({ id: user._id });
			const refreshToken = createRefreshToken({ id: user._id });

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				path: '/api/refresh-token',
				maxAge: 1 * 24 * 60 * 60 * 1000,
			});

			return res.status(200).json({ success: 'Login successfully', accessToken, user });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	logout: async (req, res) => {
		try {
			res.clearCookie('refreshToken', { path: '/api/refresh-token' });
			return res.status(200).json({ success: 'Logged out' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	refreshToken: async (req, res) => {
		try {
			const rf_token = req.cookies.refreshToken;
			if (!rf_token) return res.status(400).json({ error: 'Please login or register' });

			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
				if (err) return res.status(400).json({ error: 'Please login or register' });

				const accessToken = createAccessToken({ id: user.id });
				return res.json({ accessToken });
			});
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};

const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (user) => {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
};

module.exports = authController;
