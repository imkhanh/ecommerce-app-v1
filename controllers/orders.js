const Orders = require('../models/orders');

const orderController = {
	getAllOrders: async (req, res) => {
		try {
			const orders = await Orders.find({})
				.populate('products.id', 'name images price')
				.populate('user', 'userName email')
				.sort({ _id: -1 });

			if (orders) return res.json({ orders });
		} catch (error) {
			console.log(error);
		}
	},
	getSingleOrder: async (req, res) => {
		try {
			const order = await Orders.find({ user: req.params.id })
				.populate('products.id', 'name images price')
				.populate('user', 'userName email')
				.sort({ _id: -1 });
			if (order) return res.json({ order });
		} catch (error) {
			console.log(error);
		}
	},
	createOrder: async (req, res) => {
		try {
			const { products, user, transactionId, amount, address, phoneNumber } = req.body;
			if (!(products && user && transactionId && amount && address && phoneNumber)) {
				return res.json({ error: 'All filled must be required' });
			}

			const newOrder = new Orders({
				products,
				user,
				transactionId,
				amount,
				address,
				phoneNumber,
			});

			await newOrder.save();

			return res.json({ success: 'Order created successfully' });
		} catch (error) {
			console.log(error);
		}
	},
	updateOrder: async (req, res) => {
		try {
			const { status } = req.body;
			if (!status) {
				return res.json({ error: 'All filled must be required' });
			}

			const currentOrder = await Orders.findByIdAndUpdate(
				{ _id: req.params.id },
				{
					status,
					updatedAt: Date.now(),
				}
			);

			if (currentOrder) {
				return res.json({ success: 'Order updated successfully' });
			}
		} catch (error) {
			console.log(error);
		}
	},
	deleteOrder: async (req, res) => {
		try {
			await Orders.findByIdAndDelete(req.params.id);
			return res.json({ success: 'Order deleted successfully' });
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = orderController;
