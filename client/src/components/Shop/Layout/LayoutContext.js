export const layoutState = {
	loginRegisteModal: false,
	cartModal: false,
	mobileToggle: false,
};

export const layoutReducer = (state = layoutState, action) => {
	switch (action.type) {
		case 'mobileToggle':
			return { ...state, mobileToggle: action.payload };
		case 'cartModal':
			return { ...state, cartModal: action.payload };
		case 'loginRegisteModal':
			return { ...state, loginRegisteModal: action.payload };
		default:
			return state;
	}
};
