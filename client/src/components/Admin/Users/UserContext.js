export const userState = {
	users: [],
	singleUser: null,
	addUser: false,
	loading: false,
};

export const userReducer = (state = userState, action) => {
	switch (action.type) {
		case 'users':
			return { ...state, users: action.payload };
		case 'singleUser':
			return { ...state, singleUser: action.payload };
		case 'addUser':
			return { ...state, addUser: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
