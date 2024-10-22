const BASE_URL = "https://ecec-118-70-102-149.ngrok-free.app/api/v1";

const AUTH_ENDPOINTS = {
	LOGIN: "/auth/login",
	SIGNUP: "/auth/signup",
	SENT_OTP: "/auth/send-otp",
	VERIFY_OTP: "/auth/verify-otp",
	RESET_PASSWORD: "/auth/reset-password-mobile",
	UPDATE_USER: "/users",
};

const CATEGORY_ENDPOINTS = {
	GET_ALL_CATEGORIES: "/categories",
};

const TOUR_ENDPOINTS = {
	GET_TOURS_BY_CATEGORY: "/tours/category",
	GET_TOURS_BY_ID: "/tours",
};

const SEARCH_ENDPOINTS = {
	SEARCH: "/search/tours",
};

export {
	AUTH_ENDPOINTS,
	BASE_URL,
	CATEGORY_ENDPOINTS,
	SEARCH_ENDPOINTS,
	TOUR_ENDPOINTS,
};
