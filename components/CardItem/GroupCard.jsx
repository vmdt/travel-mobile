import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";

const GroupCard = ({ item }) => {
	return (
		<TouchableOpacity>
			<View style={styles.item}>
				<Image source={{ uri: item?.image }} style={styles.image} />
				<View>
					<ReusableText text={item?.name} family="medium" size={16} />
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Ionicons name="star" size={16} color={COLORS.green} />
						<ReusableText
							text={item?.rating}
							family="regular"
							size={14}
							color={COLORS.green}
						/>
						<ReusableText
							text={` (${item?.reviews ?? 0})`}
							family="regular"
							size={14}
							color={COLORS.black}
						/>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: "100%",
		borderRadius: 10,
		resizeMode: "cover",
	},
	item: {
		height: 100,
		width: 290,
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 10,
		marginRight: 20,
		overflow: "hidden",
		gap: 5,
		flexDirection: "row",
		alignItems: "center",
	},
});

export default GroupCard;
