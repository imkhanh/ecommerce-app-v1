const categoryModel = require('../models/categories');
const fs = require('fs');
const path = require('path');

const categoryController = {
	getAll: async (req, res) => {
		try {
			const categories = await categoryModel.find({});
			if (categories) {
				return res.json({ categories });
			}
		} catch (error) {
			console.log(error);
		}
	},
	getSingleCategory: async (req, res) => {
		try {
			const category = await categoryModel.findById(req.params.id);
			if (category) {
				return res.json({ category });
			}
		} catch (error) {
			console.log(error);
		}
	},
	createCategory: async (req, res) => {
		try {
			const file = req.file.filename;
			const { name, description, status } = req.body;
			const filePath = path.resolve(__dirname, `../../client/public/uploads/categories/${file}`);

			if (!name || !description || !status) {
				fs.unlink(filePath, (err) => {
					if (err) console.log(err);
				});
				return res.json({ error: 'All field must be required' });
			}
			const checkCategoryExists = await categoryModel.findOne({ name });

			if (checkCategoryExists) {
				fs.unlink(filePath, (err) => {
					if (err) console.log(err);
				});
				return res.json({ error: 'Category already exists' });
			}

			const newCategory = new categoryModel({ name, description, status, image: file });

			await newCategory.save();

			return res.json({ success: 'Created category successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	updateCategory: async (req, res) => {
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
