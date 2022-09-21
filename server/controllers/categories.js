const Categories = require('../models/categories');

const categoryController = {
	getAllCategories: async (req, res) => {
		try {
			const categories = await Categories.find({});
			if (categories) {
				return res.json({ categories });
			}
		} catch (error) {
			console.log(error);
		}
	},
	getSingleCategory: async (req, res) => {
		try {
			const category = await Categories.findById(req.params.id);
			if (category) {
				return res.json({ category });
			}
		} catch (error) {
			console.log(error);
		}
	},
	postAddCategory: async (req, res) => {
		try {
			const { name, description, status } = req.body;

			const categoryName = await Categories.findOne({ name });
			if (categoryName) return res.json({ error: 'This category already exists' });

			const newCategory = new Categories({ name, description, status });
			await newCategory.save();

			return res.json({ success: 'Category created successfully', category: newCategory });
		} catch (error) {
			console.log(error);
		}
	},
	pathUpdateCategory: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
	deleteCategory: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = categoryController;
