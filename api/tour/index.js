import { TOUR_ENDPOINTS } from "../../constants/api";
import api from "../axios";

export const getToursByCategory = async (category) => {
	try {
		const response = await api.get(
			`${TOUR_ENDPOINTS.GET_TOURS_BY_CATEGORY}/${category}`,
		);
		return response.data;
	} catch (error) {
		console.log("error: ", error);
	}
};
