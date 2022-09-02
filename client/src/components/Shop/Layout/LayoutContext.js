export const layoutState = {
	mobileToggle: false,
	loginRegisterModal: false,
	cartModal: false,
	cartProduct: null,
	singleProduct: null,
	isCart: null,
	totolPrice: null,
	loading: false,
};

export const layoutReducer = (state = layoutState, action) => {
	switch (action.type) {
		case 'mobileToggle':
			return { ...state, mobileToggle: action.payload };
		case 'loginRegisterModal':
			return { ...state, loginRegisterModal: action.payload };
		case 'cartModal':
			return { ...state, cartModal: action.payload };
		case 'cartProduct':
			return { ...state, cartProduct: action.payload };
		case 'singleProduct':
			return { ...state, singleProduct: action.payload };
		case 'isCart':
			return { ...state, isCart: action.payload };
		case 'totolPrice':
			return { ...state, totolPrice: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
