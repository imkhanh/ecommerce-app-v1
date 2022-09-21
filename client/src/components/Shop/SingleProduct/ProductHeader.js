import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductHeader = () => {
	const navigate = useNavigate();

	return (
		<div className="py-4 px-6 border-t-0 md:border-b border-black/10 flex items-center">
			<div className="flex items-center text-sm space-x-2 text-black/50">
				<p onClick={() => navigate('/')} className="cursor-pointer">
					Home
				</p>
				<span>/</span>
				<p onClick={() => navigate('/shop')} className="cursor-pointer">
					Shop
				</p>
				{/* {products && (
						<>
							<span>/</span>
							<p className="cursor-pointer font-medium text-black">{products ? products[0]?.category.name : ''}</p>
						</>
					)} */}
			</div>
		</div>
	);
};

export default ProductHeader;
