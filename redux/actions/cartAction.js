import { CartAPI } from "../../api";
import {
	ADD_TO_CART,
	ADD_TO_CART_FAILURE,
	DELETE_CART_ITEMS,
	DELETE_CART_ITEMS_FAILURE,
	GET_LIST_CART,
	UPDATE_CART_ITEM,
	UPDATE_CART_ITEM_FAILURE,
} from "../constants";

export const addToCart = (data, token) => {
	return async (dispatch) => {
		try {
			const response = await CartAPI.addToCart(data, token);
			if (response.status === 400) {
				throw new Error(response.data.message);
			}

			dispatch({
				type: ADD_TO_CART,
				payload: response,
			});
		} catch (error) {
			dispatch({
				type: ADD_TO_CART_FAILURE,
			});
		}
	};
};

export const getListCart = (token) => {
	return async (dispatch) => {
		try {
			const response = await CartAPI.getListCart(token);
			if (response.status === 400) {
				throw new Error(response.data.message);
			}

			dispatch({
				type: GET_LIST_CART,
				payload: response.metadata.cart,
			});
		} catch (error) {
			console.log("error: ", error);
			// TODO: Handle error
		}
	};
};

export const deleteCartItem = ({ cartId, itemId }, token) => {
	return async (dispatch) => {
		try {
			const response = await CartAPI.deleteCartItem({ cartId, itemId }, token);
			if (response.status === 400) {
				throw new Error(response.data.message);
			}
			dispatch({
				type: DELETE_CART_ITEMS,
				payload: response.metadata.cart,
			});
		} catch (error) {
			dispatch({
				type: DELETE_CART_ITEMS_FAILURE,
			});
		}
	};
};

export const updateCartItem = (data, token) => {
	return async (dispatch) => {
		try {
			const response = await CartAPI.updateCartItem(data, token);
			if (response.status === 400) {
				throw new Error(response.data.message);
			}

			dispatch({
				type: UPDATE_CART_ITEM,
				payload: response.metadata.updatedCart,
			});
		} catch (error) {
			dispatch({
				type: UPDATE_CART_ITEM_FAILURE,
			});
		}
	};
};
