const BASE_URL = "http://172.16.126.1:4001/api/v1";

const API_ENDPOINTS = {
	LOGIN: "/auth/login",
	SIGNUP: "/auth/signup",
	SENT_OTP: "/auth/send-otp",
	VERIFY_OTP: "/auth/verify-otp",
	RESET_PASSWORD: "/auth/reset-password-mobile",
};

export { API_ENDPOINTS, BASE_URL };
