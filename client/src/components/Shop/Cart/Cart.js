import React, { useContext } from 'react';
import { BsX } from 'react-icons/bs';
import { LayoutContext } from '../Layout/Layout';
import CartItem from './CartItem';

const CartModal = () => {
	const { data, dispatch } = useContext(LayoutContext);

	return (
		<div>
			<div className={`${data.cartModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-30 z-40`} onClick={() => dispatch({ type: 'cartModal', payload: false })}></div>
			<div className={`${data.cartModal ? 'translate-x-0 opacity-100 delay-300' : 'translate-x-full opacity-0'} fixed top-0 right-0 max-w-md w-full transform h-screen bg-white transition-all duration-300 ease-in-out shadow-lg z-50`}>
				<div className="h-14 px-4 flex items-center justify-between border-b border-gray-200">
					<span>Cart</span>
					<span className="cursor-pointer select-none" onClick={() => dispatch({ type: 'cartModal', payload: false })}>
						<BsX className="text-2xl" />
					</span>
				</div>
				<div>
					<CartItem />
				</div>
				<div>Cart footer</div>
			</div>
		</div>
	);
};

export default CartModal;
