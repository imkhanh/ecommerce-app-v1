import React, { useContext } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { ProductsContext } from '.';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const ProductMenu = () => {
	const { state, dispatch } = useContext(ProductsContext);

	return (
		<div className="px-4 h-16 flex items-center">
			<button
				onClick={() => dispatch({ type: 'addProduct', payload: !state.addProduct })}
				className="py-2 px-4 flex items-center bg-black text-white rounded-full"
			>
				<BsPlusCircleDotted />
				<span className="ml-2 text-sm">Add Product</span>
			</button>
			<AddProductModal />
			<EditProductModal />
		</div>
	);
};

export default ProductMenu;
