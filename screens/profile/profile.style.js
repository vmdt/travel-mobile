import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

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
	tabBarStyle: {
		backgroundColor: COLORS.white,
		borderBlockEndColor: 30,
	},
	tabBarIndicatorStyle: {
		backgroundColor: COLORS.lightGreen,
	}
});

export default styles;
