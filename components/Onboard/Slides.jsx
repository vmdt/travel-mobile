import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, View } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import ReusableBtn from "../Buttons/ReusableBtn";
import HeightSpacer from "../Reusable/HeightSpacer";
import ReusableText from "../Reusable/ReusableText";
import styles from "./slides.style";

const Slides = ({ item }) => {
	const navigation = useNavigation();
	return (
		<View>
			<Image source={item.image} style={styles.image} />
			<View style={styles.stack}>
				<ReusableText
					text={item.title}
					family={"medium"}
					size={SIZES.xxLarge}
					color={COLORS.white}
				/>
				<HeightSpacer height={30} />
				<ReusableBtn
					onPress={() => {
						navigation.navigate("Login");
					}}
					btnText={"Let's go"}
					textColor={COLORS.white}
					btnWidth={(SIZES.width - 50) / 2.2}
					backgroundColor={COLORS.lightGreen}
					borderColor={COLORS.lightGreen}
					borderWidth={0}
				/>
			</View>
		</View>
	);
};

export default Slides;
