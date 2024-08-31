import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    image: {
        resizeMode: 'cover',
        width: SIZES.width,
        height: SIZES.height,
    },
    stack: {
        position: 'absolute',
        bottom: 0,
        marginHorizontal: 30,
        marginVertical: 50,
    }
});

export default styles