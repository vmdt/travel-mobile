import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
	container: {
		// padding: 20,
		flex: 1,
	},
	imageContainer: {
		padding: 20,
	},
	detailsContainer: {
		padding: 20,
		flex: 1,
		// backgroundColor: COLORS.white,
		// width: SIZES.width,
		width: "auto",
	},
	title: {
		fontSize: SIZES.large,
		fontWeight: "bold",
		color: COLORS.black,
		marginVertical: 10,
	},
	description: {
		fontSize: SIZES.medium,
		color: COLORS.gray,
		marginBottom: 20,
	},
	heading: {
		fontSize: SIZES.medium,
		fontWeight: "bold",
		color: COLORS.black,
		marginVertical: 10,
	},
	listItem: {
		fontSize: SIZES.small,
		color: COLORS.gray,
		marginVertical: 2,
	},
	button: {
		backgroundColor: COLORS.primary,
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		marginVertical: 20,
	},
	buttonText: {
		fontSize: SIZES.medium,
		color: COLORS.white,
		fontWeight: "bold",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderTopWidth: 1,
		borderColor: "#ddd",
		paddingBottom: 20,
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 16,
	},
	selectAllContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	selectAllText: {
		marginLeft: 8,
	},
	checkoutButton: {
		backgroundColor: "red",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	checkoutText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	body: {
		flex: 1,
		width: SIZES.width,
		// paddingTop: 20,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	tabBarStyle: {
		backgroundColor: COLORS.white,
		borderBlockEndColor: 30,
		width: SIZES.width - 40,
	},
	tabBarIndicatorStyle: {
		backgroundColor: COLORS.lightGreen,
	},
});

export default styles;
