import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout, { LayoutContext } from '../Layout';
import DropIn from 'braintree-web-drop-in-react';
import { postAddToCart } from '../SingleProduct/FetchApi';
import { createOrder, getBraintreeToken, getPaymentProcess } from './FetchApi';
import { totalPrice } from '../CartModal/Functions';
import { BsArrowRepeat } from 'react-icons/bs';
import CheckOutProduct from './CheckOutProduct';
import Loading from '../Common/Loading';

const CheckoutSection = () => {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(LayoutContext);
	const { cartProduct: products } = state;

	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		address: '',
		phoneNumber: '',
		clientToken: null,
		instance: {},
		error: false,
		succsses: false,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	useEffect(() => {
		fetchCartProduct();
		fetchBraintreeToken();
		// eslint-disable-next-line
	}, []);

	const fetchCartProduct = async () => {
		setLoading(true);
		try {
			const res = await postAddToCart();
			if (res && res.data.products) {
				dispatch({ type: 'cartProduct', payload: res.data.products });
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchBraintreeToken = async () => {
		try {
			const res = await getBraintreeToken();
			if (res && res.data) {
				setFormData({
					clientToken: res.data.clientToken,
					succsses: res.data.succsses,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handelPay = () => {
		if (!formData.address) {
			setFormData({ ...formData, error: 'Please provide your address' });
		} else if (!formData.phoneNumber) {
			setFormData({ ...formData, error: 'Please provide phone number' });
		} else {
			let nonce;
			formData.instance
				.requestPaymentMethod()
				.then((res) => {
					dispatch({ type: 'loading', payload: true });
					nonce = res.nonce;
					let paymentdata = {
						amountTotal: totalPrice(),
						paymentMethod: nonce,
					};
					getPaymentProcess(paymentdata).then(async (res) => {
						let orderData = {
							products: JSON.parse(localStorage.getItem('cart')),
							user: JSON.parse(localStorage.getItem('auth')).user.id,
							amount: res.data.transaction.amount,
							transactionId: res.data.transaction.id,
							address: formData.address,
							phoneNumber: formData.phoneNumber,
						};

						try {
							const res = await createOrder(orderData);
							if (res && res.data.success) {
								localStorage.setItem('cart', JSON.stringify([]));
								dispatch({ type: 'cartProduct', payload: null });
								dispatch({ type: 'orderSuccess', payload: true });
								setFormData({ clientToken: '', instance: {} });
								dispatch({ type: 'loading', payload: false });

								return navigate('/');
							}
						} catch (error) {
							console.log(error);
						}
					});
				})
				.catch((err) => console.log(err));
		}
	};

	if (state.loading) {
		return (
			<div className="flex flex-col items-center justify-center h-screen space-y-2">
				<div className="animate-spin">
					<BsArrowRepeat />
				</div>
				<div>Please wait untill finish</div>
			</div>
		);
	}

	if (loading) return <Loading />;

	return (
		<section className="p-8 lg:px-4 md:py-10">
			<div className="grid grid-cols-2 md:grid-cols-1 gap-20 md:gap-10">
				<CheckOutProduct products={products} />
				<div>
					{formData.clientToken !== null ? (
						<>
							{formData.error && (
								<div className="mb-4 py-2 px-3 text-sm bg-red-100 border-l-2 border-l-red-700 text-red-700">
									{formData.error}
								</div>
							)}
							<div className="space-y-4">
								<div className="flex flex-col space-y-2">
									<span className="text-sm">Dalivery Address</span>
									<input
										value={formData.address}
										onChange={handleChange}
										name="address"
										type="text"
										className="border px-4 py-2 border-black/10 outline-none focus:border-black rounded-sm text-sm"
										placeholder="Address..."
									/>
								</div>
								<div className="flex flex-col space-y-2">
									<span className="text-sm"> Phone Number</span>
									<input
										value={formData.phoneNumber}
										onChange={handleChange}
										name="phoneNumber"
										type="text"
										className="border px-4 py-2 border-black/10 outline-none focus:border-black rounded-sm text-sm"
										placeholder="Phone Number..."
									/>
								</div>
								<DropIn
									options={{
										authorization: formData.clientToken,
										paypal: {
											flow: 'vault',
										},
									}}
									onInstance={(instance) => (formData.instance = instance)}
								/>
								<div
									onClick={() => handelPay()}
									className="w-full px-4 py-3 text-center bg-black text-white font-semibold cursor-pointer"
								>
									Pay now
								</div>
							</div>
						</>
					) : (
						<div>Please wait....</div>
					)}
				</div>
			</div>
		</section>
	);
};

const Checkout = () => {
	return <Layout children={<CheckoutSection />} />;
};

export default Checkout;
