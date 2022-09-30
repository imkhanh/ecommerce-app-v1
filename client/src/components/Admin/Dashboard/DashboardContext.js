export const dashboardState = {
	getAllDocuments: null,
	getImages: null,
	btnUpload: false,
	loading: false,
};

export const dashboardReducer = (state = dashboardState, action) => {
	switch (action.type) {
		case 'getAllDocuments':
			return { ...state, getAllDocuments: action.payload };
		case 'getImages':
			return { ...state, getImages: action.payload };
		case 'btnUpload':
			return { ...state, btnUpload: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
