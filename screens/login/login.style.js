import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 45,
		paddingHorizontal: SIZES.large + 5,
		paddingVertical: SIZES.medium,
	},
	form: {
		justifyContent: "space-between",
		gap: 30,
	},
	forgotPassword: {
		textAlign: "right",
		marginTop: -20,
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
	},
	googleIcon: {
		width: 24,
		height: 24,
		marginRight: 10,
	},
	googleBtn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
		backgroundColor: "rgba(128, 128, 128, 0.1)",
		padding: 10,
		borderRadius: SIZES.small,
		borderWidth: 0.5,
		borderColor: COLORS.gray,
		width: SIZES.width / 2,
		alignSelf: "center",
	},
	errorText: {
		marginTop: 0,
		marginLeft: 10,
	},
});

export default styles;
