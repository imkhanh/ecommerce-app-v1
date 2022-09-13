const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
	register: async (req, res) => {
		try {
			let error = {};
			const { name, email, password } = req.body;
			if (!name || !email || !password) {
				error = {
					...error,
					name: 'Filed must not be empty',
					email: 'Filed must not be empty',
					password: 'Filed must not be empty',
				};
				return res.json({ error });
			}
			if (name.length < 3 || name.length > 255) {
				error = {
					...error,
					name: 'Name must be 3 - 255 character long',
					email: '',
					password: '',
				};
				return res.json({ error });
			}
			if (password.length < 6) {
				error = {
					...error,
					name: '',
					email: '',
					password: 'Password must be at least 6 character long',
				};
				return res.json({ error });
			}
			const user = await userModel.findOne({ email });
			if (user) {
				error = {
					...error,
					name: '',
					email: 'Email already exists',
					password: '',
				};
				return res.json({ error });
			}
			const passwordHash = await bcrypt.hash(password, 12);
			const newUser = new userModel({ name, email, password: passwordHash });

			await newUser.save();

			return res.json({ newUser });
		} catch (error) {
			console.log(error);
		}
	},
	login: async (req, res) => {
		try {
			let error = {};
			const { email, password } = req.body;

			const user = await userModel.findOne({ email });
			if (!user) {
				error = {
					...error,
					email: 'Email not exists',
					password: '',
				};
				return res.json({ error });
			}
			if (password.length < 6) {
				error = {
					...error,
					email: '',
					password: 'Password must be at least 6 character long',
				};
				return res.json({ error });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				error = {
					...error,
					email: '',
					password: 'Password is incorrect',
				};
				return res.json({ error });
			}

			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
			const decode = jwt.verify({ _id: user._id, name: user.name, userRole: user.userRole }, process.env.JWT_SECRET);

			return res.json({ token, user: decode });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = authController;
