import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductHeader = ({ product }) => {
	const navigate = useNavigate();

	return (
		<div className="py-4 px-8 md:px-4 flex items-center">
			<div className="flex items-center text-sm space-x-2 text-black/50">
				<p onClick={() => navigate('/')} className="cursor-pointer">
					Home
				</p>
				<span>/</span>
				<p onClick={() => navigate('/shop')} className="cursor-pointer">
					Shop
				</p>
				<span>/</span>
				<p>{product ? product.category.name : ''}</p>
				<span>/</span>
				<p className="cursor-pointer font-medium text-black">{product ? product.name : ''}</p>
			</div>
		</div>
	);
};

export default ProductHeader;
