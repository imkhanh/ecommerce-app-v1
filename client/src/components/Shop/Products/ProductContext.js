export const productState = {
	products: [],
	loading: false,
};

export const productReducer = (state = productState, action) => {
	switch (action.type) {
		case 'products':
			return { ...state, products: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
