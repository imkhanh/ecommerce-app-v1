import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from './';
import { getAllProducts } from './FetchApi';
import ProductItem from './ProductItem';
import ProductSidebar from './ProductSidebar';
import { BsSliders } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Loading from '../Common/Loading';
import LoadMore from './LoadMore';

const ProductSection = () => {
	const { state, dispatch } = useContext(ProductsContext);
	const { products, loading } = state;

	const [page, setPage] = useState(1);
	const [result, setResult] = useState(1);

	useEffect(() => {
		fetchProducts();
		// eslint-disable-next-line
	}, [page]);

	const fetchProducts = async () => {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await getAllProducts(page);
			dispatch({ type: 'products', payload: res.data.products });
			setResult(res.data.result);
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section>
			<div>
				<ProductSidebar />
				<button
					onClick={() => dispatch({ type: 'sideBarToggle', payload: true })}
					className="fixed top-1/2 right-8 transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-base hover:scale-125 duration-500 ease-out z-20 "
				>
					<BsSliders />
				</button>
			</div>
			<div>
				<div className="py-4 px-8 lg:px-4 flex items-center">
					<div className="text-sm md:text-xs flex items-center text-black/50 font-light space-x-2">
						<Link to="/">Home</Link>
						<div>/</div>
						<Link to="/shop">Shop</Link>
					</div>
				</div>
				<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 border-t border-l border-black/10">
					{loading ? (
						<Loading />
					) : products.length > 0 ? (
						products.map((product) => {
							return <ProductItem key={product._id} product={product} />;
						})
					) : (
						<div className="p-8 lg:p-4 text-black/50">No product found</div>
					)}
				</div>
			</div>
			<div className="py-24 flex items-center justify-center">
				<LoadMore result={result} page={page} setPage={setPage} />
			</div>
		</section>
	);
};

export default ProductSection;
