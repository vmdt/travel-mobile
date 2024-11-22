import { NOTIFICATION_ENDPOINTS } from "../../constants/api";
import api from "../axios";

export const subscribeToTopic = async (topic, deviceToken) => {
	try {
		const response = await api.post(NOTIFICATION_ENDPOINTS.SUBCRIBE_TO_TOPIC, {
			topic,
			deviceTokens: [deviceToken],
		});

		return response.data;
	} catch (error) {
		// TODO: Handle error
		return error.response.data;
	}
};

export const registerDevice = async (userId, deviceToken) => {
	try {
		const response = await api.post(NOTIFICATION_ENDPOINTS.REGISTER_DEVICE, {
			userId,
			deviceToken,
		});

		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getNotificationsByUser = async (userId) => {
	try {
		const response = await api.get(
			NOTIFICATION_ENDPOINTS.GET_NOTIFICATIONS_BY_USER(userId),
		);

		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
