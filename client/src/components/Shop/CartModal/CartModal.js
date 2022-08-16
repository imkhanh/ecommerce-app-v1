import React, { useContext } from 'react';
import { BsArrowLeft, BsCashStack, BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../Layout/Layout';

const CartModal = () => {
	const { state, dispatch } = useContext(LayoutContext);

	return (
		<div>
			<div onClick={() => dispatch({ type: 'cartModal', payload: false })} className={`${state.cartModal ? '' : 'hidden'} fixed inset-0 bg-black/50 z-20`} />
			<div
				className={`${
					state.cartModal ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
				} fixed top-0 right-0 transform bg-white max-w-md w-full h-screen shadow-lg transition duration-300 ease-in-out z-50`}
			>
				<div className="flex flex-col w-full h-full">
					<div className="px-4 h-14 flex items-center justify-between">
						<span className="font-medium text-black">Cart (1)</span>
						<span onClick={() => dispatch({ type: 'cartModal', payload: false })} className="text-2xl cursor-pointer select-none">
							<BsX />
						</span>
					</div>
					<div className="flex-1 px-4">Cart</div>
					<div className="h-40 border-t border-gray-300 space-y-2">
						<div className="py-2 px-4 flex items-center justify-between">
							<span className="text-sm text-black/70 font-medium">Total Price</span>
							<span className="text-black text-lg font-bold font-sans">$ 3000</span>
						</div>
						<div className="px-4 space-y-2">
							<Link to="/checkout" className="h-11 w-full flex items-center justify-center bg-black text-white rounded-sm">
								<BsCashStack />
								<span className="ml-1 text-xs uppercase font-bold">Checkout</span>
							</Link>
							<span className="block text-sm text-center text-black/50">or</span>
							<Link to="/checkout" className="text-black flex items-center justify-center hover:text-blue-500 transition-colors">
								<BsArrowLeft />
								<span className="ml-1 text-sm font-medium hover:underline">Continue shopping</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
