import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AVATAR_DEFAULT, COLORS } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";

const SearchCard = ({ item }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("TourDetail", { item });
			}}
		>
			<View style={styles.item}>
				<Image
					source={{ uri: item?.thumbnail || AVATAR_DEFAULT }}
					style={styles.image}
				/>
				<View style={{ flexShrink: 1, gap: 10 }}>
					<ReusableText
						text={item?.title}
						family="medium"
						size={20}
						numberOfLines={2}
						ellipsizeMode="tail"
					/>

					{item?.summary && (
						<ReusableText
							text={item?.summary}
							family="regular"
							size={14}
							numberOfLines={2}
						/>
					)}

					{item?.type == "city" ? (
						<View
							style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
						>
							<MaterialIcons
								name="location-city"
								size={16}
								color={COLORS.green}
							/>
							<ReusableText
								text={"City"}
								family="regular"
								size={14}
								color={COLORS.green}
							/>
						</View>
					) : (
						<View
							style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
						>
							<FontAwesome5
								name="map-marker-alt"
								size={16}
								color={COLORS.green}
							/>
							<ReusableText
								text={item?.startLocation?.description || "Activity"}
								family="regular"
								size={14}
								color={COLORS.green}
							/>
						</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

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
	image: {
		width: 130,
		height: "100%",
		borderRadius: 10,
		resizeMode: "cover",
	},
});

export default SearchCard;
