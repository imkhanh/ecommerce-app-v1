import React, { useContext } from 'react';
import { BsX } from 'react-icons/bs';
import { LayoutContext } from './Layout';

const CartModal = () => {
	const { state, dispatch } = useContext(LayoutContext);

	return (
		<div className="relative z-[100] select-none">
			<div
				onClick={() => dispatch({ type: 'cartModal', payload: false })}
				className={`fixed inset-0 w-full h-full bg-black bg-opacity-70 ${state.cartModal ? '' : 'hidden'}`}
			/>
			<div
				className={`fixed top-0 inset-y-0 ${
					state.cartModal ? 'right-0 opacity-100 delay-200' : 'delay-100 -right-full opacity-0'
				} duration-500 ease-in-out `}
			>
				<div className="p-4 w-[448px] flex flex-col h-screen bg-white shadow-lg">
					<div className="flex items-center justify-between">
						<span>Cart</span>
						<span className="text-2xl cursor-pointer" onClick={() => dispatch({ type: 'cartModal', payload: false })}>
							<BsX />
						</span>
					</div>
					<div className="flex-1">2</div>
					<div className="h-40 border-t border-black/10">3</div>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
