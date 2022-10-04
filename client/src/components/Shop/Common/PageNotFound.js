import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center bg-gray-50">
			<div className="flex flex-col justify-center items-center space-y-2">
				<h4 className="uppercase text-black/30 text-4xl font-bold">Page not found</h4>
				<Link to="/" className="flex items-center">
					<BsArrowLeft />
					<span className="ml-2">Back to home</span>
				</Link>
			</div>
		</div>
	);
};

export default PageNotFound;
