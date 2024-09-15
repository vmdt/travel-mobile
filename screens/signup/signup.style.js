import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/theme";

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
	footer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
	},
});

export default styles;
