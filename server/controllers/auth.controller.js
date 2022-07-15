const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
	register: async (req, res) => {
		try {
			const { fullname, username, email, password } = req.body;
			const userNameToLowserCase = username.toLowerCase().replace(/ /g, ' ');

			if (!(fullname && username && email && password)) return res.status(401).json({ msg: 'All fields must be required' });

			const userEmail = await userModel.findOne({ email });
			if (userEmail) return res.status(401).json({ msg: 'The email already exists' });

			if (password.length < 6) return res.status(401).json({ msg: 'Password must be at least 6 characters long' });

			const passwordHash = await bcrypt.hash(password, 12);

			const newUser = new userModel({ fullname, username: userNameToLowserCase, email, password: passwordHash });

			await newUser.save();

			const access_token = createAccessToken({ _id: newUser._id });
			const refresh_token = createRefreshToken({ _id: newUser._id });

			res.cookie('refreshToken', refresh_token, {
				httpOnly: true,
				path: '/api/refresh_token',
				maxAge: 7 * 24 * 30 * 60 * 60,
			});

			return res.json({ access_token, newUser });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;

			if (!(email && password)) return res.status(401).json({ msg: 'All fields must be required' });

			const user = await userModel.findOne({ email });
			if (!user) return res.status(401).json({ msg: 'Email does not exists' });

			if (password.length < 6) return res.status(401).json({ msg: 'Password must be at least 6 characters long' });

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) return res.status(401).json({ msg: 'Password is incorrect' });

			const access_token = createAccessToken({ _id: user._id });
			const refresh_token = createRefreshToken({ _id: user._id });

			res.cookie('refreshToken', refresh_token, {
				httpOnly: true,
				path: '/api/refresh_token',
				maxAge: 7 * 24 * 30 * 60 * 60,
			});

			return res.json({ access_token, user });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	refreshToken: async (req, res) => {
		try {
			const rf_token = req.cookies.refreshToken;

			if (!rf_token) return res.status(401).json({ msg: 'Please login/register now' });

			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
				if (err) return res.status(401).json({ msg: 'Please login/register now' });

				const access_token = createAccessToken({ _id: user._id });

				return res.json({ access_token });
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

const createAccessToken = (id) => {
	return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (id) => {
	return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = authController;
