import {
	ADD_TO_CART,
	ADD_TO_CART_FAILURE,
	DELETE_CART_ITEMS,
	GET_LIST_CART,
	UPDATE_CART_ITEM,
} from "../constants";

const initialState = {
	cartItems: 0,
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_LIST_CART:
			return {
				...state,
				cart: action.payload,
				cartItems: action.payload.tours.length,
			};
		case ADD_TO_CART:
			return {
				...state,
				cartItems: state.cartItems + 1,
			};
		case UPDATE_CART_ITEM:
			return {
				...state,
			};
		case DELETE_CART_ITEMS:
			return {
				...state,
				cart: action.payload,
				cartItems: state.cartItems - 1 < 0 ? 0 : state.cartItems - 1,
			};
		case ADD_TO_CART_FAILURE:
			return {
				...state,
			};
		default:
			return state;
	}
};

export default cartReducer;
