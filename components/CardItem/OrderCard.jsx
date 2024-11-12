import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Icon from "../../assets/icons";
import { COLORS, SIZES } from "../../constants/theme";
import { formatCurrency, formatDate } from "../../utils";
import ReusableText from "../Reusable/ReusableText";

const OrderCard = ({ item }) => {
	return (
		<View style={styles.item}>
			<Image source={{ uri: item?.tour?.thumbnail }} style={styles.image} />
			<ReusableText
				text={item?.tour?.title}
				family="bold"
				size={SIZES.medium + 4}
				numberOfLines={2}
				ellipsizeMode="tail"
			/>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignContent: "center",
						alignItems: "center",
						gap: 10,
					}}
				>
					<Icon name="dolar" size={SIZES.medium + 4} color={COLORS.green} />
					<ReusableText
						text={formatCurrency(
							item?.participants.reduce(
								(acc, part) => acc + part?.quantity * part?.price,
								0,
							),
						)}
						family={"medium"}
						size={SIZES.medium + 4}
						color={COLORS.green}
					/>
				</View>
			</View>

			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View
					style={{
						flexDirection: "row",
						alignContent: "center",
						alignItems: "center",
						gap: 10,
					}}
				>
					<MaterialIcons name="date-range" size={18} color={COLORS.green} />
					<ReusableText
						text={formatDate(item?.startDate)}
						family={"medium"}
						size={18}
					/>
				</View>
			</View>

			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View
					style={{
						flexDirection: "row",
						alignContent: "center",
						alignItems: "center",
						gap: 10,
					}}
				>
					<FontAwesome6 name="people-pulling" size={18} color={COLORS.green} />
					<ReusableText
						text={item?.participants.map((part) => {
							return `${part?.title} x${part?.quantity}  `;
						})}
						family={"medium"}
						size={18}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	item: {
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 10,
		// width: SIZES.width - 30,
		overflow: "hidden",
		gap: 10,
	},
	image: {
		height: 200,
		borderRadius: 10,
		resizeMode: "cover",
		marginBottom: 10,
	},
});

export default OrderCard;
