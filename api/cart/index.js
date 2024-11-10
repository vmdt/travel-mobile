import { CART_ENDPOINTS } from "../../constants/api";
import api from "../axios";

export const getListCart = async (token) => {
	try {
		const response = await api.get(CART_ENDPOINTS.GET_LIST_CART, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log("error: ", error);
		// TODO: Handle error
		return error;
	}
};

export const addToCart = async (data, token) => {
	try {
		const response = await api.post(CART_ENDPOINTS.ADD_TO_CART, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log("error.response: ", error.response.data);
		// TODO: Handle error
		return error;
	}
};

export const deleteCartItem = async ({ cartId, itemId }, token) => {
	try {
		const response = await api.delete(CART_ENDPOINTS.DELETE_CART_ITEMS, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: {
				cart: cartId,
				itemId,
			},
		});

		return response.data;
	} catch (error) {
		console.log("error: ", error.response.data);
		// TODO: Handle error
		return error;
	}
};

export const updateCartItem = async (data, token) => {
	try {
		const response = await api.post(CART_ENDPOINTS.UPDATE_CART_ITEM, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.log("error.response: ", error.response.data);
		// TODO: Handle error
	}
};
