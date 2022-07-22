const productModel = require('../models/product.model');
const cloudinary = require('cloudinary').v2;

const productController = {
	getAllProduct: async (req, res) => {
		try {
			const products = await productModel.find({}).populate('category', '_id name');
			return res.json({ products });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	getSingleProduct: async (req, res) => {
		try {
			const product = await productModel.find({}).populate('category', '_id name');

			return res.json({ product });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	createProduct: async (req, res) => {
		try {
			const files = req.files;
			const { name, content, description, category, price, quantity, offer, status } = req.body;

			if (files) {
				const imageUrls = [];
				for (const file of files) {
					const { path } = file;
					imageUrls.push(path);
				}
				const newProduct = new productModel({ name, content, description, images: imageUrls, category, price, quantity, offer, status });
				await newProduct.save();
				return res.json({ msg: 'Created product successfully ', product: newProduct });
			} else {
				return res.status(400).json({ msg: 'Must be provide 2 images' });
			}
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	updateProduct: async (req, res) => {
		try {
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	deleteProduct: async (req, res) => {
		try {
			await productModel.findByIdAndDelete(req.params.id);
			return res.json({ msg: 'Deleted product successfully' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

module.exports = productController;
