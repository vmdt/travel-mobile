import { BOOK_NOW, UPDATE_CHECKOUT_DATA } from "../constants";

const initialState = {
	cart: "",
	tours: [],
};

const bookReducer = (state = initialState, action) => {
	const { cart, tours } = action;

	switch (action.type) {
		case BOOK_NOW:
			return {
				...state,
				cart: cart,
				tours: tours,
			};
		case UPDATE_CHECKOUT_DATA:
			return {
				...state,
				cart: cart,
				tours: tours,
			};
		default:
			return state;
	}
};

export default bookReducer;
