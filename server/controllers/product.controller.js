const productModel = require('../models/product.model');

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
			const { name, content, description, category, images, price, quantity, offer, status } = req.body;

			const newProduct = new productModel({ name, content, description, images, category, price, quantity, offer, status });
			await newProduct.save();
			return res.json({ msg: 'Product created successfully', product: newProduct });
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
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

module.exports = productController;
