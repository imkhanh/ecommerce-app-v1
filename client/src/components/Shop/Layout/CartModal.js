import React, { useContext } from 'react';
import { LayoutContext } from './Layout';

const CartModal = () => {
	const { state, dispatch } = useContext(LayoutContext);

	return (
		<div className="relative z-[100]">
			<div
				onClick={() => dispatch({ type: 'cartModal', payload: false })}
				className={`${state.cartModal ? '' : 'hidden'} fixed inset-0 w-full h-full bg-black  bg-opacity-70`}
			/>
			<div className={`${state.cartModal ? '' : 'hidden'} fixed top-0 right-0 inset-y-0`}>
				<div className="p-4 w-[448px] flex flex-col h-screen bg-white shadow-lg">
					<div className="flex items-center justify-between">
						<span>Cart</span>
						<span>X</span>
					</div>
					<div className="flex-1">2</div>
					<div className="h-40 border-t border-black/10">3</div>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
