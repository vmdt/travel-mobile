import { BookingAPI } from "../../api";
import { BOOK_NOW } from "../constants";

export const bookNow = (data, token) => {
	return async (dispatch) => {
		try {
			const response = await BookingAPI.bookNow(data, token);
			if (response.status === 400) {
				throw new Error(response.data.message);
			}

			dispatch({
				type: BOOK_NOW,
				payload: response.metadata,
			});
		} catch (error) {
			console.log("error: ", error.response.data);
			// TODO: Handle error
		}
	};
};
