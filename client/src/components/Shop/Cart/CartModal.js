import React, { useContext } from 'react';
import { LayoutContext } from '../Layout/Layout';

const CartModal = () => {
	const { state, dispatch } = useContext(LayoutContext);

	return (
		<div>
			<div
				onClick={() => dispatch({ type: 'cartModal', payload: false })}
				className={`fixed inset-0 ${state.cartModal ? 'bg-black opacity-70' : 'opacity-0 pointer-events-none'} w-full h-full z-50 duration-300 ease-in-out`}
			/>
			<div
				className={`fixed top-0 ${
					state.cartModal ? 'bg-white opacity-100 right-0 delay-200' : 'opacity-0 -right-full'
				} max-w-md w-full h-screen duration-500 ease-in-out z-[60]`}
			>
				<div>
					<div className="h-14 border-b border-gray-50 shadow-sm flex items-center justify-between">
						<span>Cart</span>
						<span onClick={() => dispatch({ type: 'cartModal', payload: false })}>X</span>
					</div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
