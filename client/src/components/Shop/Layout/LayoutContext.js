export const layoutState = {
	mobileToggle: false,
	loginRegisterModal: false,
	cartModal: false,
	singleProduct: null,
	inCart: null,
	totalPrice: null,
	loading: false,
};

export const layoutReducer = (state = layoutState, action) => {
	switch (action.type) {
		case 'mobileToggle':
			return { ...state, mobileToggle: action.payload };
		case 'cartModal':
			return { ...state, cartModal: action.payload };
		case 'loginRegisterModal':
			return { ...state, loginRegisterModal: action.payload };
		case 'singleProduct':
			return { ...state, singleProduct: action.payload };
		case 'inCart':
			return { ...state, loginRegistinCarterModal: action.payload };
		case 'totalPrice':
			return { ...state, totalPrice: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
