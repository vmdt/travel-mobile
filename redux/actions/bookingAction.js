import { BookingAPI } from "../../api";
import { BOOK_NOW, UPDATE_CHECKOUT_DATA } from "../constants";

export const bookNow = (data, token) => {
	return async (dispatch) => {
		try {
			const response = await BookingAPI.bookNow(data, token);
			if (response.status === 400) {
				throw new Error(response.data.message);
			}

			dispatch({
				type: BOOK_NOW,
				cart: response.metadata.cart,
				tours: response.metadata.tours,
			});
		} catch (error) {
			console.log("error: ", error.response.data);
			// TODO: Handle error
		}
	};
};

export const updateCheckout = ({ cart, tours }) => {
	return {
		type: UPDATE_CHECKOUT_DATA,
		cart,
		tours,
	};
};
