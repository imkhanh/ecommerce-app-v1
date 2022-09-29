import React, { useContext } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { ProductsContext } from '.';
import AddModal from './AddModal';

const Menu = () => {
	const { state, dispatch } = useContext(ProductsContext);

	return (
		<div className="mb-8 h-14 flex items-center">
			<button
				onClick={() => dispatch({ type: 'addProduct', payload: !state.addProduct })}
				className="py-3 px-4 flex items-center justify-center bg-black text-white rounded-full"
			>
				<BsPlusCircleDotted />
				<span className="ml-2 text-xs font-medium uppercase">Add product</span>
			</button>
			<AddModal />
		</div>
	);
};

export default Menu;
