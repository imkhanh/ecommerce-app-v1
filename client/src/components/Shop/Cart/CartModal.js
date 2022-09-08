import React, { useContext } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { LayoutContext } from '..';

const CartModal = () => {
	const { state, dispatch } = useContext(LayoutContext);

	return (
		<div className={`${state.cartModal ? '' : 'pointer-events-none'}`}>
			<div
				onClick={() => dispatch({ type: 'cartModal', payload: false })}
				className={`fixed inset-0 ${state.cartModal ? 'bg-black opacity-70' : 'opacity-0 '}  w-full h-full  duration-300 ease-in-out z-50`}
			/>
			<div className={`fixed top-0 max-w-md w-full h-screen ${state.cartModal ? 'delay-150 right-0 opacity-100' : '-right-full opacity-0'} bg-white shadow-md z-[100] duration-500 ease-in-out`}>
				<div className="h-12 px-4 flex items-center justify-between border-b border-black/10">
					<span className="text-sm uppercase font-light">Cart (0)</span>
					<span onClick={() => dispatch({ type: 'cartModal', payload: false })} className="text-[22px] cursor-pointer select-none">
						<IoCloseOutline />
					</span>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
