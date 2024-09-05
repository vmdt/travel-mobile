import { API_ENDPOINTS } from "../../constants/api";
import { api } from "../axios";

export const login = async (email, password) => {
	try {
		const response = await api.post(API_ENDPOINTS.LOGIN, {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.log(error?.response?.data);
		// TODO: handle error
	}
};
