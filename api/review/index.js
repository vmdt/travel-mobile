import { REVIEW_ENDPOINTS } from "../../constants/api";
import api from "../axios";

export const createReview = async (data, token) => {
	try {
		const response = await api.post(REVIEW_ENDPOINTS.CREATE_REVIEW, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error at createReview: ", error.response.data);
		// TODO: Handle error
		return error.response.data;
	}
};