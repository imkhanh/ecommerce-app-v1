export const categoryState = {
	categories: [],
	addCategory: false,
	editCategory: {
		modal: false,
		id: null,
		name: '',
		status: '',
		description: '',
	},
	loading: false,
};

export const categoryReducer = (state = categoryState, action) => {
	switch (action.type) {
		case 'categories':
			return { ...state, categories: action.payload };
		case 'addCategory':
			return { ...state, addCategory: action.payload };
		case 'editCategoryOpen':
			return {
				...state,
				editCategory: {
					modal: true,
					id: action.id,
					name: action.name,
					description: action.description,
					status: action.status,
				},
			};
		case 'editCategoryClose':
			return {
				...state,
				editCategory: {
					modal: false,
					id: null,
					name: '',
					description: '',
					status: '',
				},
			};
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
