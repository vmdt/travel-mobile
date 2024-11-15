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

export const createBooking = async (data, token) => {
	try {
		const response = await api.post(BOOKING_ENDPOINTS.CREATE_BOOKING, data, {
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

export const getVNPayUrl = async (bookingId, token) => {
	try {
		const response = await api.get(
			`${BOOKING_ENDPOINTS.GET_VNPAY_URL(bookingId, "vnpay")}?payOnMobile=true`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return response.data;
	} catch (error) {
		console.log("error: ", error.response.data);
		// TODO: Handle error
		return error.response.data;
	}
};

export const getListBookings = async (token) => {
	try {
		const response = await api.get(BOOKING_ENDPOINTS.GET_LIST_BOOKINGS, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.log("error: ", error.response.data);
		// TODO: Handle error
		return error.response.data;
	}
};

export const getBookingDetails = async (bookingId, token) => {
	try {
		const response = await api.get(
			BOOKING_ENDPOINTS.GET_BOOKING_DETAILS(bookingId),
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		);

		return response.data;
	} catch (error) {
		console.log("error: ", error.response.data);
		// TODO: Handle error
		return error.response.data;
	}
};
