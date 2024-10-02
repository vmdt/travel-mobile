import {
	UPDATE_ONBOARDING_STATUS,
	UPDATE_USER_LOGIN,
	UPDATE_USER_LOGOUT,
	UPDATE_USER_PROFILE,
	UPDATE_USER_SIGNUP,
} from "../constants";

const initalState = {
	isOnboardingDisabled: false,
};

const authReducer = (state = initalState, action) => {
	const { type, status, user, isLoggedIn, accessToken } = action;

	switch (type) {
		case UPDATE_ONBOARDING_STATUS:
			return {
				...state,
				isOnboardingDisabled: status,
			};
		case UPDATE_USER_LOGIN:
			return {
				...state,
				user,
				isLoggedIn,
				accessToken,
			};
		case UPDATE_USER_SIGNUP:
			return {
				...state,
				user,
				isLoggedIn,
				accessToken,
			};
		case UPDATE_USER_LOGOUT:
			return {
				...state,
				user: null,
				isLoggedIn: false,
				accessToken: null,
			};
		case UPDATE_USER_PROFILE:
			return {
				...state,
				user,
				isLoggedIn: true,
				accessToken,
			};
		default:
			return state;
	}
};

export default authReducer;
