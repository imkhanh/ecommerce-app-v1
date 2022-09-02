import React, { useContext } from 'react';
import { LayoutContext } from '../Layout/Layout';

const CartModal = () => {
	const { state, dispatch } = useContext(LayoutContext);

	return (
		<div>
			<div onClick={() => dispatch({ type: 'cartModal', payload: false })} className={`${state.cartModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-70 w-full h-full z-40`} />
			<div
				className={`${
					state.cartModal ? 'translate-x-0 opacity-100' : 'opacity-0 translate-x-full'
				} fixed top-0 right-0 max-w-md w-full h-screen bg-white transform transition duration-300 ease-in-out shadow-lg z-50`}
			>
				<div className="flex flex-col w-full h-full">
					<div className="h-14 px-4 border-b border-gray-300 flex items-center justify-between">
						<div>Cart</div>
						<div onClick={() => dispatch({ type: 'cartModal', payload: false })} className="cursor-pointer">
							X
						</div>
					</div>
					<div className="flex-1">
						<div className="">cart body</div>
					</div>
					<div className="h-32">cart footer</div>
				</div>
			</div>
			;
		</div>
	);
};

export default CartModal;
