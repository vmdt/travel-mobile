import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: SIZES.medium,
		paddingHorizontal: SIZES.large - 5,
		paddingBottom: 150,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// gap: 15,
	},
	headerContent: {
		alignItems: "center",
		flexDirection: "row",
		gap: 15,
	},
	notificationIcon: {
		alignSelf: "flex-end",
		backgroundColor: COLORS.lightWhite,
		padding: 10,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	body: {
		paddingTop: 20,
	},
	searchSectionWrapper: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 20,
		gap: 15,
	},
	filterBtn: {
		backgroundColor: COLORS.lightGreen,
		padding: 12,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	badge: {
		position: "absolute",
		right: -5,
		top: -5,
		backgroundColor: COLORS.red,
		borderRadius: 10,
		width: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	badgeText: {
		color: COLORS.white,
		fontSize: 12,
		fontWeight: "bold",
	},
	redDot: {
		position: "absolute",
		right: 0,
		top: 0,
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "red",
	},
});

export default styles;
