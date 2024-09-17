import React from "react";
import { Image, StyleSheet, View } from "react-native";

const Avatar = ({ source, imageStyle }) => {
	return (
		<View style={styles.shadowContainer}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: source }} style={[styles.image, imageStyle]} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 30,
		height: 30,
		borderRadius: 99,
		resizeMode: "cover",
	},
	imageContainer: {
		borderRadius: 99,
		overflow: "hidden",
	},
	shadowContainer: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
		borderRadius: 99,
	},
});

export default Avatar;
