export const productsState = {
	products: [],
	cart: [],
	loading: false,
};

export const productsReducer = (state = productsState, action) => {
	switch (action.type) {
		case 'products':
			return { ...state, products: action.payload };
		case 'cart':
			return { ...state, cart: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
