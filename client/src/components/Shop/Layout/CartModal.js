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
				className={`fixed top-0 right-0 inset-y-0 h-screen bg-white shadow-lg ${state.cartModal ? 'delay-150 w-[448px]' : 'w-0'}  duration-500 ease-in-out`}
			>
				<div className="flex flex-col w-full h-full">
					<div className="px-4 h-20 border-b border-black/10 flex items-center justify-between">
						<span className="text-sm uppercase font-semibold">Cart</span>
						<span className="text-3xl cursor-pointer" onClick={() => dispatch({ type: 'cartModal', payload: false })}>
							<BsX />
						</span>
					</div>
					<div className="flex-1 overflow-y-auto">2</div>
					<div className="h-40 border-t border-black/10">3</div>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
