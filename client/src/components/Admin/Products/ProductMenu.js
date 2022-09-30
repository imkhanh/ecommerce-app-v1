import React, { useContext } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { ProductsContext } from '.';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const ProductMenu = () => {
	const { state, dispatch } = useContext(ProductsContext);

	return (
		<>
			<div className="h-16 flex items-center justify-between">
				<div>
					<p className="text-sm font-light text-black/50">
						Have {state.products && state.products.length} products
					</p>
				</div>
				<button
					onClick={() => dispatch({ type: 'addProduct', payload: !state.addProduct })}
					className="py-2 px-4 flex items-center bg-black text-white rounded-full"
				>
					<BsPlusCircleDotted />
					<span className="ml-2 text-sm">Add Product</span>
				</button>
			</div>
			<AddProductModal />
			<EditProductModal />
		</>
	);
};

export default ProductMenu;
