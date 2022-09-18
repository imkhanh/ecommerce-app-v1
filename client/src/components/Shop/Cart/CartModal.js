import React, { useContext, useEffect } from 'react';
import { BsArrowLeft, BsPaypal, BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { postAddToCart } from '../SingleProduct/FetchData';
import { cartList, subTotalPrice, totalPrice, totalQuantity } from '../SingleProduct/Functions';
import { LayoutContext } from '../Layout/Layout';

const CartModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const { carts } = state;

	useEffect(() => {
		fetchCartData();
		// eslint-disable-next-line
	}, []);

	const fetchCartData = async () => {
		try {
			const res = await postAddToCart();
			dispatch({ type: 'carts', payload: res.data.products });
			dispatch({ type: 'inCart', payload: cartList() });
		} catch (error) {
			console.log(error);
		}
	};

	const removeItemInCart = (id) => {
		const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

		if (cart.length > 0) {
			const removeItem = cart.filter((item) => item.id !== id);
			localStorage.setItem('cart', JSON.stringify(removeItem));
			dispatch({ type: 'inCart', payload: cartList() });
			fetchCartData();
		}
	};

	const removeAllItemInCart = () => {
		localStorage.removeItem('cart');
		fetchCartData();
	};

	return (
		<div>
			<div
				onClick={() => dispatch({ type: 'cartModal', payload: false })}
				className={`fixed inset-0 ${state.cartModal ? 'bg-black opacity-70' : 'opacity-0 pointer-events-none'} w-full h-full z-50 duration-300 ease-in-out`}
			/>
			<div
				className={`fixed top-0 ${
					state.cartModal ? 'bg-white opacity-100 right-0 delay-200' : 'opacity-0 -right-full'
				} max-w-md w-full h-screen flex flex-col duration-500 ease-in-out z-[60]`}
			>
				<div className="px-4 h-14 border-b border-gray-50 shadow-sm flex items-center justify-between">
					<span>Cart</span>
					<span onClick={() => dispatch({ type: 'cartModal', payload: false })} className="text-2xl cursor-pointer">
						<BsX />
					</span>
				</div>
				{carts.length > 1 && (
					<div className="h-14 px-4 flex items-center justify-end">
						<span onClick={() => removeAllItemInCart()} className="text-sm cursor-pointer select-none text-red-500 underline underline-offset-2">
							Remove all
						</span>
					</div>
				)}
				<div className="px-4 flex-1 divide-y divide-gray-200 overflow-y-auto">
					{carts.length > 0 ? (
						carts.map((item) => {
							return (
								<div key={item._id} className="py-4 h-40 flex">
									<div className="w-1/4">
										<img
											alt={item.name}
											className="w-full h-full object-cover border"
											src={`http://localhost:3000/uploads/products/${item.images[0]}`}
										/>
									</div>
									<div className="w-2/4 pl-4 space-y-1">
										<p className="text-black font-medium">{item.name}</p>
										<p className="text-sm text-black/50">{item.category.name}</p>
										<p className="text-sm text-black/50">${item.price}</p>
										<p className="text-sm text-black/50">x{totalQuantity(item._id)}</p>
									</div>
									<div className="w-1/4 h-full flex flex-col items-end justify-between">
										<span className="text-lg font-bold">$ {subTotalPrice(item._id, item.price)}</span>
										<span
											onClick={() => removeItemInCart(item._id)}
											className="cursor-pointer select-none text-xs text-red-500 underline underline-offset-2"
										>
											remove
										</span>
									</div>
								</div>
							);
						})
					) : (
						<div className="py-4 italic text-black/50 font-light ">No product in cart</div>
					)}
				</div>
				{carts.length > 0 && (
					<div className="h-40 border-t border-gray-200">
						<div className="p-4 flex items-center justify-between">
							<span className="text-gray-500">Total</span>
							<span className="text-lg font-bold">$ {totalPrice()}</span>
						</div>
						<div className="px-4">
							<Link to="/checkout" className="py-3 bg-black text-white uppercase flex items-center justify-center rounded-md">
								<BsPaypal />
								<span className="ml-2 text-sm">Checkout</span>
							</Link>
							<div className="py-1 text-center text-sm text-black/50">or</div>
							<Link to="/shop" className="text-black/50 hover:text-black flex items-center justify-center">
								<BsArrowLeft />
								<span className="ml-2 text-sm font-light italic underline">Back to shop</span>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartModal;
