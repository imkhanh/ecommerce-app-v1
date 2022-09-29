import React from 'react';
import Layout from '../Layout';

const CategoriesComponent = () => {
	return (
		<div className="h-[2000px]">
			<div className="text-sm">CategoriesComponent </div>
			<div></div>
		</div>
	);
};

const Categories = () => {
	return <Layout children={<CategoriesComponent />} />;
};

export default Categories;
