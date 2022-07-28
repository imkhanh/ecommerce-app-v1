import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { productReducer, productState } from './ProductContext';
import { getAllProduct } from './FetchData';
import ProductHeader from './ProductHeader';
import ProductItem from './ProductItem';
import Layout from '../Layout/Layout';
import Loading from '../Utils/Loading';

export const ProductContext = createContext();

const ProductSection = () => {
	const { state, dispatch } = useContext(ProductContext);
	const { products, loading } = state;

	useEffect(() => {
		document.title = 'All Product';
	}, []);

	useEffect(() => {
		const fetchAllProduct = async () => {
			dispatch({ type: 'loading', payload: true });

			try {
				const res = await getAllProduct();

				dispatch({ type: 'products', payload: res.data.products });
				dispatch({ type: 'loading', payload: false });
			} catch (error) {
				console.log(error);
			}
		};

		fetchAllProduct();
		// eslint-disable-next-line
	}, []);

	return (
		<section>
			<ProductHeader />

			<div className="mt-8 max-w-[89rem] mx-auto w-full px-12 lg:px-8 md:px-4 transition-all">
				<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-2 gap-y-24 transition-all">
					{products && products.length > 0 ? (
						products.map((product) => {
							return <ProductItem key={product._id} product={product} />;
						})
					) : (
						<>{loading && <Loading />}</>
					)}
				</div>
			</div>
		</section>
	);
};

const Products = () => {
	const [state, dispatch] = useReducer(productReducer, productState);

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			<Layout children={<ProductSection />} />
		</ProductContext.Provider>
	);
};

export default Products;
