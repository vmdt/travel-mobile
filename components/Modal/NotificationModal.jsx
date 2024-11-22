import React, { useEffect, useState } from "react";
import {
	Modal,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { useSelector } from "react-redux";
import { NotificationAPI } from "../../api";
import { COLORS, SIZES } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";

const NotificationModal = ({ visible, onClose }) => {
	const [notifications, setNotifications] = useState([]);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		const fetchNotifications = async () => {
			const response = await NotificationAPI.getNotificationsByUser(user?._id);
			const notis = response?.metadata?.notifications.map((noti) => {
				return {
					_id: noti._id,
					title: noti.title,
					message:
						noti?.type == "discount"
							? `Code: ${JSON.parse(noti?.message?.discount)?.code}`
							: "No message",
				};
			});

			setNotifications(notis);
		};

		fetchNotifications();
	});

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalBackGround}>
				<View style={styles.modalContainer}>
					<TouchableOpacity
						style={{ position: "absolute", top: 10, right: 20 }}
						onPress={onClose}
					>
						<ReusableText text="✖" size={SIZES.large} />
					</TouchableOpacity>

					<ScrollView
						style={{ marginTop: 20, height: 300 }}
						showsVerticalScrollIndicator={false}
					>
						{notifications?.map((notification) => {
							return (
								<View key={notification._id} style={styles.item}>
									<View style={{ flex: 1, flexDirection: "column" }}>
										<ReusableText
											text={notification.title}
											size={SIZES.large}
											family="bold"
										/>
										<ReusableText
											text={notification.message}
											size={SIZES.medium}
											family="medium"
											color={COLORS.green}
										/>
									</View>
								</View>
							);
						})}
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};

export default NotificationModal;

const styles = StyleSheet.create({
	modalBackGround: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContainer: {
		width: "80%",
		backgroundColor: COLORS.lightWhite,
		paddingHorizontal: 20,
		paddingVertical: 30,
		borderRadius: 20,
		elevation: 20,
	},
	item: {
		height: 100,
		width: "100%",
		backgroundColor: COLORS.lightGrey,
		padding: 10,
		borderRadius: 10,
		marginRight: 20,
		overflow: "hidden",
		gap: 5,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
});
