import { StatusCodes } from "http-status-codes";
import { AUTH_ENDPOINTS } from "../../constants/api";
import api from "../axios";

export const login = async (email, password) => {
	try {
		const response = await api.post(AUTH_ENDPOINTS.LOGIN, {
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
		const response = await api.post(AUTH_ENDPOINTS.SIGNUP, data);
		return response.data;
	} catch (error) {
		if (error?.response?.data?.code === StatusCodes.BAD_REQUEST) {
			return error.response.data;
		}
		// TODO: Handle other errors
	}
};

export const sendOtp = async ({ email }) => {
	try {
		const response = await api.post(AUTH_ENDPOINTS.SENT_OTP, { email });
		return response.data;
	} catch (error) {
		if (error?.response?.data?.code === StatusCodes.BAD_REQUEST) {
			return error.response.data;
		}
	}
};

export const verifyOtp = async ({ email, otp }) => {
	try {
		const response = await api.post(AUTH_ENDPOINTS.VERIFY_OTP, { email, otp });
		return response.data;
	} catch (error) {
		if (error?.response?.data?.code === StatusCodes.BAD_REQUEST) {
			return error.response.data;
		}
	}
};

export const resetPassword = async ({
	email,
	password,
	passwordConfirm,
	otp,
}) => {
	try {
		const response = await api.put(AUTH_ENDPOINTS.RESET_PASSWORD, {
			email,
			password,
			passwordConfirm,
			otp,
		});
		return response.data;
	} catch (error) {
		if (error?.response?.data?.code === StatusCodes.BAD_REQUEST) {
			return error.response.data;
		}
	}
};

export const updateUser = async (id, data, token) => {
	try {
		const response = await api.post(
			`${AUTH_ENDPOINTS.UPDATE_USER}/${id}`,
			data,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.log("error: ", error);
	}
};
