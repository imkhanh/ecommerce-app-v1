import React, { createContext, useReducer } from 'react';
import { userReducer, userState } from './UserContext';
import UserMenu from './UserMenu';
import Layout from '../Layout';
import UserTable from './UserTable';

export const UserContext = createContext();

const UserSection = () => {
	return (
		<section className="p-8">
			<UserMenu />
			<UserTable />
		</section>
	);
};

const Users = () => {
	const [state, dispatch] = useReducer(userReducer, userState);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<Layout children={<UserSection />} />
		</UserContext.Provider>
	);
};

export default Users;
