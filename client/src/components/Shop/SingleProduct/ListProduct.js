import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../url';
import { getListProduct } from './FetchApi';

const ListProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchListProduct = async () => {
			setLoading(true);
			try {
				const res = await getListProduct(id);
				setProducts(res.data.lists);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchListProduct();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="py-24 px-8 lg:px-4 space-y-12">
			<div className="">
				<h4 className="text-4xl lg:text-3xl md:text-2xl font-bold">You might also like</h4>
			</div>
			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 ">
				{loading ? (
					<div className="py-4 text-black/50">Please wait...</div>
				) : products && products.length > 0 ? (
					products.map((product) => {
						return (
							<div
								key={product._id}
								className="flex flex-col bg-white cursor-pointer"
								onClick={() => navigate(`/shop/product-detail/${product._id}`)}
							>
								<div className="flex-shrink">
									<img
										alt={product.name}
										className="w-full h-[280px] md:h-full object-contain"
										src={`${BASE_URL}/uploads/products/${product.images[0]}`}
									/>
								</div>
								<div className="pt-4">
									<h4 className="md:text-sm font-medium truncate cursor-pointer">{product.name}</h4>
									<p className="md:text-sm font-normal">${product.price}.00</p>
								</div>
							</div>
						);
					})
				) : (
					<div className="py-4 text-black/50">No product found</div>
				)}
			</div>
		</div>
	);
};

export default ListProduct;
