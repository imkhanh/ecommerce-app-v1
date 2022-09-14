import React, { useContext } from 'react';
import { BsX } from 'react-icons/bs';
import { LayoutContext } from '../Layout/Layout';

const CartModal = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const products = state.cartProduct;

	return (
		<div>
			<div onClick={() => dispatch({ type: 'cartModal', payload: false })} className={`${state.cartModal ? '' : 'hidden'} fixed inset-0 bg-black w-full h-full opacity-70 z-40`} />
			<div className={`fixed top-0 ${state.cartModal ? 'right-0 opacity-100' : '-right-full opacity-0'} bg-white max-w-md w-full h-screen shadow-lg duration-500 ease-in-out z-50`}>
				<div className="px-4 h-14 flex items-center justify-between border-b shadow-sm border-black/5">
					<span>Cart (0)</span>
					<span className="text-2xl text-black/60 hover:text-black cursor-pointer select-none" onClick={() => dispatch({ type: 'cartModal', payload: false })}>
						<BsX />
					</span>
				</div>
				<div className="flex flex-col w-full h-full">
					{products && products.length > 0 ? (
						products.map((product) => {
							return (
								<div key={product._id}>
									<div></div>
								</div>
							);
						})
					) : (
						<div>No product item in cart</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartModal;
