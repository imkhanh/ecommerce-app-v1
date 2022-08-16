const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
	register: async (req, res) => {
		try {
			const { fullName, userName, email, password } = req.body;
			if (!(fullName && userName && email && password)) return res.status(400).json({ msg: 'All fill must be required' });

			const userEmail = await userModel.findOne({ email });
			if (userEmail) return res.status(400).json({ msg: 'Email already exists' });

			if (password.length < 6) return res.status(400).json({ msg: 'Password must be at least 6 characters long' });

			const passwordHash = await bcrypt.hash(password, 12);
			const newUser = new userModel({ fullName, userName: userName.toLowerCase().replace(/ /g, ' '), email, password: passwordHash });

			const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);
			const decode = jwt.verify(token, process.env.JWT_SECRET);

			await newUser.save();
			res.json({ status: 'Register success', token, user: decode });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!(email && password)) return res.status(400).json({ msg: 'All fill must be required' });

			const user = await userModel.findOne({ email });
			if (!user) return res.status(400).json({ msg: "Email doesn't exists" });

			if (password.length < 6) return res.status(400).json({ msg: 'Password must be at least 6 characters long' });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return res.status(400).json({ msg: 'Password is not correct' });

			const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
			const decode = jwt.verify(token, process.env.JWT_SECRET);

			res.json({ status: 'Login success', token, user: decode });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

module.exports = authController;
