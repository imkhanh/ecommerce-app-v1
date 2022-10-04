export const homeState = {
	slides: [],
	loading: false,
};

export const homeReducer = (state = homeState, action) => {
	switch (action.type) {
		case 'slides':
			return { ...state, slides: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
