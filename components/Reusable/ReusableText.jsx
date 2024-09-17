import React from "react";
import { StyleSheet, Text } from "react-native";

const ReusableText = ({ text, family, size, color, style, ...props }) => {
	return (
		<Text style={[styles.textStyle(family, size, color), style]} {...props}>
			{text}
		</Text>
	);
};

export default ReusableText;

const styles = StyleSheet.create({
	textStyle: (family, size, color) => ({
		fontFamily: family,
		fontSize: size,
		color: color,
	}),
});
