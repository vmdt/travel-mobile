const BASE_URL = "http://172.16.126.1:4001/api/v1";

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

const CART_ENDPOINTS = {
	GET_LIST_CART: "/carts",
	ADD_TO_CART: "/carts",
	DELETE_CART_ITEMS: "/carts",
	UPDATE_CART_ITEM: "/carts/update",
};

const BOOKING_ENDPOINTS = {
	BOOK_NOW: "/booking/book-now",
	CHECKOUT_REVIEW: "/checkout/review",
};

export {
	AUTH_ENDPOINTS,
	BASE_URL,
	BOOKING_ENDPOINTS,
	CART_ENDPOINTS,
	CATEGORY_ENDPOINTS,
	SEARCH_ENDPOINTS,
	TOUR_ENDPOINTS,
};
