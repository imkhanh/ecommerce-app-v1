import React from 'react';

const Checbox = ({ name, value, label, defaultChecked, handleChange }) => {
	return (
		<div className="flex items-center">
			<input
				type="checkbox"
				name={name}
				value={value}
				defaultChecked={defaultChecked}
				onChange={handleChange}
				className="w-5 h-5 border-gray-300 rounded cursor-pointer"
			/>
			<label htmlFor="sizes" className="ml-3 text-sm font-medium">
				{label}
			</label>
		</div>
	);
};

export default Checbox;
