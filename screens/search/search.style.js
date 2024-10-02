import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: SIZES.medium,
		paddingHorizontal: SIZES.large - 5,
		// paddingBottom: 150,
		paddingTop: 15,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		position: "absolute",
		top: 5,
		left: 0,
		right: 0,
		paddingBottom: 10,
		paddingRight: 20,
		paddingLeft: 20,
		zIndex: 1,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		gap: 15,
		backgroundColor: COLORS.white,
	},
	scrollContent: {
		paddingTop: 60,
		paddingHorizontal: 10,
	},
	text: {
		marginVertical: 20,
		fontSize: 16,
	},
	noResult: {
		flex: 1,
		paddingTop: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		marginTop: 20,
	},
});

export default styles;
