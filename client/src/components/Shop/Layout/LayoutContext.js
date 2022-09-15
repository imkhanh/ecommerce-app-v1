import React, { createContext } from 'react';

export const LayoutContext = createContext();

export const layoutState = {
	mobileToggle: false,
	authModal: false,
	cartModal: false,
	singleProduct: null,
	carts: null,
	inCart: null,
	loading: false,
};

export const layoutReducer = (state = layoutState, action) => {
	switch (action.type) {
		case 'mobileToggle':
			return { ...state, mobileToggle: action.type };
		case 'authModal':
			return { ...state, authModal: action.type };
		case 'cartModal':
			return { ...state, cartModal: action.type };
		case 'singleProduct':
			return { ...state, singleProduct: action.type };
		case 'carts':
			return { ...state, carts: action.type };
		case 'inCart':
			return { ...state, inCart: action.type };
		case 'loading':
			return { ...state, loading: action.type };
		default:
			return state;
	}
};

export const Layout = ({ children }) => {
	return (
		<>
			<div>Header</div>
			{children}
		</>
	);
};
