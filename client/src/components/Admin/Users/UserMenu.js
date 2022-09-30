import React, { useContext } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { UserContext } from '.';
import AddUser from './AddUser';

const UserMenu = () => {
	const { state, dispatch } = useContext(UserContext);

	return (
		<>
			<div className="h-16 flex items-center justify-between">
				<div>
					<p className="text-sm font-light text-black/50">Have {state.users && state.users.length} users</p>
				</div>
				<button
					onClick={() => dispatch({ type: 'addUser', payload: !state.addUser })}
					className="py-2 px-4 flex items-center bg-black text-white rounded-full"
				>
					<BsPlusCircleDotted />
					<span className="ml-2 text-sm">Add User</span>
				</button>
			</div>
			<AddUser />
		</>
	);
};

export default UserMenu;
