import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	detailsContainer: {
		padding: 20,
		backgroundColor: COLORS.white,
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
	buttonCheckAvail: {
		position: "absolute",
		bottom: 20,
		left: 0,
		right: 0,
		backgroundColor: COLORS.white,
		padding: 20,
		borderTopWidth: 1,
		borderTopColor: COLORS.gray,
	},
});

export default styles;
