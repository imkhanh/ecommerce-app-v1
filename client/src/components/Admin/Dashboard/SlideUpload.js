import React, { useContext } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { DashboardContext } from './';

const SlideUpload = () => {
	const { state, dispatch } = useContext(DashboardContext);
	return (
		<div className="px-8 py-4 w-full h-auto bg-white border-t-4 border-black rounded-bl-md rounded-br-md shadow-lg space-y-4">
			<button
				onClick={() => dispatch({ type: 'btnUpload', payload: !state.btnUpload })}
				className="px-6 py-2 flex items-center bg-white text-black border border-dotted border-black/20 rounded-full select-none hover:bg-black hover:text-white duration-200 ease-in-out"
			>
				<BsCloudUpload />
				<span className="ml-2 text-sm">Upload Slide</span>
			</button>

			<div>
				<span className="text-sm font-light text-black/70">1 slide</span>
			</div>

			<div className="h-[400px] flex space-x-4 overflow-x-auto">
				<div className="flex-shrink-0">
					<img
						alt="name"
						src={`http://localhost:3000/uploads/products/1664471290950_2.webp`}
						className="w-full h-full object-cover border border-black"
					/>
				</div>
				<div className="flex-shrink-0">
					<img
						alt="name"
						src={`http://localhost:3000/uploads/products/1664471290950_2.webp`}
						className="w-full h-full object-cover border border-black"
					/>
				</div>
				<div className="flex-shrink-0">
					<img
						alt="name"
						src={`http://localhost:3000/uploads/products/1664471290950_2.webp`}
						className="w-full h-full object-cover border border-black"
					/>
				</div>
				<div className="flex-shrink-0">
					<img
						alt="name"
						src={`http://localhost:3000/uploads/products/1664471290950_2.webp`}
						className="w-full h-full object-cover border border-black"
					/>
				</div>
			</div>
		</div>
	);
};

export default SlideUpload;
