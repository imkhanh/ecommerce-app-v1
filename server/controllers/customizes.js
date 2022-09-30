const Customizes = require('../models/customizes');
const Users = require('../models/users');
const Products = require('../models/products');
const Categories = require('../models/categories');
const path = require('path');
const fs = require('fs');

const customizeController = {
	getAllDocuments: async (req, res) => {
		try {
			const users = await Users.find({}).estimatedDocumentCount();
			const products = await Products.find({}).estimatedDocumentCount();
			const categories = await Categories.find({}).estimatedDocumentCount();

			if (users && categories && products) return res.json({ users, products, categories });
		} catch (error) {
			console.log(error);
		}
	},
	getAllSlideImages: async (req, res) => {
		try {
			const images = await Customizes.find({}).sort('-createdAt');
			if (images) {
				return res.json({ images });
			}
		} catch (error) {
			console.log(error);
		}
	},
	postUploadSlideImage: async (req, res) => {
		try {
			const image = req.file.filename;
			const newSlide = new Customizes({ slideImage: image });
			await newSlide.save();

			return res.json({ success: 'Image upload successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	deleteImage: async (req, res) => {
		try {
			const image = await Customizes.findById(req.params.id);
			const filePath = path.join(__dirname, `../../client/public/uploads/customizes/${image.slideImage}`);

			const deleteImage = await Customizes.findByIdAndDelete(req.params.id);
			if (deleteImage) {
				fs.unlink(filePath, (err) => {
					if (err) return err;
				});

				return res.json({ success: 'Image deleted successfully' });
			}
		} catch (error) {
			console.log(error);
		}
	},
};
module.exports = customizeController;
