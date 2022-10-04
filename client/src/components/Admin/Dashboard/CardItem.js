import React, { useContext, useEffect } from 'react';
import { BsCollectionFill, BsGridFill, BsPeopleFill, BsReceipt } from 'react-icons/bs';
import { DashboardContext } from '.';
import { getAllDocuments } from './FetchApi';
const CardItem = () => {
	const { state, dispatch } = useContext(DashboardContext);

	useEffect(() => {
		fetchAllDocuments();
		// eslint-disable-next-line
	}, []);

	const fetchAllDocuments = async () => {
		try {
			const res = await getAllDocuments();
			dispatch({ type: 'getAllDocuments', payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="">
			<div className="grid grid-cols-4 gap-4">
				<div className="w-full h-[160px] border-t-4 border-blue-500 rounded-bl-md rounded-br-md shadow-lg bg-white">
					<div className="h-full flex flex-col items-center justify-center space-y-2">
						<span className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
							<BsGridFill />
						</span>
						<span>{state.getAllDocuments ? state.getAllDocuments.products : 0}</span>
					</div>
				</div>
				<div className="w-full h-[160px] border-t-4 border-green-500 rounded-bl-md rounded-br-md shadow-lg bg-white">
					<div className="h-full flex flex-col items-center justify-center space-y-2">
						<span className="w-10 h-10 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
							<BsCollectionFill />
						</span>
						<span>{state.getAllDocuments ? state.getAllDocuments.categories : 0}</span>
					</div>
				</div>
				<div className="w-full h-[160px] border-t-4 border-gray-500 rounded-bl-md rounded-br-md shadow-lg bg-white">
					<div className="h-full flex flex-col items-center justify-center space-y-2">
						<span className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
							<BsPeopleFill />
						</span>
						<span>{state.getAllDocuments ? state.getAllDocuments.users : 0}</span>
					</div>
				</div>
				<div className="w-full h-[160px] border-t-4 border-amber-500 rounded-bl-md rounded-br-md shadow-lg bg-white">
					<div className="h-full flex flex-col items-center justify-center space-y-2">
						<span className="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center">
							<BsReceipt />
						</span>
						<span>{state.getAllDocuments ? state.getAllDocuments.orders : 0}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardItem;
