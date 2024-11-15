import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { formatCurrency } from "../../utils";
import ReusableText from "../Reusable/ReusableText";

const BookingCard = ({ item }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("BookingDetails", { bookingId: item?._id });
			}}
		>
			<View style={styles.item}>
				<View
					style={{
						padding: 10,
						alignSelf: "flex-start",
					}}
				>
					<View
						style={{
							gap: 10,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								width: "100%",
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignContent: "start",
									alignItems: "center",
									gap: 10,
								}}
							>
								<Ionicons name="barcode" size={18} color={COLORS.green} />
								<ReusableText
									text={item?._id.substring(0, 10)}
									family="medium"
									size={16}
									color={COLORS.black}
								/>
							</View>

							<View
								style={{
									backgroundColor:
										item?.status === "completed" ? COLORS.green : COLORS.red,
									padding: 5,
									paddingHorizontal: 10,
									borderRadius: 20,
								}}
							>
								<ReusableText
									text={item?.status}
									family="medium"
									size={14}
									color={COLORS.white}
								/>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignContent: "start",
								alignItems: "center",
								gap: 10,
							}}
						>
							<FontAwesome5 name="phone" size={18} color={COLORS.green} />
							<ReusableText
								text={item?.personalInfo?.phone}
								family="medium"
								size={16}
								color={COLORS.black}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignContent: "start",
								alignItems: "center",
								gap: 10,
							}}
						>
							<MaterialIcons name="email" size={18} color={COLORS.green} />
							<ReusableText
								text={item?.personalInfo?.email}
								family="medium"
								size={16}
								color={COLORS.black}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								width: "100%",
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignContent: "start",
									alignItems: "center",
									gap: 10,
								}}
							>
								<FontAwesome5
									name="money-check-alt"
									size={16}
									color={COLORS.lightGreen}
								/>
								<ReusableText
									text={formatCurrency(item?.checkoutOrder?.totalPrice)}
									family="medium"
									size={16}
									color={COLORS.lightGreen}
								/>
							</View>

							<View
								style={{
									flexDirection: "row",
									alignContent: "start",
									alignItems: "center",
									gap: 10,
								}}
							>
								<MaterialIcons
									name="payment"
									size={16}
									color={item?.payment?.bankCode ? COLORS.green : COLORS.gray}
								/>
								<ReusableText
									text={item?.payment?.bankCode ?? "Unknown"}
									family="medium"
									size={16}
									color={item?.payment?.bankCode ? COLORS.black : COLORS.gray}
								/>
							</View>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default BookingCard;

const styles = StyleSheet.create({
	item: {
		height: 150,
		width: "100%",
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 10,
		overflow: "hidden",
		// marginBottom: 20,
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},
});
