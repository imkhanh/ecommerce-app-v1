import React, { useContext, useEffect } from 'react';
import { BsArrowLeft, BsWallet, BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { postAddToCart } from '../SingleProduct/FetchData';
import { cartList, totalPrice, totalQuantity, subTotalPrice } from '../SingleProduct/Actions';
import { LayoutContext } from './Layout';

const Carts = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const products = state.cartProduct;

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

	const handleRemoveItemInCart = (id) => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

		if (cart) {
			cart = cart.filter((item) => item.id !== id);
			dispatch({ type: 'inCart', payload: cartList() });
			localStorage.setItem('cart', JSON.stringify(cart));
			fetchCartProduct();
		}
	};

	const handleRemoveAllItem = () => {
		localStorage.removeItem('cart');
		dispatch({ type: 'inCart', payload: cartList() });
		fetchCartProduct();
	};

	return (
		<div>
			<div
				onClick={() => dispatch({ type: 'cartModal', payload: false })}
				className={`${state.cartModal ? 'pointer-events-auto bg-[#00000074] opacity-100' : 'opacity-0 pointer-events-none'} fixed inset-0 transition duration-300 ease-in-out z-50`}
			/>
			<div
				className={`${
					state.cartModal ? 'opacity-100 translate-x-0 delay-200' : 'translate-x-full opacity-0'
				} fixed top-0 right-0 max-w-md w-full transform h-screen bg-white transition-all duration-300 ease-in-out shadow-lg z-50`}
			>
				<div className="flex flex-col h-full w-full">
					<div className="h-14 px-4 flex items-center justify-between border-b border-gray-200">
						<span>Cart ({products && products?.length})</span>
						<span className="cursor-pointer select-none" onClick={() => dispatch({ type: 'cartModal', payload: false })}>
							<BsX className="text-2xl" />
						</span>
					</div>

					{products && products?.length > 1 && (
						<div className="p-4 flex items-center justify-between">
							<div></div>
							<div onClick={() => handleRemoveAllItem()} className="text-xs underline underline-offset-1 text-pink-600 cursor-pointer">
								Remove all
							</div>
						</div>
					)}

					<div className="flex-1 px-4 divide-y divide-gray-200 overscroll-y-auto">
						{products?.length > 0 ? (
							products.map((product) => {
								return (
									<div key={product._id} className="py-4 flex space-x-3">
										<div className="w-1/4">
											<img
												src={`http://localhost:3000/uploads/products/${product.images[0]}`}
												alt={product.name}
												className="w-full h-28 object-cover border border-gray-200 rounded-[3px]"
											/>
										</div>
										<div className="w-3/4 flex items-start justify-between">
											<div className="space-y-1">
												<h4 className="text-base font-medium">{product.name}</h4>
												<p className="text-sm text-black/70 font-light">{product.category.name}</p>
												<p className="text-sm text-black/70 font-light">${product.price}</p>
												<p className="text-sm text-black/70 font-light">x{totalQuantity(product._id)}</p>
											</div>
											<div className="h-full flex flex-col items-end justify-between">
												<p className="text-lg font-semibold">${subTotalPrice(product._id, product.price)}</p>
												<p onClick={() => handleRemoveItemInCart(product._id)} className="text-xs text-pink-600 cursor-pointer select-none">
													Remove
												</p>
											</div>
										</div>
									</div>
								);
							})
						) : (
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-2">
								<h4>No product in cart</h4>
								<Link
									to="/products"
									onClick={() => dispatch({ type: 'cartModal', payload: false })}
									className="py-2 text-sm w-full bg-black text-white flex items-center justify-center rounded-full"
								>
									Go back
								</Link>
							</div>
						)}
					</div>
					{products && products?.length > 0 && (
						<div className="h-40 border-t border-gray-200 space-y-2">
							<div className="py-2 px-4 flex items-center justify-between">
								<p className="text-black/50">Total price</p>
								<p className="text-black font-semibold text-lg">$ {totalPrice()}</p>
							</div>
							<div className="px-4 space-y-2">
								<Link to="/checkout" className="w-full h-11 bg-black text-white flex items-center justify-center rounded-[3px]">
									<BsWallet />
									<span className="ml-1 text-sm font-medium">Checkout</span>
								</Link>
								<p className="text-black/40 text-center">or</p>
								<Link to="/products" onClick={() => dispatch({ type: 'cartModal', payload: false })} className="w-full flex items-center justify-center">
									<BsArrowLeft />
									<span className="ml-1 text-xs font-light underline">Continue shopping</span>
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Carts;
