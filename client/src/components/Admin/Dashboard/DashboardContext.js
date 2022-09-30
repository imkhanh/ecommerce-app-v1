export const dashboardState = {
	getAllDocuments: null,
	images: [],
	loading: false,
};

export const dashboardReducer = (state = dashboardState, action) => {
	switch (action.type) {
		case 'getAllDocuments':
			return { ...state, getAllDocuments: action.payload };
		case 'images':
			return { ...state, images: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
