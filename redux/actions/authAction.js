import { UPDATE_USER_LOGIN, UPDATE_USER_SIGNUP } from "../constants";

export const updateUserLogin = (user, isLoggedIn) => {
	return {
		type: UPDATE_USER_LOGIN,
		user,
		isLoggedIn,
	};
};

export const updateUserSignup = (user, isLoggedIn) => {
	return {
		type: UPDATE_USER_SIGNUP,
		user,
		isLoggedIn,
	};
};
