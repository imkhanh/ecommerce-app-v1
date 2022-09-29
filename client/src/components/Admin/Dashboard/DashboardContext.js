export const dashboardState = {
	loading: false,
};

export const dashboardReducer = (state = dashboardState, action) => {
	switch (action.type) {
		case 'loading':
			return { ...state, loading: action.payload };

		default:
			return state;
	}
};
