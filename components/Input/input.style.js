import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: SIZES.large,
        borderCurve: 'continuous',
        paddingHorizontal: SIZES.medium,
        alignItems: 'center',
        gap: SIZES.small,
    }
});

export default styles
