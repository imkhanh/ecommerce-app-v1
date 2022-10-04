import React, { useContext, useEffect } from 'react';
import { BsArrowLeft, BsDash, BsPaypal, BsPlus, BsX } from 'react-icons/bs';
import { LayoutContext } from '../Layout';
import { postAddToCart } from '../SingleProduct/FetchApi';
import { cartList } from '../SingleProduct/Functions';
import { totalPrice, totalQuantity, subTotalPrice, updateQuantity } from './Functions';
import { Link } from 'react-router-dom';
import Overlay from '../Common/Overlay';
import { isAuth } from '../AuthModal/Authenticated';
import { BASE_URL } from '../../../url';

const CartModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const carts = state.cartProduct;

	useEffect(() => {
		fetchCartProduct();
		// eslint-disable-next-line
	}, []);

	const fetchCartProduct = async () => {
		try {
			const res = await postAddToCart();
			dispatch({ type: 'cartProduct', payload: res.data.products });
			dispatch({ type: 'inCart', payload: cartList() });
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemoveItem = (id) => {
		const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

		if (cart.length > 0) {
			const deleted = cart.filter((item) => item.id !== id);
			localStorage.setItem('cart', JSON.stringify(deleted));
			fetchCartProduct();
		}
	};

	const handleRemoveAllItem = () => {
		const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
		if (cart.length > 1) {
			localStorage.removeItem('cart');
			fetchCartProduct();
		}
	};

	return (
		<div className="relative">
			<Overlay state={state.cartToggle} dispatch={() => dispatch({ type: 'cartToggle', payload: false })} />
			<div
				className={`fixed top-0 right-0  ${
					state.cartToggle ? 'opacity-100 translate-x-0' : 'translate-x-full opacity-0'
				} max-w-md w-full h-screen shadow-lg bg-white transform duration-300 ease-in-out z-[70]`}
			>
				<div className="flex flex-col w-full h-full">
					<div className="h-14 px-4 flex items-center justify-between border-b border-black/10">
						<span className="text-sm text-black font-semibold uppercase">Cart</span>
						<span
							onClick={() => dispatch({ type: 'cartToggle', payload: false })}
							className="text-3xl text-black/50 hover:text-black cursor-pointer select-none"
						>
							<BsX />
						</span>
					</div>
					{carts && carts.length > 1 && (
						<div className="h-14 px-4 flex items-center justify-end">
							<span
								onClick={() => handleRemoveAllItem()}
								className="text-xs font-medium text-red-500 cursor-pointer select-none"
							>
								Remove All
							</span>
						</div>
					)}
					<div className="px-4 flex-1 divide-y divide-gray-200 overflow-y-auto">
						{carts && carts.length > 0 ? (
							carts.map((item) => {
								return (
									<div key={item._id} className="py-4 grid grid-cols-5">
										<div className="col-span-1">
											<img
												alt={item.name}
												src={`${BASE_URL}/uploads/products/${item.images[0]}`}
												className="w-24 h-24 object-cover"
											/>
										</div>
										<div className="pl-4 text-black/50 text-sm col-span-3 space-y-1">
											<h4 className="text-black font-semibold">{item.name}</h4>
											<p>{item.category.name}</p>
											<p className="text-black/80 font-medium">${item.price}.00</p>
											<div className="pt-1 flex items-center select-none">
												<span
													onClick={() => updateQuantity('decrease', item._id, dispatch)}
													className="w-6 h-6 rounded-full flex items-center justify-center border border-black/10 hover:border-black/60 cursor-pointer"
												>
													<BsDash />
												</span>
												<span className="w-8 text-center">{totalQuantity(item._id)}</span>
												<span
													onClick={() => updateQuantity('increase', item._id, dispatch)}
													className="w-6 h-6 rounded-full flex items-center justify-center border border-black/10 hover:border-black/60 cursor-pointer"
												>
													<BsPlus />
												</span>
											</div>
										</div>
										<div className="col-span-1 h-full flex flex-col justify-between items-end">
											<p className="text-black font-semibold text-lg">
												${subTotalPrice(item._id, item.price)}
											</p>
											<span
												onClick={() => handleRemoveItem(item._id)}
												className="text-xs cursor-pointer select-none font-medium text-red-500 underline underline-offset-2"
											>
												Remove
											</span>
										</div>
									</div>
								);
							})
						) : (
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
								<div className="flex flex-col items-center space-y-2">
									<p className="text-black/50">No item in cart</p>
									<Link
										to="/shop"
										onClick={() => dispatch({ type: 'cartToggle', payload: false })}
										className="flex items-center px-6 py-3 rounded-full bg-black text-white"
									>
										<BsArrowLeft />
										<span className="ml-2 text-sm font-medium">Back to shop</span>
									</Link>
								</div>
							</div>
						)}
					</div>

					{carts?.length === 0 ? (
						''
					) : (
						<div className="h-32 border-t border-black/10">
							<div className="p-4 flex items-center justify-between">
								<span className="font-medium text-black/50">Total Price</span>
								<span className="text-lg font-semibold">${totalPrice()}</span>
							</div>
							<div className="px-4">
								{isAuth() ? (
									<Link
										to="/checkout"
										onClick={() => dispatch({ type: 'cartToggle', payload: false })}
										className="w-full h-12 flex items-center justify-center text-white bg-black"
									>
										<BsPaypal />
										<span className="ml-4 text-sm uppercase font-medium">checkout</span>
									</Link>
								) : (
									<div className="w-full h-12 flex items-center justify-center text-white bg-black">
										<span
											onClick={() => dispatch({ type: 'authToggle', payload: true })}
											className="ml-4 text-xs uppercase font-medium cursor-pointer"
										>
											Please login for checkout
										</span>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartModal;
