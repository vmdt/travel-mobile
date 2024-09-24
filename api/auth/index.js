import { StatusCodes } from "http-status-codes";
import { API_ENDPOINTS } from "../../constants/api";
import api from "../axios";

export const login = async (email, password) => {
	try {
		// This is mock data to ignore the actual API calling
		// if (
		// 	email === mockUserLogin.metadata.user.email &&
		// 	password === mockUserLogin.metadata.user.password
		// ) {
		// 	return mockUserLogin;
		// } else if (
		// 	email === mockUserSignup.metadata.user.email &&
		// 	password === mockUserSignup.metadata.user.password
		// ) {
		// 	return mockUserSignup;
		// } else {
		// 	return {
		// 		code: StatusCodes.BAD_REQUEST,
		// 		message: "Invalid email or password",
		// 	};
		// }

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
	const isMock = true;
	try {
		// This is mock data to ignore the actual API calling
		// if (isMock) {
		// 	mockUserSignup.metadata.user = {
		// 		...data,
		// 		profilePicture:
		// 			"https://res.cloudinary.com/dxrygyw5d/image/upload/v1713621780/travelife/user/65e37174b0e7527a1ad579b6.jpg",
		// 	};
		// 	return mockUserSignup;
		// }

		const response = await api.post(API_ENDPOINTS.SIGNUP, data);
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
		const response = await api.post(API_ENDPOINTS.SENT_OTP, { email });
		return response.data;
	} catch (error) {
		if (error?.response?.data?.code === StatusCodes.BAD_REQUEST) {
			return error.response.data;
		}
	}
};

export const verifyOtp = async ({ email, otp }) => {
	try {
		const response = await api.post(API_ENDPOINTS.VERIFY_OTP, { email, otp });
		return response.data;
	} catch (error) {
		if (error?.response?.data?.code === StatusCodes.BAD_REQUEST) {
			return error.response.data;
		}
	}
};
