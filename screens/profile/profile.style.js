import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		paddingHorizontal: SIZES.large + 5,
		paddingVertical: SIZES.medium,
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 99,
		resizeMode: "cover",
	},
});

export default styles;
