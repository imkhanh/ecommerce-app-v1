import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { productReducer, productState } from './ProductContext';
import { getDataApi } from '../Utils/FetchData';
import { Link } from 'react-router-dom';
import ProductHeader from './ProductHeader';
import Layout from '../Layout/Layout';
import Loading from '../Utils/Loading';

export const ProductContext = createContext();

const ProductSection = () => {
	const { state, dispatch } = useContext(ProductContext);
	const { products, loading } = state;

	useEffect(() => {
		window.document.title = 'Products';
	}, []);

	useEffect(() => {
		const fetchAllProduct = async () => {
			try {
				dispatch({ type: 'loading', payload: true });
				const res = await getDataApi('/all-product');
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
			<div className="mt-8 max-w-[89rem] mx-auto w-full px-12 lg:px-8 md:px-4">
				<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-2 gap-y-12">
					{products && products.length > 0 ? (
						products.map((product) => {
							return (
								<aside key={product._id} className="bg-white">
									<figure>
										<Link to={`/product/detail/${product._id}`}>
											<img
												src={`http://localhost:3000/uploads/products/${product.images[0]}`}
												alt={product.name}
												className="h-[400px] lg:h-full w-full object-cover"
											/>
										</Link>
									</figure>
									<div className="pt-4 md:text-sm">
										<Link to={`/product/detail/`} className="font-medium">
											{product.name}
										</Link>
										<p className="mb-2 text-black/50">{product.category.name}</p>
										<p>${product.price}</p>
									</div>
								</aside>
							);
						})
					) : (
						<div>{loading && <Loading />}</div>
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
