export const productsState = {
	products: [],
	addProduct: false,
	editProduct: {
		modal: false,
		id: '',
		name: '',
		category: '',
		description: '',
		brand: '',
		images: null,
		price: '',
		quantity: '',
		offer: '',
		status: '',
		shipping: '',
	},
	loading: false,
};

export const productsReducer = (state = productsState, action) => {
	switch (action.type) {
		case 'products':
			return { ...state, products: action.payload };
		case 'addProduct':
			return { ...state, addProduct: action.payload };
		case 'editProductOpen':
			return {
				...state,
				editProduct: {
					modal: true,
					id: action.payload.id,
					name: action.payload.name,
					category: action.payload.category,
					description: action.payload.description,
					brand: action.payload.brand,
					images: action.payload.images,
					price: action.payload.price,
					quantity: action.payload.quantity,
					offer: action.payload.offer,
					status: action.payload.status,
					shipping: action.payload.shipping,
				},
			};
		case 'editProductClose':
			return {
				...state,
				editProduct: {
					modal: false,
					id: '',
					name: '',
					category: '',
					description: '',
					brand: '',
					images: null,
					price: '',
					quantity: '',
					offer: '',
					status: '',
					shipping: '',
				},
			};
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
