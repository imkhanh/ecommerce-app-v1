const Categories = require('../models/categories');

const categoryController = {
	getAllCategories: async (req, res) => {
		try {
			const categories = await Categories.find({}).sort('-createdAt');
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

			if (!name) return res.json({ error: 'Please enter name category' });

			const categoryName = await Categories.findOne({ name });
			if (categoryName) return res.json({ error: 'This category already exists' });

			const newCategory = new Categories({ name, description, status });
			await newCategory.save();

			return res.json({ success: 'Category created successfully', category: newCategory });
		} catch (error) {
			console.log(error);
		}
	},
	editCategory: async (req, res) => {
		try {
			const { name, description, status } = req.body;
			const editCategory = await Categories.findByIdAndUpdate(
				{ _id: req.params.id },
				{
					name,
					description,
					status,
					updatedAt: Date.now(),
				},
				{ new: true }
			);

			if (editCategory) return res.json({ success: 'Category edited successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	deleteCategory: async (req, res) => {
		try {
			const deleteCategory = await Categories.findByIdAndDelete(req.params.id);
			if (deleteCategory) return res.json({ success: 'Category deleted successfully' });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = categoryController;
