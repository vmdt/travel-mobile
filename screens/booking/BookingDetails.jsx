import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { BookingAPI, ReviewAPI } from "../../api";
import {
	BackButton,
	BookingCard,
	OrderCard,
	ReusableBtn,
	ReusableText,
	ReviewModal,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";

const BookingDetails = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [bookingDetails, setBookingDetails] = useState(null);
	const [visible, setVisible] = useState(false);
	const { bookingId } = route.params;
	const { user, accessToken } = useSelector((state) => state.auth);
	const [tour, setTour] = useState(null);

	handleSubmitReview = async (rating, content) => {
		const response = await ReviewAPI.createReview(
			{
				user: user?._id,
				tour: tour,
				rating: rating,
				content: content,
			},
			accessToken,
		);
		setVisible(false);
		Toast.show({
			type: "success",
			text1: "Review submitted successfully",
			text2: "This review will be approved soon",
		});
	};

	const handleReview = (tourId) => {
		setTour(tourId);
		setVisible(true);
	};

	useEffect(() => {
		const fetchBookingDetails = async () => {
			const response = await BookingAPI.getBookingDetails(
				bookingId,
				accessToken,
			);
			setBookingDetails(response?.metadata);
		};
		fetchBookingDetails();
	}, []);

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<BackButton
					size={SIZES.xLarge}
					onPress={() => navigation.navigate("Booking")}
				/>
				<View style={{ marginTop: 20, marginBottom: 20, gap: 20 }}>
					<View style={styles.pannel}>
						<ReusableText
							text="Booking Details"
							family="xtrabold"
							size={SIZES.xLarge}
							color={COLORS.black}
							style={{ textAlign: "center" }}
						/>

						<BookingCard item={bookingDetails} />
					</View>
				</View>
				<ScrollView>
					{bookingDetails?.status != "completed" ? (
						<View style={{ marginTop: 10, marginBottom: 20, gap: 20 }}>
							<ReusableText
								text="This booking is pending. Please repay to proceed."
								family={"medium"}
							/>
							<ReusableBtn
								btnText={"Repay"}
								backgroundColor={COLORS.lightGreen}
								textColor={COLORS.white}
								onPress={async () => {
									const payRes = await BookingAPI.getVNPayUrl(
										bookingDetails?._id,
										accessToken,
									);

									const { paymentURL } = payRes?.metadata;
									Linking.openURL(paymentURL);
									navigation.navigate("Home");
								}}
							/>
						</View>
					) : (
						<View style={{ marginTop: 10, marginBottom: 20, gap: 20 }}>
							{bookingDetails?.bookingItems?.map((item, index) => {
								return (
									<OrderCard
										item={item}
										key={index}
										review={item?.ticketCode}
										handleReview={handleReview}
									/>
								);
							})}
						</View>
					)}
				</ScrollView>
			</View>
			<ReviewModal
				visible={visible}
				onClose={() => setVisible(false)}
				handleSubmitReview={handleSubmitReview}
			/>
		</ScreenWrapper>
	);
};

export default BookingDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: SIZES.medium,
		paddingHorizontal: SIZES.large - 5,
		// paddingBottom: 150,
		paddingTop: 15,
	},
	pannel: {
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 10,
	},
});
