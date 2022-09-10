export const homeState = {};

export const homeReducer = (state = homeState, action) => {
	switch (action.type) {
		case '':
			return '';

		default:
			return state;
	}
};
