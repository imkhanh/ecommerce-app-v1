export const layoutState = {
	mobileToggle: false,
	cartToggle: false,
	authToggle: false,
	singleProduct: null,
	loading: false,
};

export const layoutReducer = (state = layoutState, action) => {
	switch (action.type) {
		case 'mobileToggle':
			return { ...state, mobileToggle: action.payload };
		case 'cartToggle':
			return { ...state, cartToggle: action.payload };
		case 'singleProduct':
			return { ...state, singleProduct: action.payload };
		case 'authToggle':
			return { ...state, authToggle: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
