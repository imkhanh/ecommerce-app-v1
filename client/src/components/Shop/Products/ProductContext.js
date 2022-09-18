export const productState = {
	products: [],
	categories: [],
	searchDropdown: false,
	categoryDropdown: false,
	sortDropdown: false,
	loading: false,
};

export const productReducer = (state = productState, action) => {
	switch (action.type) {
		case 'products':
			return { ...state, products: action.payload };
		case 'categories':
			return { ...state, categories: action.payload };
		case 'searchDropdown':
			return { ...state, searchDropdown: action.payload, categoryDropdown: false, sortDropdown: false };
		case 'categoryDropdown':
			return { ...state, categoryDropdown: action.payload, searchDropdown: false, sortDropdown: false };
		case 'sortDropdown':
			return { ...state, sortDropdown: action.payload, categoryDropdown: false, searchDropdown: false };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
