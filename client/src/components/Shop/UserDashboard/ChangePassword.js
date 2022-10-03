import React, { useState } from 'react';
import DashboardLayout from '.';
import { changePassword } from './FetchApi';

const ChangePasswordSection = () => {
	const [data, setData] = useState({ oldPassword: '', newPassword: '', passwordConfirm: '', error: '', success: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let formData = {
			uId: JSON.parse(localStorage.getItem('auth')).user.id,
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		};

		if (data.newPassword !== data.passwordConfirm) {
			setData({ ...data, error: 'Password is incorrect' });
		}

		try {
			const res = await changePassword(formData);
			if (res && res.data.success) {
				setData({ ...data, error: false, success: res.data.success });
				setTimeout(() => {
					setData({
						...data,
						oldPassword: '',
						newPassword: '',
						passwordConfirm: '',
						error: false,
						success: false,
					});
				}, 2000);
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

	return (
		<div className="px-8 pb-8 border-t-2 border-black shadow">
			<div className="mb-4 h-20 flex flex-col items-start justify-center border-b border-black/10">
				<h4 className="text-base font-semibold">Set Password</h4>
				<p className="text-sm text-black/70">
					For your account's security, do not share your password with anyone else
				</p>
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
					<span className="block mb-1 text-sm">Old Password</span>
					<input
						type="password"
						name="oldPassword"
						value={data.oldPassword || ''}
						onChange={handleChange}
						className="w-full h-10 text-sm px-2 border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
					/>
				</div>
				<div>
					<span className="block mb-1 text-sm">New Password</span>
					<input
						type="password"
						name="newPassword"
						value={data.newPassword || ''}
						onChange={handleChange}
						className="w-full h-10 text-sm px-2 border border-black/10 rounded-sm outline-none focus:border-black duration-200 ease-in-out"
					/>
				</div>
				<div>
					<span className="block mb-1 text-sm">Password Confirm</span>
					<input
						type="password"
						name="passwordConfirm"
						value={data.passwordConfirm || ''}
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

const ChangePassword = () => {
	return <DashboardLayout children={<ChangePasswordSection />} />;
};

export default ChangePassword;
