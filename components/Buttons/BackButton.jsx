import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const BackButton = ({ size, onPress, customStyle }) => {
	return (
		<Pressable onPress={onPress} style={[styles.button, customStyle]}>
			<Ionicons name="chevron-back" size={size} color={COLORS.black} />
		</Pressable>
	);
};

export default BackButton;

const styles = StyleSheet.create({
	button: {
		padding: 5,
		alignSelf: "flex-start",
		borderRadius: SIZES.small,
		backgroundColor: COLORS.lightGrey,
	},
});
