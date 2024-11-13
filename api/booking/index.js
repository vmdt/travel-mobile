import { BOOKING_ENDPOINTS } from "../../constants/api";
import api from "../axios";

export const bookNow = async (data, token) => {
	try {
		const response = await api.post(BOOKING_ENDPOINTS.BOOK_NOW, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.log("error: ", error.response.data);
		// TODO: Handle error
		return error;
	}
};

export const checkoutReview = async (cartId, tours, token) => {
	try {
		const response = await api.post(
			BOOKING_ENDPOINTS.CHECKOUT_REVIEW,
			{
				cart: cartId,
				tours: tours,
			},
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		);

		return response.data;
	} catch (error) {
		console.log("error: ", error.response.data);
		// TODO: Handle error
		return error;
	}
};