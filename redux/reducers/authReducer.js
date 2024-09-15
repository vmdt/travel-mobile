import {
	UPDATE_ONBOARDING_STATUS,
	UPDATE_USER_LOGIN,
	UPDATE_USER_SIGNUP,
} from "../constants";

const initalState = {
	isOnboardingDisabled: false,
};

const authReducer = (state = initalState, action) => {
	const { type, status, user, isLoggedIn } = action;

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
			};
		case UPDATE_USER_SIGNUP:
			return {
				...state,
				user,
				isLoggedIn,
			};
		default:
			return state;
	}
};

export default authReducer;
