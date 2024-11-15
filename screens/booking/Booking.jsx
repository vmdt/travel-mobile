import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { BookingAPI } from "../../api";
import { BookingCard } from "../../components";
import { SIZES } from "../../constants/theme";

const Booking = () => {
	const isFocused = useIsFocused();
	const [items, setItems] = useState([]);
	const { accessToken } = useSelector((state) => state.auth);

	useEffect(() => {
		const fetchBookings = async () => {
			const response = await BookingAPI.getListBookings(accessToken);
			setItems(response?.metadata?.bookings);
		};

		if (isFocused) fetchBookings();
	}, [isFocused]);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={{ gap: 20 }}>
				{items.map((item, index) => (
					<BookingCard key={index} item={item} />
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: SIZES.large + 5,
		paddingVertical: SIZES.medium,
		paddingBottom: 110,
	},
});

export default Booking;
