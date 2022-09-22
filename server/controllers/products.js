const Products = require('../models/products');
const path = require('path');
const fs = require('fs');

const deleteImages = (type, images) => {
	const basePath = path.join(__dirname, '../../client/public/uploads/products/');

	for (let i = 0; i < images.length; i++) {
		let filePath = '';
		if (type === 'file') {
			filePath = basePath + `${images[i].filename}`;
		} else {
			filePath = basePath + `${images[i]}`;
		}
		fs.unlink(filePath, (err) => {
			if (err) console.log(err);
		});
	}
};

const productController = {
	getAllProducts: async (req, res) => {
		try {
			const products = await Products.find({}).populate('category', '_id name').sort('-createdAt');
			if (products) return res.json({ products });
		} catch (error) {
			console.log(error);
		}
	},
	getSingleProduct: async (req, res) => {
		try {
			const product = await Products.findById(req.params.id).populate('category', '_id name').populate('reviews.user', '_id name email');
			if (product) return res.json({ product });
		} catch (error) {
			console.log(error);
		}
	},
	getListRelated: async (req, res) => {
		try {
			const product = await Products.findById(req.params.id);
			const lists = await Products.find({
				_id: { $ne: product },
				category: product.category,
			})
				.populate('category', '_id name')
				.populate('reviews.user', '_id name email')
				.limit(4);
			if (lists) return res.json({ lists });
		} catch (error) {
			console.log(error);
		}
	},
	postAddProduct: async (req, res) => {
		try {
			const imageArray = [];
			const files = req.files;
			const { name, description, category, price, quantity, status, offer, images } = req.body;

			const productName = await Products.findOne({ name });
			if (productName) {
				deleteImages('file', files);
				return res.json({ error: 'This product already exists' });
			}
			if (files.length < 1) {
				deleteImages('file', files);
				return res.json({ error: 'Must be at least 1 image' });
			}

			for (const img of files) {
				imageArray.push(img.filename);
			}

			const newProduct = new Products({ name, description, category, price, quantity, status, offer, images: imageArray });
			await newProduct.save();
			return res.json({ success: 'Product created successfully', product: newProduct });
		} catch (error) {
			console.log(error);
		}
	},
	patchUpateProduct: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
	deletProduct: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
	postAddToCart: async (req, res) => {
		try {
			const { cartArr } = req.body;
			const products = await Products.find({
				_id: { $in: cartArr },
			}).populate('category', '_id name');
			if (products) return res.json({ products });
		} catch (error) {
			console.log(error);
		}
	},
	postAddToWish: async (req, res) => {
		try {
			const { wishArr } = req.body;
			const products = await Products.find({
				_id: { $in: wishArr },
			}).populate('category', '_id name');
			if (products) return res.json({ products });
		} catch (error) {
			console.log(error);
		}
	},
	postAddReview: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
	postDeleteReview: async (req, res) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = productController;
