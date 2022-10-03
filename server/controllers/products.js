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
			if (err) return err;
		});
	}
};

const productController = {
	//search filter
	getProductsByFilters: async (req, res) => {
		try {
			const { query, category, brand, shipping, status, price } = req.body;

			if (query) {
				const products = await Products.find({ name: { $regex: query, $options: 'i' } }).populate(
					'category',
					'_id name'
				);
				if (products) return res.json({ products });
			}
			if (category) {
				const products = await Products.find({ category }).populate('category', '_id name');
				if (products) return res.json({ products });
			}
			if (brand) {
				const products = await Products.find({ brand }).populate('category', '_id name');
				if (products) return res.json({ products });
			}
			if (shipping) {
				const products = await Products.find({ shipping }).populate('category', '_id name');
				if (products) return res.json({ products });
			}
			if (status) {
				const products = await Products.find({ status }).populate('category', '_id name');
				if (products) return res.json({ products });
			}
			if (price) {
				const products = await Products.find({ price: { $gte: price } }).populate('category', '_id name');
				if (products) return res.json({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
	getAllProducts: async (req, res) => {
		const { sort, order, page } = req.body;
		const currenPage = page || 1;
		const perPage = 4;

		try {
			const products = await Products.find({})
				.populate('category', '_id name')
				.skip((currenPage - 1) * perPage)
				.sort([[sort, order]])
				.limit(perPage);
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
			const images = req.files;
			const { name, description, category, price, quantity, status, offer, brand, shipping } = req.body;

			const productName = await Products.findOne({ name });
			if (productName) {
				deleteImages('file', images);
				return res.json({ error: 'This product already exists' });
			}
			if (images.length < 1) {
				deleteImages('file', images);
				return res.json({ error: 'Must need to provide 1 image' });
			}

			for (const img of images) {
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
	editProduct: async (req, res) => {
		try {
			const editImages = req.files;
			const { name, description, category, price, quantity, status, offer, images, brand, shipping } = req.body;

			if (editImages.length > 1) {
				let imageArray = [];
				let editData = { name, description, category, price, quantity, status, offer, brand, shipping };
				for (const img of editImages) {
					imageArray.push(img.filename);
				}
				editData = { ...editData, images: imageArray };
				deleteImages('string', images.split(','));
			}
			const editProduct = await Products.findByIdAndUpdate({ _id: req.params.id }, editData, { new: true });
			if (editProduct) return res.json({ success: 'Product edited successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	deletProduct: async (req, res) => {
		try {
			const productFolder = await Products.findById(req.params.id);
			const deleted = await Products.findByIdAndDelete(req.params.id);

			if (deleted) {
				deleteImages('string', productFolder.images);
				return res.json({ success: 'Product deleted successfully' });
			}
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
	postAddToCart: async (req, res) => {
		try {
			const { cartProduct } = req.body;
			const products = await Products.find({
				_id: { $in: cartProduct },
			}).populate('category', '_id name');
			if (products) {
				return res.json({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
	postAddToWish: async (req, res) => {
		try {
			const { wishProduct } = req.body;
			const products = await Products.find({
				_id: { $in: wishProduct },
			}).populate('category', '_id name');
			if (products) {
				return res.json({ products });
			}
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = productController;
