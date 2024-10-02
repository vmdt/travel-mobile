import { SEARCH_ENDPOINTS } from "../../constants/api";
import api from "../axios";

export const search = async (query) => {
	try {
		const response = await api.get(`${SEARCH_ENDPOINTS.SEARCH}/${query}`);
		return response.data;
	} catch (error) {
		console.log("error: ", error);
		// TODO: handle error
	}
};
