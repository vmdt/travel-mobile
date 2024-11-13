import { DISCOUNT_ENDPOINTS } from "../../constants/api";
import api from "../axios";

export const getDiscountAmount = async (discountCode, tours) => {
	try {
		const response = await api.post(DISCOUNT_ENDPOINTS.GET_DISCOUNT_AMOUNT, {
			code: discountCode,
			tours,
		});

		return response.data;
	} catch (error) {
		console.log("error: ", error.response.data);
		// TODO: handle error
		return error.response;
	}
};
