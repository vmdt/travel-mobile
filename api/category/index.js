import { CATEGORY_ENDPOINTS } from "../../constants/api";
import api from "../axios";

export const getAllCategories = async () => {
	try {
		const response = await api.get(CATEGORY_ENDPOINTS.GET_ALL_CATEGORIES);
		return response.data;
	} catch (error) {
		console.log("error: ", error);
		// TODO: handle error
	}
};
