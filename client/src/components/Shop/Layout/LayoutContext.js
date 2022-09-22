export const layouteState = {
	mobileToggle: false,
	authModal: false,
	cartModal: false,
	singleProduct: null,
	listProduct: null,
	cartProduct: null,
	inCart: null,
	loading: false,
};

export const layouteReducer = (state = layouteState, action) => {
	switch (action.type) {
		case 'mobileToggle':
			return { ...state, mobileToggle: action.payload };
		case 'authModal':
			return { ...state, authModal: action.payload };
		case 'cartModal':
			return { ...state, cartModal: action.payload };
		case 'singleProduct':
			return { ...state, singleProduct: action.payload };
		case 'listProduct':
			return { ...state, listProduct: action.payload };
		case 'cartProduct':
			return { ...state, cartProduct: action.payload };
		case 'inCart':
			return { ...state, inCart: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
