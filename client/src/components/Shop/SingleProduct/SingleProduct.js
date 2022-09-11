import React from 'react';
import Layout from '../Layout/Layout';

const SingleProductSection = () => {
	return (
		<section className="max-w-7xl mx-auto w-full flex flex-col px-8 md:px-4 py-12 md:py-8 duration-200 ease-in-out">
			<div className="mb-12 lg:mb-10 md:mb-8 relative">
				<h1 className="text-2xl lg:text-xl md:text-base text-center text-black font-medium tracking-widest">Product Detail</h1>
				<p className="absolute -bottom-10 lg:-bottom-8 md:-bottom-6 left-1/2 transform -translate-x-1/2 w-[1px] h-10 lg:h-8 md:h-6 bg-black/50"></p>
			</div>
			<div className="flex flex-col">
				<div className="space-x-2">
					<span className="text-sm text-black/60">Home</span>
					<span className="text-sm text-black/60">/</span>
					<span className="text-sm text-black/60">Product</span>
				</div>
				<div></div>
			</div>
		</section>
	);
};

const SingleProduct = () => {
	return <Layout children={<SingleProductSection />} />;
};

export default SingleProduct;
