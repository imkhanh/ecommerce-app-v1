import React, { useContext } from 'react';
import { BsX } from 'react-icons/bs';
import { ProductsContext } from '.';
import Overlay from '../Common/Overlay';

const ProductSidebar = () => {
	const { state, dispatch } = useContext(ProductsContext);

	return (
		<div className="relative z-[100]">
			<Overlay state={state.sideBarToggle} dispatch={() => dispatch({ type: 'sideBarToggle', payload: false })} />
			<div
				className={`fixed top-0 right-0 ${
					state.sideBarToggle ? 'w-[448px] opacity-100' : 'w-0 opacity-0'
				}  h-screen shadow-lg bg-white duration-300 ease-in-out z-[70]`}
			>
				<div className="flex items-center justify-between px-5 h-14 border-b border-black/10">
					<span className="text-sm font-medium">Filters</span>
					<span
						className="text-2xl text-black/50 hover:text-black cursor-pointer select-none"
						onClick={() => dispatch({ type: 'sideBarToggle', payload: false })}
					>
						<BsX />
					</span>
				</div>

				<div className="px-5 py-3">
					<button name="reset" type="button" className="text-xs font-medium text-gray-600 underline rounded">
						Reset All
					</button>
				</div>

				<div className="flex flex-col h-full overflow-y-scroll">
					<div>
						<span className="block w-full px-5 py-3 text-xs font-medium border-b">Brand</span>
						<div className="px-5 py-3 space-y-2"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductSidebar;
