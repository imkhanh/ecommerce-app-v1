import React, { useContext } from 'react';
import { BsX } from 'react-icons/bs';
import { LayoutContext } from './Layout';

const Carts = () => {
	const { state, dispatch } = useContext(LayoutContext);

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
				<div className="h-14 px-4 flex items-center justify-between border-b border-gray-200">
					<span>Cart</span>
					<span className="cursor-pointer select-none" onClick={() => dispatch({ type: 'cartModal', payload: false })}>
						<BsX className="text-2xl" />
					</span>
				</div>
				<div>Cart Item</div>
				<div>Cart footer</div>
			</div>
		</div>
	);
};

export default Carts;
