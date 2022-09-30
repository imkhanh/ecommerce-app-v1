import React, { useContext } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { CategoryContext } from '.';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';

const CategoryMenu = () => {
	const { state, dispatch } = useContext(CategoryContext);

	return (
		<>
			<div className="h-16 flex items-center justify-between">
				<div>
					<p className="text-sm font-light text-black/50">
						Have {state.categories && state.categories.length} categories
					</p>
				</div>
				<button
					onClick={() => dispatch({ type: 'addCategory', payload: !state.addCategory })}
					className="py-2 px-4 flex items-center bg-black text-white rounded-full"
				>
					<BsPlusCircleDotted />
					<span className="ml-2 text-sm">Add Category</span>
				</button>
			</div>
			<AddCategory />
			<EditCategory />
		</>
	);
};

export default CategoryMenu;
