import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { COLORS } from "../../constants/theme";
import { getListCart, updateCartItem } from "../../redux/actions/cartAction";

const UpdateCartItem = ({
	isVisible,
	onClose,
	selectedTourData,
	editingItem,
	cartId,
	accessToken,
}) => {
	const dispatch = useDispatch();
	const [selectedParticipants, setSelectedParticipants] = useState([]);

	useEffect(() => {
		if (editingItem) {
			console.log("Editing item:", editingItem);
			setSelectedParticipants(editingItem.participants);
		}
	}, [editingItem]);

	const handleUpdateCart = async () => {
		try {
			await dispatch(
				updateCartItem(
					{
						cartId,
						itemId: editingItem._id,
						participants: selectedParticipants,
						startDate: editingItem.startDate,
					},
					accessToken,
				),
			);

			dispatch(getListCart(accessToken));
			onClose();
		} catch (error) {
			console.error("Error updating cart:", error);
		}
	};

	return (
		<Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
			<View style={styles.modalContent}>
				<Text style={styles.modalTitle}>Edit Booking Details</Text>

				{/* Participant Selection */}
				<View style={styles.participantSection}>
					<Text style={styles.sectionTitle}>Participants</Text>
					{selectedTourData?.ticketTypes?.map((ticket) => (
						<View key={ticket._id} style={styles.participantRow}>
							<View style={styles.ticketInfo}>
								<Text style={styles.ticketTitle}>{ticket.title}</Text>
								<Text style={styles.ticketPrice}>
									{ticket.price.toLocaleString()} VND
								</Text>
							</View>
							<View style={styles.quantityControl}>
								<TouchableOpacity
									style={styles.quantityButton}
									onPress={() => {
										setSelectedParticipants((prev) => {
											const existing = prev.find(
												(p) => p.title === ticket.title,
											);
											if (!existing) return prev;
											const newQty = Math.max(0, existing.quantity - 1);
											return prev.map((p) =>
												p.title === ticket.title
													? { ...p, quantity: newQty }
													: p,
											);
										});
									}}
								>
									<Text style={styles.quantityButtonText}>-</Text>
								</TouchableOpacity>
								<Text style={styles.quantity}>
									{selectedParticipants.find((p) => p.title === ticket.title)
										?.quantity || 0}
								</Text>
								<TouchableOpacity
									style={styles.quantityButton}
									onPress={() => {
										setSelectedParticipants((prev) => {
											const existing = prev.find(
												(p) => p.title === ticket.title,
											);
											if (!existing) {
												return [
													...prev,
													{
														title: ticket.title,
														quantity: 1,
														price: ticket.price,
													},
												];
											}
											return prev.map((p) =>
												p.title === ticket.title
													? { ...p, quantity: p.quantity + 1 }
													: p,
											);
										});
									}}
								>
									<Text style={styles.quantityButtonText}>+</Text>
								</TouchableOpacity>
							</View>
						</View>
					))}
				</View>

				<View style={styles.totalSection}>
					<Text style={styles.totalLabel}>Total Price:</Text>
					<Text style={styles.totalPrice}>
						{selectedParticipants
							.reduce(
								(total, participant) =>
									total + participant.quantity * participant.price,
								0,
							)
							.toLocaleString()}{" "}
						VND
					</Text>
				</View>

				{/* Action Buttons */}
				<View style={styles.modalActions}>
					<TouchableOpacity
						style={[styles.actionButton, styles.cancelButton]}
						onPress={onClose}
					>
						<Text style={styles.buttonText}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.actionButton, styles.saveButton]}
						onPress={handleUpdateCart}
					>
						<Text style={styles.buttonText}>Save Changes</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		margin: 0,
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	participantSection: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
	},
	participantRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
		paddingVertical: 5,
	},
	ticketInfo: {
		flex: 1,
	},
	ticketTitle: {
		fontSize: 16,
		marginBottom: 4,
	},
	ticketPrice: {
		color: COLORS.gray,
		fontSize: 14,
	},
	quantityControl: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.lightGray,
		borderRadius: 25,
		paddingHorizontal: 10,
	},
	quantityButton: {
		width: 30,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	quantityButtonText: {
		fontSize: 20,
		color: COLORS.gray,
	},
	quantity: {
		fontSize: 16,
		marginHorizontal: 15,
		minWidth: 20,
		textAlign: "center",
	},
	totalSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
		paddingTop: 10,
		borderTopWidth: 1,
		borderTopColor: COLORS.lightGray,
	},
	totalLabel: {
		fontSize: 16,
		fontWeight: "bold",
	},
	totalPrice: {
		fontSize: 18,
		fontWeight: "bold",
		color: COLORS.green,
	},
	modalActions: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
	},
	actionButton: {
		flex: 1,
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
	},
	cancelButton: {
		backgroundColor: COLORS.gray,
	},
	saveButton: {
		backgroundColor: COLORS.green,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default UpdateCartItem;
