const categoryModel = require('../models/categories');
const fs = require('fs');
const path = require('path');

const categoryController = {
	getAllCategories: async (req, res) => {
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
	postAddCategory: async (req, res) => {
		try {
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
