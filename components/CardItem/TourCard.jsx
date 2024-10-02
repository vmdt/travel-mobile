import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";

const TourCard = ({ item }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("TourDetail", { item });
			}}
		>
			<View style={styles.item}>
				<Image source={{ uri: item?.thumbnail }} style={styles.image} />
				<View style={styles.bookmark}>
					<Ionicons name="bookmark-outline" size={24} color={COLORS.white} />
				</View>
				<ReusableText
					text={item?.title}
					family="medium"
					size={16}
					numberOfLines={1}
					ellipsizeMode="tail"
				/>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<View
						style={{ flexDirection: "row", alignContent: "center", gap: 5 }}
					>
						<FontAwesome5
							name="map-marker-alt"
							size={16}
							color={COLORS.green}
						/>
						<ReusableText
							text={item?.startLocation?.description || "Unknown"}
							family="regular"
							size={14}
							numberOfLines={1}
							ellipsizeMode="tail"
						/>
					</View>
					<ReusableText
						text={`$${item?.regularPrice}`}
						family="medium"
						size={16}
						color={COLORS.green}
					/>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	image: {
		height: 200,
		borderRadius: 10,
		resizeMode: "cover",
		marginBottom: 20,
	},
	item: {
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 10,
		marginRight: 20,
		width: 250,
		overflow: "hidden",
		gap: 5,
	},
	bookmark: {
		position: "absolute",
		top: 185,
		right: 30,
		backgroundColor: COLORS.lightGreen,
		padding: 10,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: COLORS.white,
	},
});

export default TourCard;
