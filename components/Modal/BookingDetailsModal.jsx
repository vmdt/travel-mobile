import React from "react";
import { StyleSheet, View } from "react-native";
import { Modal } from "react-native-paper";
import { COLORS } from "../../constants/theme";

const BookingDetailsModal = ({ visible, onClose, bookingDetails }) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalBackGround}>
				<View style={styles.modalContainer}></View>
			</View>
		</Modal>
	);
};

export default BookingDetailsModal;

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
});
