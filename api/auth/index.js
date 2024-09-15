import { StatusCodes } from "http-status-codes";
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
		if (error?.response?.data?.code === StatusCodes.BAD_REQUEST) {
			return error.response.data;
		}
		// TODO: Handle other errors
	}
};

export const signup = async (data) => {
	try {
		const response = await api.post(API_ENDPOINTS.SIGNUP, data);
		return response.data;
	} catch (error) {
		if (error?.response?.data?.code === StatusCodes.BAD_REQUEST) {
			return error.response.data;
		}
		// TODO: Handle other errors
	}
};
