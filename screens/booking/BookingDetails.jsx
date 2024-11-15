import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { BookingAPI } from "../../api";
import {
	BackButton,
	BookingCard,
	OrderCard,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";

const BookingDetails = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [bookingDetails, setBookingDetails] = useState(null);
	const { accessToken } = useSelector((state) => state.auth);
	const { bookingId } = route.params;

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
				<BackButton size={SIZES.xLarge} onPress={() => navigation.goBack()} />
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
					<View style={{ marginTop: 10, marginBottom: 20, gap: 20 }}>
						{bookingDetails?.bookingItems?.map((item, index) => {
							return (
								<OrderCard item={item} key={index} review={item?.ticketCode} />
							);
						})}
					</View>
				</ScrollView>
			</View>
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
