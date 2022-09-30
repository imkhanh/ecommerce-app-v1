import React, { useContext, useEffect } from 'react';
import { UserContext } from '.';
import { getAllUsers, deleteUser } from './FetchApi';
import { BsTrashFill } from 'react-icons/bs';
import Loading from '../Layout/Loading';
import dayjs from 'dayjs';

const UserTable = () => {
	const { state, dispatch } = useContext(UserContext);
	const { users, loading } = state;

	useEffect(() => {
		fetchAllUsers();
		// eslint-disable-next-line
	}, []);

	const fetchAllUsers = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllUsers();
			dispatch({ type: 'users', payload: res.data.users });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteUser = async (id) => {
		try {
			const res = await deleteUser(id);
			if (res && res.data.success) {
				fetchAllUsers();
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="mt-4 bg-white overflow-x-auto border border-gray-200 rounded-sm shadow-lg">
			<table className="min-w-full text-sm divide-y divide-gray-200">
				<thead>
					<tr>
						<th className="pl-4 py-2 font-medium text-left text-black">Id</th>
						<th className="py-2 font-medium text-left text-black">Full name</th>
						<th className="py-2 font-medium text-left text-black">User name</th>
						<th className="py-2 font-medium text-left text-black">Email</th>
						<th className="py-2 font-medium text-left text-black">Phone</th>
						<th className="py-2 font-medium text-left text-black">Role</th>
						<th className="py-2 font-medium text-left text-black">Created At</th>
						<th className="py-2 font-medium text-left text-black">Updated At</th>
						<th className="py-2 font-medium text-left text-black">Action</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{users.length > 0 ? (
						users.map((user) => {
							return (
								<tr key={user._id}>
									<td className="p-4 text-black/70">{user._id}</td>
									<td className="py-4 text-black/70">{user.fullName}</td>
									<td className="py-4 text-black/70">{user.userName}</td>
									<td className="py-4 text-black/70">{user.email}</td>
									<td className="py-4 text-black/70">{user.phoneNumber}</td>
									<td className="py-4">
										<span
											className={`py-[6px] px-4 rounded-full border border-black/10 text-xs font-medium cursor-pointer select-none ${
												user.role === 0
													? 'border-green-50 text-green-700 bg-green-50'
													: 'border-red-50 text-red-500 bg-red-50'
											}`}
										>
											{user.role === 0 ? 'User' : 'Admin'}
										</span>
									</td>
									<td className="py-4 text-black/70">{dayjs(user.createdAt).format('DD/MM/YYYY')}</td>
									<td className="py-4 text-black/70">{dayjs(user.updatedAt).format('DD/MM/YYYY')}</td>
									<td className="py-4 text-black/70">
										<div className="flex items-center space-x-4">
											<span
												onClick={() => handleDeleteUser(user._id)}
												className="cursor-pointer select-none hover:text-red-500"
											>
												<BsTrashFill />
											</span>
										</div>
									</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td className="py-2 px-4 text-black/50 italic font-light">No user found</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
