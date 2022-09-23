import React, { useContext, useEffect } from 'react';
import { BsX } from 'react-icons/bs';
import { postAddToCart } from '../SingleProduct/FetchApi';
import { cartList, subTotalPrice, totalPrice, totalQuantity } from '../SingleProduct/Functions';
import { LayoutContext } from './Layout';

const CartModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const products = state.cartProduct;

	useEffect(() => {
		fetchCartProduct();
		// eslint-disable-next-line
	}, []);

	const fetchCartProduct = async () => {
		try {
			const res = await postAddToCart();
			if (res && res.data.products) {
				dispatch({ type: 'cartProduct', payload: res.data.products });
				dispatch({ type: 'inCart', payload: cartList() });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemoveItem = (id) => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

		if (cart) {
			cart = cart.filter((item) => item.id !== id);
			localStorage.setItem('cart', JSON.stringify(cart));
			fetchCartProduct();
		}
	};

	const handleRemoveAllItem = () => {
		localStorage.removeItem('cart');
		fetchCartProduct();
	};

	return (
		<div className="relative z-[100] select-none">
			<div
				onClick={() => dispatch({ type: 'cartModal', payload: false })}
				className={`fixed inset-0 w-full h-full bg-black bg-opacity-70 ${state.cartModal ? '' : 'hidden'}`}
			/>
			<div
				className={`fixed top-0 right-0 inset-y-0 h-screen bg-white shadow-lg ${state.cartModal ? 'delay-150 w-[448px]' : 'w-0'}  duration-500 ease-in-out`}
			>
				<div className="flex flex-col w-full h-full">
					<div className="px-4 h-14 border-b border-black/10 flex items-center justify-between">
						<span className="text-sm uppercase font-semibold">Cart</span>
						<span className="text-3xl cursor-pointer" onClick={() => dispatch({ type: 'cartModal', payload: false })}>
							<BsX />
						</span>
					</div>
					{products && products.length > 0 && (
						<div className="px-4 h-[52px] border-b border-black/10 flex items-center justify-between">
							<span className="text-sm text-black/40 font-medium">{products.length} products in your cart</span>
							{products.length > 1 && (
								<span onClick={() => handleRemoveAllItem()} className="text-xs text-rose-400 underline underline-offset-2 cursor-pointer">
									Remove All
								</span>
							)}
						</div>
					)}
					<div className="px-4 flex-1 overflow-y-auto">
						{products && products.length > 0 ? (
							products.map((product) => {
								return (
									<div key={product._id} className="py-5 flex items-start justify-between bg-white">
										<div className="flex">
											<img
												alt={product.name}
												className="w-24 h-24 object-cover"
												src={`http://localhost:3000/uploads/products/${product.images[0]}`}
											/>
											<div className="pl-3 space-y-1">
												<p className="text-base font-medium">{product.name}</p>
												<p className="text-sm font-semibold">${product.price}.00</p>
												<p className="text-sm">x{totalQuantity(product._id)}</p>
											</div>
										</div>
										<div className="h-full flex flex-col items-end justify-between">
											<span className="font-medium text-lg">${subTotalPrice(product._id, product.price)}</span>
											<span
												onClick={() => handleRemoveItem(product._id)}
												className="text-xs text-rose-400 underline underline-offset-2 cursor-pointer"
											>
												Remove
											</span>
										</div>
									</div>
								);
							})
						) : (
							<div className="py-4">No product in cart</div>
						)}
					</div>
					<div className="h-40 border-t border-black/10">
						<div className="px-4 flex items-center justify-between">
							<span>Total</span>
							<div>{totalPrice()}.00</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
