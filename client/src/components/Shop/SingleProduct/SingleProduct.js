import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { LayoutContext } from '..';
import { getSingleProduct, getListRelated } from './FetchApi';
import SingleProductImages from './SingleProductImages';
import SingleProductInfo from './SingleProductInfo';
import SingleProductHeader from './SingleProductHeader';
import CustomerReviews from './CustomerReviews';
import ListRelated from './ListRelated';
import Loading from '../Utils/Loading';

const SingleProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const { singleProduct: product, listProduct: lists, loading } = state;

	useEffect(() => {
		fetchAllProducts();
		fetchListRealted();

		// eslint-disable-next-line
	}, [id]);

	const fetchAllProducts = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getSingleProduct(id);
			setTimeout(() => {
				if (res && res.data.product) {
					dispatch({ type: 'singleProduct', payload: res.data.product });
					dispatch({ type: 'loading', payload: false });
				}
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchListRealted = async () => {
		try {
			const res = await getListRelated(id);
			if (res && res.data.lists) {
				dispatch({ type: 'listProduct', payload: res.data.lists });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) {
		return <Loading />;
	} else if (!product) {
		return <div className="text-sm font-light text-black/50 italic">Product not found</div>;
	}

	return (
		<section className="divide-y divide-black/10">
			<SingleProductHeader product={product} />
			<div className="w-full h-full flex md:flex-col">
				{/* Product images */}
				<SingleProductImages product={product} />
				{/* Product detail */}
				<SingleProductInfo product={product} />
			</div>
			<CustomerReviews />
			<div className="p-32 xl:p-28 lg:p-24 md:py-20 md:px-4 space-y-8 md:space-y-6 sm:space-y-4">
				<h4 className="text-3xl md:text-2xl sm:text-xl font-bold">Simplicity</h4>
				<p className="text-justify sm:text-sm">
					Each Rains product is initiated to honor and challenge traditional perceptions of rainwear. In conjunction to providing quality waterproof
					products, Rains apparel, bags, and accessories are designed to mix function with fashion.
				</p>
			</div>
			<ListRelated lists={lists} />
		</section>
	);
};

const SingleProduct = () => {
	return <Layout children={<SingleProductSection />} />;
};

export default SingleProduct;
