const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
	register: async (req, res) => {
		try {
			const { fullName, userName, email, password } = req.body;
			if (!fullName || !userName || !email || !password) {
				return res.json({ error: 'All field must be required' });
			}
			if (userName.length < 3 || userName.length > 255) {
				return res.json({ error: 'Pleser name must be 3 - 255 characters long' });
			}
			if (password.length < 6) {
				return res.json({ error: 'Password must be at least 6 characters long' });
			}

			const user = await userModel.findOne({ email });
			if (user) {
				return res.json({ error: 'The email already exists' });
			}

			const passwordHash = await bcrypt.hash(password, 12);
			const newUser = new userModel({ fullName, userName, email, password: passwordHash });

			await newUser.save();

			const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
			const endCode = jwt.verify(token, process.env.JWT_SECRET);

			return res.json({
				success: 'Created account successfully. Login now',
				token,
				user: endCode,
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
			const endCode = jwt.verify(token, process.env.JWT_SECRET);
			return res.json({
				success: 'Login successfully',
				token,
				user: endCode,
			});
		} catch (error) {
			return res.json({ error: error.message });
		}
	},
};

module.exports = authController;
