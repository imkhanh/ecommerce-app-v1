import React, { useState, useEffect, useContext } from 'react';
import { getAllCategories } from './FetchData';
import { ProductContext } from '../Products/Products';

const ProductHeader = () => {
	const { state } = useContext(ProductContext);
	const { products } = state;
	const [sticky, setSticky] = useState('');
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchAllCategories = async () => {
			try {
				const res = await getAllCategories();
				setCategories(res.data.categories);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllCategories();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const stickyClass = scrollY >= 140 ? 'is-sticky' : 're';
			setSticky(stickyClass);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className={`h-16 ${sticky}`}>
			<div className="max-w-[89rem] mx-auto w-full h-full px-12 lg:px-8 md:px-4 grid grid-cols-12 items-center transition-all">
				<div className="col-span-6 lg:col-span-4 md:hidden transition-all">
					<p className="text-sm">{products && products.length} products</p>
				</div>
				<div className="col-span-6 lg:col-span-8 md:col-span-12 flex items-center space-x-4 transition-all">
					<select className="h-8 w-full text-sm border-b border-black outline-none">
						<option>Categories</option>
						{categories.length > 0 &&
							categories.map((item) => (
								<option key={item._id} value={item._id}>
									{item.name}
								</option>
							))}
					</select>
					<select className="h-8 w-full text-sm border-b border-black outline-none">
						<option>Sort by</option>
						<option>1</option>
						<option>2</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default ProductHeader;
