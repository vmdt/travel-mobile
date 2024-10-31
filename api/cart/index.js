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
	}
};
