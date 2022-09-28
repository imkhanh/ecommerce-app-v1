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

const handleQuery = async (req, res, query) => {
	try {
		const products = await Products.find({ $name: { $search: query } }).populate('category', '_id name');
		if (products) return res.json({ products });
	} catch (error) {
		console.log(error);
	}
};

const handlePrice = async (req, res, price) => {
	try {
		const products = await Products.find({
			price: {
				$gte: price[0],
				$lte: price[1],
			},
		}).populate('category', '_id name');
		if (products) return res.json({ products });
	} catch (error) {
		console.log(error);
	}
};

const handleCategory = async (req, res, category) => {
	try {
		const products = await Products.find({ category }).populate('category', '_id name');
		if (products) return res.json({ products });
	} catch (error) {
		console.log(error);
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
			const product = await Products.findById(req.params.id)
				.populate('category', '_id name')
				.populate('reviews.user', '_id userName email');
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
				.populate('reviews.user', '_id userName email')
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
			const { name, description, category, price, quantity, status, offer, images, brand, shipping } = req.body;

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

			const newProduct = new Products({
				name,
				description,
				category,
				price,
				quantity,
				status,
				offer,
				brand,
				shipping,
				images: imageArray,
			});
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
	postAddReview: async (req, res) => {
		try {
			const { uId, pId, rating, title, review } = req.body;

			if (!uId || !pId || !rating || !title || !review) return res.json({ error: 'All field must be required' });

			const checkReview = await Products.findOne({ _id: pId });
			if (checkReview.reviews.length > 0) {
				checkReview.reviews.map((item) => {
					if (item.user === uId) {
						return res.json({ error: 'You already reviewed this product' });
					}
				});
			}
			const newReview = await Products.findByIdAndUpdate(pId, {
				$push: {
					reviews: {
						user: uId,
						title: title,
						review: review,
						rating: rating,
					},
				},
			});
			await newReview.save();
			return res.json({ success: 'Thanks for your review' });
		} catch (error) {
			console.log(error);
		}
	},
	postDeleteReview: async (req, res) => {
		try {
			const { rId, pId } = req.body;
			if (!rId || !pId) return res.json({ error: 'All field must be required' });

			await Products.findByIdAndUpdate(pId, {
				$pull: {
					reviews: { _id: rId },
				},
			});
			return res.json({ success: 'Review deleted successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	//search filter
	getProductsByFilters: async (req, res) => {
		const { query, price, category } = req.body;
		if (query) {
			await handleQuery(req, res, query);
		}
		if (price !== undefined) {
			await handlePrice(req, res, price);
		}
		if (category) {
			await handleCategory(req, res, category);
		}
	},
};

module.exports = productController;
