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
	GET_BOOKING_DETAILS: (bookingId) => `/booking/${bookingId}`,
	GET_LIST_BOOKINGS: "/booking/list",
	BOOK_NOW: "/booking/book-now",
	CHECKOUT_REVIEW: "/checkout/review",
	CREATE_BOOKING: "/booking",
	GET_VNPAY_URL: (bookingId, method = "vnpay") =>
		`/checkout/re-pay/${bookingId}/${method}`,
};

const DISCOUNT_ENDPOINTS = {
	GET_DISCOUNT_AMOUNT: "/discounts/amount",
};

const REVIEW_ENDPOINTS = {
	CREATE_REVIEW: "/reviews",
	GET_REVIEWS_IN_TOUR: (tourId) => `/reviews/tour/${tourId}`,
};

const NOTIFICATION_ENDPOINTS = {
	SUBCRIBE_TO_TOPIC: "/notifications/subscribe-topic",
	REGISTER_DEVICE: "/notifications/register-device",
	GET_NOTIFICATIONS_BY_USER: (userId) => `/notifications/${userId}`,
};

export {
	AUTH_ENDPOINTS,
	BASE_URL,
	BOOKING_ENDPOINTS,
	CART_ENDPOINTS,
	CATEGORY_ENDPOINTS,
	DISCOUNT_ENDPOINTS,
	NOTIFICATION_ENDPOINTS,
	REVIEW_ENDPOINTS,
	SEARCH_ENDPOINTS,
	TOUR_ENDPOINTS,
};
