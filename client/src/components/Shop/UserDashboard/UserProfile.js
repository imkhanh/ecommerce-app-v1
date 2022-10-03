import React, { useContext, useEffect, useState } from 'react';
import DashboardLayout, { DashboardContext } from '.';
import Loading from '../Common/Loading';
import { getSingleUser, patchEditUser } from './FetchApi';

const UserProfileSection = () => {
	const uId = JSON.parse(localStorage.getItem('auth')).user.id;
	const { state, dispatch } = useContext(DashboardContext);
	const user = state.user ? state.user : null;
	const [data, setData] = useState({
		id: uId,
		fullName: '',
		userName: '',
		email: '',
		phoneNumber: '',
		error: '',
		success: '',
	});
	useEffect(() => {
		setData({
			fullName: user?.fullName,
			userName: user?.userName,
			email: user?.email,
			phoneNumber: user?.phoneNumber,
		});
	}, [user]);

	useEffect(() => {
		fetchUser();
		// eslint-disable-next-line
	}, []);

	const fetchUser = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getSingleUser(uId);
			dispatch({ type: 'user', payload: res.data.user });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let formData = {
			id: uId,
			fullName: data.fullName,
			userName: data.userName,
			email: data.email,
			phoneNumber: data.phoneNumber,
		};

		try {
			const res = await patchEditUser(formData);
			if (res && res.data.success) {
				setData({ ...data, error: false, success: res.data.success });
				setTimeout(() => {
					fetchUser();
				}, 1000);
			} else {
				setData({ ...data, error: res.data.error, success: false });
				setTimeout(() => {
					setData({ ...data, error: false, success: false });
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (state.loading) return <Loading />;

	return (
		<div className="px-8 pb-8 border-t-2 border-black shadow">
			<div className="mb-4 h-20 flex flex-col items-start justify-center border-b border-black/10">
				<h4 className="text-base font-semibold">My Profile</h4>
				<p className="text-sm text-black/70">Manage and protect your account</p>
			</div>
			{data.error && (
				<div className="mb-4 px-2 py-3 text-sm bg-red-100 text-red-700 border-l-2 border-l-red-700">
					{data.error}
				</div>
			)}
			{data.success && (
				<div className="mb-4 px-2 py-3 text-sm bg-green-100 text-green-700 border-l-2 border-l-green-700">
					{data.success}
				</div>
			)}
			<form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
				<div>
					<span className="block mb-1 text-sm">Full name</span>
					<input
						type="text"
						name="fullName"
						value={data.fullName || ''}
						onChange={handleChange}
						className="w-full h-10 text-sm px-2 border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
					/>
				</div>
				<div>
					<span className="block mb-1 text-sm">User name</span>
					<input
						type="text"
						name="userName"
						value={data.userName || ''}
						onChange={handleChange}
						className="w-full h-10 text-sm px-2 border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
					/>
				</div>
				<div>
					<span className="block mb-1 text-sm">Email Address</span>
					<input
						type="text"
						name="email"
						value={data.email || ''}
						onChange={handleChange}
						className="w-full h-10 text-sm px-2 border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
					/>
				</div>
				<div>
					<span className="block mb-1 text-sm">Phone Number</span>
					<input
						type="text"
						name="phoneNumber"
						value={data.phoneNumber || ''}
						onChange={handleChange}
						className="w-full h-10 text-sm px-2 border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
					/>
				</div>
				<div>
					<button type="submit" className="px-4 py-2 text-sm bg-black text-white">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

const UserProfile = () => {
	return <DashboardLayout children={<UserProfileSection />} />;
};

export default UserProfile;
