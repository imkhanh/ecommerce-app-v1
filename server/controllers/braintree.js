require('dotenv').config();
const braintree = require('braintree');

var gateway = new braintree.BraintreeGateway({
	environment: braintree.Environment.Sandbox,
	merchantId: process.env.BRAINTREE_MERCHANT_ID,
	publicKey: process.env.BRAINTREE_PUBLIC_KEY,
	privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const braintreeController = {
	generateToken: (req, res) => {
		gateway.clientToken.generate({}, (err, response) => {
			if (err) console.log(err);
			return res.json(response);
		});
	},
	paymentProcess: (req, res) => {
		const { amountTotal, paymentMethod } = req.body;

		gateway.transaction.sale(
			{
				amount: amountTotal,
				paymentMethodNonce: paymentMethod,
				options: {
					submitForSettlement: true,
				},
			},
			(err, result) => {
				if (err) console.log(err);
				if (result.success) {
					return res.json(result);
				}
			}
		);
	},
};
module.exports = braintreeController;
