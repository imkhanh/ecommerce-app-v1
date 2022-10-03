export const dashboardState = {
	user: null,
	lists: null,
	orderByUser: null,
	loading: false,
};

export const dashboardReducer = (state = dashboardState, action) => {
	switch (action.type) {
		case 'user':
			return { ...state, user: action.payload };
		case 'lists':
			return { ...state, lists: action.payload };
		case 'orderByUser':
			return { ...state, orderByUser: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };

		default:
			return state;
	}
};
