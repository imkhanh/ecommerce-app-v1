import React, { useContext, useState } from 'react';
import { UserContext } from '.';
import Overlay from '../Layout/Overlay';
import { getAllUsers, register } from './FetchApi';

const AddUser = () => {
	const { state, dispatch } = useContext(UserContext);
	const [data, setData] = useState({
		fullName: '',
		userName: '',
		email: '',
		password: '',
		success: '',
		error: '',
	});

	const fetchAllUsers = async () => {
		const res = await getAllUsers();
		dispatch({ type: 'users', payload: res.data.users });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await register({
				fullName: data.fullName,
				userName: data.userName,
				email: data.email,
				password: data.password,
			});
			if (res && res.data.success) {
				setData({
					...data,
					fullName: '',
					userName: '',
					email: '',
					password: '',
					error: false,
					success: res.data.success,
					loading: false,
				});

				fetchAllUsers();
				dispatch({ type: 'addUser', payload: false });
			} else {
				setData({ ...data, error: res.data.error, success: false, loading: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (data.error || data.success) {
		setTimeout(() => {
			setData({ ...data, name: '', description: '', status: '', success: false, error: false });
		}, 2000);
	}

	return (
		<div className="relative">
			<Overlay state={state.addUser} dispatch={() => dispatch({ type: 'addUser', payload: false })} />
			<div
				className={`${
					state.addUser ? '' : 'hidden'
				} bg-white fixed top-12 left-1/2 transform -translate-x-1/2 max-w-lg w-full h-auto rounded-sm z-[70]`}
			>
				<div className="h-14 flex items-center justify-center">
					<h2 className="font-semibold text-lg uppercase">Add User</h2>
				</div>

				{data.success && <div className="py-3 px-2 mx-12 text-sm bg-green-100 text-green-700">{data.success}</div>}
				{data.error && <div className="py-3 px-2 mx-12 text-sm bg-red-100 text-red-700">{data.error}</div>}

				<form onSubmit={handleSubmit} className="pt-4 pb-6 px-12 space-y-4">
					<div className=" space-y-1">
						<span className="text-sm text-black">Full name</span>
						<input
							type="text"
							name="fullName"
							id="fullName"
							value={data.fullName}
							onChange={(e) => setData({ ...data, success: false, error: false, fullName: e.target.value })}
							placeholder="Please enter your full name"
							className={`px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-xs focus:border-black rounded-sm`}
						/>
					</div>
					<div className=" space-y-1">
						<span className="text-sm text-black">User name</span>
						<input
							type="text"
							name="userName"
							id="userName"
							value={data.userName}
							onChange={(e) => setData({ ...data, success: false, error: false, userName: e.target.value })}
							placeholder="Please enter your full name"
							className={`px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-xs focus:border-black rounded-sm`}
						/>
					</div>
					<div className=" space-y-1">
						<span className="text-sm text-black">Email Address</span>
						<input
							type="text"
							name="email"
							id="email"
							value={data.email}
							onChange={(e) => setData({ ...data, success: false, error: false, email: e.target.value })}
							placeholder="Please enter your full name"
							className={`px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-xs focus:border-black rounded-sm`}
						/>
					</div>
					<div className=" space-y-1">
						<span className="text-sm text-black">Password</span>
						<input
							type="password"
							name="password"
							id="password"
							value={data.password}
							onChange={(e) => setData({ ...data, success: false, error: false, password: e.target.value })}
							placeholder="Please enter your full name"
							className={`px-2 text-sm w-full h-10 outline-none text-black bg-white border border-black/10 placeholder:text-xs focus:border-black rounded-sm`}
						/>
					</div>
					<button className="w-full h-10 text-sm bg-black text-white rounded-sm border border-black">
						Add User
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddUser;
