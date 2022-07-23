const categoryModel = require('../models/Category');

const categoryController = {
	getAllCategory: async (req, res) => {
		try {
			const categories = await categoryModel.find({});
			return res.json({ categories });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	getSingleCategory: async (req, res) => {
		try {
			const category = await categoryModel.findById(req.params.id);
			return res.json({ category });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	createCategory: async (req, res) => {
		try {
			const { name, content, description, status } = req.body;
			const newCategory = new categoryModel({ name, content, description, status });
			await newCategory.save();

			return res.json({ msg: 'Category created successfully', category: newCategory });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	updateCategory: async (req, res) => {
		try {
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	deleteCategory: async (req, res) => {
		try {
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

module.exports = categoryController;
