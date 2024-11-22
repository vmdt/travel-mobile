import messaging from "@react-native-firebase/messaging";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import { useSelector } from "react-redux";
import { NotificationAPI } from "../api";
import { BASE_URL } from "../constants/api";
import AppStack from "./AppStack";

const RootNavigation = () => {
	const { user } = useSelector((state) => state.auth);

	const setUrlConfig = () => {
		axios.defaults.baseURL = BASE_URL;
	};

	useEffect(() => {
		setUrlConfig();
	}, []);

	PushNotification.configure({
		onNotification: function (notification) {
			console.log("LOCAL NOTIFICATION ==>", notification);
		},
		popInitialNotification: true,
		requestPermissions: Platform.OS === "ios",
	});

	PushNotification.createChannel(
		{
			channelId: "default-channel-id", // ID của kênh
			channelName: "Default Channel", // Tên hiển thị
			channelDescription: "A default channel for notifications", // Mô tả
			importance: 4, // Mức độ quan trọng
			vibrate: true, // Có rung khi nhận thông báo
		},
		(created) => console.log(`Channel created: ${created}`), // Xác nhận tạo kênh
	);

	const requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			console.log("Authorization status:", authStatus);
		}

		return enabled;
	};

	useEffect(() => {
		// Request user permission and get token
		const requestPermission = async () => {
			const enabled = await requestUserPermission();
			if (enabled) {
				messaging()
					.getToken()
					.then(async (token) => {
						console.log("Token: ", token);
						const response = await NotificationAPI.registerDevice(
							user._id,
							token,
						);
						console.log("Subscribe to topic response: ", response);
					})
					.catch((error) => {
						console.log("Error: ", error);
					});
			}
		};

		requestPermission();
	}, []);

	return (
		<NavigationContainer>
			<AppStack />
		</NavigationContainer>
	);
};

export default RootNavigation;
