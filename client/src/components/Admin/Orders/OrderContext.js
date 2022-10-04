export const orderState = {
	orders: [],
	editOrder: {
		id: '',
		modal: false,
		status: '',
	},
	loading: false,
};

export const orderReducer = (state = orderState, action) => {
	switch (action.type) {
		case 'orders':
			return { ...state, orders: action.payload };
		case 'editOrderOpen':
			return {
				...state,
				editOrder: {
					modal: true,
					id: action.payload.id,
					status: action.payload.status,
				},
			};
		case 'editOrderClose':
			return {
				...state,
				editOrder: {
					modal: false,
					id: '',
					status: '',
				},
			};
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
