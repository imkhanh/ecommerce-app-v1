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

			const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
			const decode = jwt.verify(token, process.env.JWT_SECRET);

			return res.json({ msg: 'Create an account successfully', token, user: decode });
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

			const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
			const decode = jwt.verify(token, process.env.JWT_SECRET);

			return res.json({ token, user: decode });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

module.exports = authController;
