import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	Modal,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { COLORS } from "../../constants/theme";
import CloseButton from "../Buttons/CloseButton";
import MenuItem from "../Common/MenuItem";
import ReusableText from "../Reusable/ReusableText";

const screenWidth = Dimensions.get("window").width;

export function formatCurrency(amount, currency = "VND") {
	const amountString = amount.toString();
	const amountArray = amountString.split("");
	const reversedArray = amountArray.reverse();
	let resultArray = [];
	for (let i = 0; i < reversedArray.length; i++) {
		if (i > 0 && i % 3 === 0) {
			resultArray.push(".");
		}
		resultArray.push(reversedArray[i]);
	}

	const formattedAmount = resultArray.reverse().join("");
	return formattedAmount + ` ${currency}`;
}

const CheckAvailabilityModal = ({
	isOpen,
	onClose,
	tourDetail,
	handleAddToCart,
	handleBookNow,
	isLoading = false,
	editingItem,
	handleUpdateItem,
}) => {
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [type, setType] = useState("");
	const [totalPrice, setTotalPrice] = useState(0);
	const [initialMount, setInitialMount] = useState(true);
	const [guestInfo, setGuestInfo] = useState([]);
	const [showDate, setShowDate] = useState([]);
	const [convertedDate, setConvertedDate] = useState("");
	const [selectedDate, setSelectedDate] = useState(null);
	const [isDropdownParticipantVisible, setIsDropdownParticipantVisible] =
		useState(false);
	const [isDropdownCalendarVisible, setIsDropdownCalendarVisible] =
		useState(false);

	const toggleDropdownParticipant = () =>
		setIsDropdownParticipantVisible(!isDropdownParticipantVisible);
	const toggleDropdownCalendar = () =>
		setIsDropdownCalendarVisible(!isDropdownCalendarVisible);

	useEffect(() => {
		if (editingItem) {
			setGuestInfo(editingItem?.participants);
			setSelectedDate(new Date(editingItem?.startDate));
		}
	}, [editingItem]);

	useEffect(() => {
		if (!initialMount) {
			const existingGuestIndex = guestInfo.findIndex(
				(obj) => obj.title === type,
			);
			if (existingGuestIndex !== -1) {
				const updatedGuestInfo = [...guestInfo];
				updatedGuestInfo[existingGuestIndex] = {
					...updatedGuestInfo[existingGuestIndex],
					quantity,
					price,
				};
				const filterGuest = updatedGuestInfo.filter(
					(obj) => obj.quantity !== 0 && !!obj.title,
				);
				setGuestInfo(filterGuest);
			} else {
				const newGuest = {
					title: type,
					quantity: quantity,
					price: price,
					currency: tourDetail?.priceOptions[0]?.currency ?? "VND",
				};
				setGuestInfo((prevGuestInfo) => [...prevGuestInfo, newGuest]);
			}
		} else {
			setInitialMount(false);
		}
	}, [type, quantity, price]);

	useEffect(() => {
		if (guestInfo.length === 0) {
			setTotalPrice(0);
			return;
		}
		let totalPrice = 0;

		guestInfo.forEach((guest) => {
			totalPrice += guest.price * guest.quantity;
		});
		setTotalPrice(totalPrice);
	}, [guestInfo]);

	useEffect(() => {
		if (!selectedDate) return;
		var date = new Date(selectedDate.toString());

		var formattedDate =
			date.getFullYear() +
			"-" +
			("0" + (date.getMonth() + 1)).slice(-2) +
			"-" +
			("0" + date.getDate()).slice(-2);

		const showDate = selectedDate.toString().split(" ").slice(0, 3);
		setShowDate(showDate);
		setConvertedDate(formattedDate.toString());
	}, [selectedDate]);

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isOpen}
			onClose={onClose}
		>
			<View style={styles.modalBackGround}>
				<ScrollView>
					<View style={styles.modalView}>
						<View style={styles.tourDetails}>
							<CloseButton
								onClose={onClose}
								styleText={{ textAlign: "right" }}
							/>
						</View>

						<View style={styles.vStack}>
							{/* Menu Button */}
							<TouchableOpacity
								style={styles.menuButton}
								onPress={toggleDropdownParticipant}
							>
								<View style={styles.hStack}>
									<View style={styles.innerHStack}>
										<Ionicons name="people" size={24} color={COLORS.black} />
										<ReusableText
											text="Select participant"
											size={18}
											family="bold"
										/>
									</View>
									<Ionicons
										name={
											isDropdownParticipantVisible
												? "chevron-up"
												: "chevron-down"
										}
										size={24}
										color={COLORS.black}
									/>
								</View>
							</TouchableOpacity>

							{isDropdownParticipantVisible && (
								<ScrollView contentContainerStyle={styles.menuList}>
									{tourDetail?.priceOptions &&
										tourDetail?.priceOptions.map((participant) => (
											<MenuItem
												key={participant?._id}
												type={participant?.title}
												price={participant?.value}
												currency={participant?.currency}
												quantity={() => {
													const existingGuest = guestInfo.find(
														(obj) => obj.title === participant?.title,
													);
													return existingGuest?.quantity ?? 0;
												}}
												setPrice={setPrice}
												setType={setType}
												setQuantity={setQuantity}
											/>
										))}
								</ScrollView>
							)}

							<TouchableOpacity
								style={styles.menuButton}
								onPress={toggleDropdownCalendar}
							>
								<View style={styles.hStack}>
									<View style={styles.innerHStack}>
										<Ionicons name="calendar" size={24} color={COLORS.black} />
										{showDate && (
											<ReusableText
												text={"Selected Date: " + showDate.toString()}
												size={18}
												family="bold"
											/>
										)}
									</View>
									<Ionicons
										name={
											isDropdownCalendarVisible ? "chevron-up" : "chevron-down"
										}
										size={24}
										color={COLORS.black}
									/>
								</View>
							</TouchableOpacity>

							{isDropdownCalendarVisible && (
								<View style={styles.calendarWrapper}>
									<CalendarPicker
										onDateChange={setSelectedDate}
										previousTitle="<"
										nextTitle=">"
										width={screenWidth * 0.8}
										selectedDayColor={COLORS.lightGreen}
										selectedDayTextColor={COLORS.white}
										textSyle={{
											fontSize: 14,
											color: COLORS.black,
										}}
										{...(selectedDate && {
											selectedStartDate: selectedDate,
											initialDate: selectedDate,
										})}
									/>
								</View>
							)}
						</View>

						<View style={styles.priceBreakdown}>
							<ReusableText
								text="Price breakdown"
								size={20}
								family={"xtrabold"}
							/>
							{guestInfo?.map((guest) => (
								<View key={guest.title} style={styles.priceRow}>
									<ReusableText
										text={
											guest.title +
											" " +
											guest.quantity +
											" x " +
											formatCurrency(guest.price, guest?.currency)
										}
										size={16}
										family={"regular"}
									/>
									<ReusableText
										text={
											guest?.price &&
											formatCurrency(
												guest?.price * guest?.quantity,
												guest?.currency,
											)
										}
										size={16}
										family={"regular"}
									/>
								</View>
							))}
						</View>

						<View style={styles.totalContainer}>
							<View style={{ gap: 10 }}>
								<ReusableText text="Total price" size={20} family="xtrabold" />
								<ReusableText
									text={
										totalPrice !== 0
											? `${formatCurrency(totalPrice, tourDetail?.priceOptions[0]?.currency)}`
											: `0 ${tourDetail?.priceOptions[0]?.currency}`
									}
									size={18}
									family="bold"
								/>
							</View>
						</View>
						<View style={styles.buttonContainer}>
							{editingItem ? (
								<>
									<TouchableOpacity
										style={styles.button}
										onPress={() => {
											handleUpdateItem({
												itemId: editingItem?._id,
												startDate: convertedDate,
												participants: guestInfo,
											});
										}}
										disabled={isLoading}
									>
										{isLoading ? (
											<ActivityIndicator color="#fff" />
										) : (
											<ReusableText
												text="Save changes"
												size={16}
												family="bold"
												color={COLORS.white}
											/>
										)}
									</TouchableOpacity>
								</>
							) : (
								<>
									<TouchableOpacity
										style={styles.button}
										onPress={() => {
											handleAddToCart({
												startDate: convertedDate,
												participants: guestInfo,
											});
										}}
										disabled={isLoading}
									>
										{isLoading ? (
											<ActivityIndicator color="#fff" />
										) : (
											<ReusableText
												text="Add to cart"
												size={16}
												family="bold"
												color={COLORS.white}
											/>
										)}
									</TouchableOpacity>

									<TouchableOpacity
										style={styles.button}
										onPress={() => {
											handleBookNow({
												startDate: convertedDate,
												participants: guestInfo,
											});
										}}
										disabled={isLoading}
									>
										{isLoading ? (
											<ActivityIndicator color="#fff" />
										) : (
											<ReusableText
												text="Book now"
												size={16}
												family="bold"
												color={COLORS.white}
											/>
										)}
									</TouchableOpacity>
								</>
							)}
						</View>
					</View>
				</ScrollView>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalBackGround: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.1)",
	},
	modalView: {
		margin: 20,
		backgroundColor: "#fff",
		borderRadius: 15,
		padding: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	closeBtn: {
		textAlign: "right",
		fontSize: 24,
	},
	tourDetails: {
		paddingBottom: 10,
		borderBottomWidth: 2,
		borderBottomColor: "#ccc",
	},
	tourTitle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	detailRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
	},
	detailText: {
		fontSize: 16,
		marginLeft: 10,
	},
	priceBreakdown: {
		marginTop: 16,
	},
	priceRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	guestInfo: {
		fontSize: 16,
	},
	totalContainer: {
		marginTop: 24,
		backgroundColor: "#EBEEF1",
		padding: 16,
		borderRadius: 15,
		alignItems: "left",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginTop: 10,
	},
	button: {
		backgroundColor: COLORS.lightGreen,
		borderRadius: 80,
		paddingVertical: 10,
		paddingHorizontal: 20,
		flex: 1,
		marginHorizontal: 5,
		alignItems: "center",
	},
	vStack: {
		padding: 10,
		width: "100%",
	},
	menuButton: {
		width: "100%",
		height: 40,
		backgroundColor: "#fff",
		borderRadius: 999,
		paddingHorizontal: 12,
		justifyContent: "center",
	},
	hStack: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	innerHStack: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	guestText: {
		fontWeight: "bold",
		fontSize: 16,
		marginLeft: 10,
	},
	menuList: {
		minWidth: 320,
		padding: 10,
	},
	calendarWrapper: {
		backgroundColor: "#fff",
		borderRadius: 10,
		elevation: 3,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		padding: 10,
		marginBottom: 20,
	},
});

export default CheckAvailabilityModal;
