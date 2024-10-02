import { AuthAPI } from "../../api";
import { UPDATE_USER_LOGIN, UPDATE_USER_SIGNUP } from "../constants";

export const updateUserLogin = (user, isLoggedIn, accessToken) => {
	return {
		type: UPDATE_USER_LOGIN,
		user,
		isLoggedIn,
		accessToken,
	};
};

export const updateUserSignup = (user, isLoggedIn, accessToken) => {
	return {
		type: UPDATE_USER_SIGNUP,
		user,
		isLoggedIn,
		accessToken,
	};
};

export const updateUserLogout = () => {
	return {
		type: UPDATE_USER_LOGIN,
		user: null,
		isLoggedIn: false,
	};
};

export const updateUserProfile = (userId, userData, token) => {
	return async (dispatch) => {
		try {
			const response = await AuthAPI.updateUser(userId, userData, token);
			dispatch({
				type: UPDATE_USER_LOGIN,
				user: response.metadata.user,
				isLoggedIn: true,
				accessToken: token,
			});
		} catch (error) {
			// TODO: handle error
		}
	};
};
