const productModel = require('../models/products');
const path = require('path');
const fs = require('fs');

const deleteImages = (files, mode) => {
	const fileBase = path.resolve(__dirname, '../../client/public/uploads/products/');
	for (let i = 0; i < files.length; i++) {
		let filePath = '';
		if (mode === 'file') {
			filePath = fileBase + `${fileBase[i].filename}`;
		} else {
			filePath = fileBase + `${fileBase[i]}`;
		}
		fs.unlink(filePath, (err) => {
			if (err) console.log(err);
		});
	}
};

const productController = {
	getAll: async (req, res) => {
		try {
			const products = await productModel.find({}).populate('category', '_id name image');
			if (products) return res.json({ products });
		} catch (error) {
			console.log(error);
		}
	},
	getSingleProduct: async (req, res) => {
		try {
			const product = await productModel.findById(req.params.id).populate('category', '_id name image');
			if (product) return res.json({ product });
		} catch (error) {
			console.log(error);
		}
	},
	createProduct: async (req, res) => {
		try {
			const files = req.files;
			const imageArray = [];
			const { name, description, images, status, price, quantity, offer, category } = req.body;
			if (!name || !description || !status || !price || !quantity || !offer || !category) {
				deleteImages(images, 'file');
				return res.json({ error: 'All field must be required' });
			}
			const checkProductExists = await productModel.findOne({ name });
			if (checkProductExists) {
				deleteImages(images, 'file');
				return res.json({ error: 'Product already exists' });
			}
			if (files.length < 2) {
				deleteImages(images, 'file');
				return res.json({ error: 'Must need to provide 2 images' });
			}
			for (const file of files) {
				imageArray.push(file.filename);
			}
			const newProduct = new productModel({ name, description, images: imageArray, status, price, quantity, offer, category });
			await newProduct.save();

			return res.json({ success: 'Created product successfully', product: newProduct });
		} catch (error) {
			console.log(error);
		}
	},
	updateProduct: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
	deleteProduct: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
	addToWishList: async (req, res) => {
		try {
			const { wishArr } = req.body;
			const products = await productModel
				.find({
					_id: { $in: wishArr },
				})
				.populate('category', '_id name image');

			if (products) {
				return res.json({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
	addToCart: async (req, res) => {
		try {
			const { cartArr } = req.body;
			const products = await productModel
				.find({
					_id: { $in: cartArr },
				})
				.populate('category', '_id name image');

			if (products) {
				return res.json({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
	addReview: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
	deleteReview: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = productController;
