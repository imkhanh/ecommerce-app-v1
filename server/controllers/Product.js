const Products = require('../models/Product');
const path = require('path');
const fs = require('fs');

const deleteImage = (images, mode) => {
	let fileBase = path.join(__dirname, '../../client/public/uploads/products/');
	for (let i = 0; i < images.length; i++) {
		let filePath = '';
		if (mode === 'file') {
			filePath = fileBase + `${images[i].filename}`;
		} else {
			filePath = fileBase + `${images[i]}`;
		}
		fs.unlink(filePath, (err) => {
			if (err) console.log(err);
		});
	}
};

const productController = {
	getAllProduct: async (req, res) => {
		try {
			const products = await Products.find({}).populate('category', '_id name');
			return res.json({ products });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	getSingleProduct: async (req, res) => {
		try {
			const product = await Products.findById(req.params.id).populate('category', '_id name');

			return res.json({ product });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	createProduct: async (req, res) => {
		try {
			const files = req.files;
			const { name, content, description, category, price, quantity, offer, status, colors } = req.body;
			if (!(name && content && description && category && price && quantity && offer && status)) {
				deleteImage(files, 'file');
				return res.status(400).json({ msg: 'All fields must be required' });
			} else if (!files.length) {
				deleteImage(files, 'file');
				return res.status(400).json({ msg: 'Must be provide 1 image' });
			} else {
				const imageArray = [];
				for (const file of files) {
					imageArray.push(file.filename);
				}
				const newProduct = new Products({ name, content, description, images: imageArray, colors, category, price, quantity, offer, status });
				await newProduct.save();
				return res.json({ msg: 'Created product successfully ', product: newProduct });
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
			const product = await Products.findById(req.params.id);
			const deleteProduct = await Products.findByIdAndDelete(req.params.id);
			if (deleteProduct) {
				deleteImage(product.images, 'string');
				return res.json({ msg: 'Deleted product successfully' });
			}
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	addToCart: async (req, res) => {
		try {
			const cartProduct = req.body;
			const products = await Products.find({
				_id: { $in: cartProduct },
			});

			return res.json({ products });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	addToWish: async (req, res) => {
		try {
			const wishProduct = req.body;
			const products = await Products.find({
				_id: { $in: wishProduct },
			});

			return res.json({ products });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

module.exports = productController;
