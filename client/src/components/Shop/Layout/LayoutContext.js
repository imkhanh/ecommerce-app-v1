export const layoutState = {
	mobileMenu: false,
	authModal: false,
	cartModal: false,
	singleProduct: null,
	cartProduct: null,
	loading: false,
};

export const layoutReducer = (state = layoutState, action) => {
	switch (action.type) {
		case 'mobileMenu':
			return { ...state, mobileMenu: action.payload };
		case 'authModal':
			return { ...state, authModal: action.payload };
		case 'cartModal':
			return { ...state, cartModal: action.payload };
		case 'singleProduct':
			return { ...state, singleProduct: action.payload };
		case 'cartProduct':
			return { ...state, cartProduct: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
