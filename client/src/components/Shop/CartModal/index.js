import React, { useContext } from 'react';
import Overlay from '../Common/Overlay';
import { LayoutContext } from '../Layout';

const CartModal = () => {
	const { state, dispatch } = useContext(LayoutContext);

	return (
		<div className="relative">
			<Overlay state={state.cartToggle} dispatch={() => dispatch({ type: 'cartToggle', payload: false })} />
			<div
				className={`fixed top-0 right-0 ${
					state.cartToggle ? 'w-[448px] opacity-100' : 'w-0 opacity-0'
				}  h-screen shadow-lg bg-white duration-300 ease-in-out z-[70]`}
			>
				<div className="flex flex-col w-full h-full">
					<div className="h-14 px-4 flex items-center justify-between border-b border-black/10">
						<span>Cart</span>
						<span
							onClick={() => dispatch({ type: 'cartToggle', payload: false })}
							className="cursor-pointer select-none"
						>
							X
						</span>
					</div>
					<div className="flex-1">2</div>
					<div className="h-32 border-t border-black/10">3</div>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
