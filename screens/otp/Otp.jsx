import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Image,
	Keyboard,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { OtpInput } from "react-native-otp-entry";
import {
	BackButton,
	ReusableBtn,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";

const OTPVerification = () => {
	const navigation = useNavigation();

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ScreenWrapper>
				<KeyboardAwareScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps="handled"
				>
					<View style={styles.container}>
						<BackButton
							size={SIZES.xLarge}
							onPress={() => navigation.goBack()}
						/>
						<Image
							source={require("../../assets/images/theme-1.png")}
							resizeMode="contain"
							style={{
								width: SIZES.width * 0.8,
								height: SIZES.width * 0.8,
								marginBottom: 16,
							}}
						/>

						<View style={styles.textContent}>
							<ReusableText
								text="Enter Verification Code"
								size={SIZES.xLarge}
								family="xtrabold"
							/>

							<ReusableText
								text="We have sent a verification code to your email address"
								size={SIZES.large}
								family="medium"
								style={{ textAlign: "center" }}
							/>
						</View>

						<View style={{ marginTop: 30 }}>
							<OtpInput
								numberOfDigits={6}
								onTextChange={(text) => console.log(text)}
								focusColor={COLORS.lightGreen}
								focusStickBlinkingDuration={400}
								theme={{
									pinCodeContainerStyle: {
										backgroundColor: COLORS.lightWhite,
										width: 50,
										height: 60,
										borderRadius: 15,
									},
								}}
							/>
						</View>

						<View
							style={{
								marginTop: 20,
								flexDirection: "row",
								alignItems: "center",
								gap: 5,
							}}
						>
							<ReusableText
								text="Didn't receive the code?"
								size={SIZES.medium}
								family="medium"
							/>
							<TouchableOpacity onPress={() => {}}>
								<ReusableText
									text="Resend"
									size={SIZES.medium}
									family="medium"
									color={COLORS.lightGreen}
								/>
							</TouchableOpacity>
						</View>

						<ReusableBtn
							onPress={() => {
								navigation.navigate("BottomTab");
							}}
							btnText="Verify"
							btnWidth="80%"
							backgroundColor={COLORS.lightGreen}
							textColor={COLORS.white}
							styleBtn={{ height: 60, marginTop: 30 }}
							styleText={{
								fontSize: SIZES.xLarge,
								fontFamily: "xtrabold",
							}}
						/>
					</View>
				</KeyboardAwareScrollView>
			</ScreenWrapper>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: SIZES.large + 5,
		paddingVertical: SIZES.medium,
		alignItems: "center",
	},
	textContent: {
		marginTop: 30,
		alignItems: "center",
		gap: 20,
	},
});

export default OTPVerification;
