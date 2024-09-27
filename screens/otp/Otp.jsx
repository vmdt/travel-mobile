import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusCodes } from "http-status-codes";
import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { AuthAPI } from "../../api";
import {
	BackButton,
	ReusableBtn,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { updateUserLogin } from "../../redux/actions/authAction";

const OTPVerification = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const dispatch = useDispatch();
	const [otp, setOtp] = useState("");
	const [err, setErr] = useState("");
	const { email, user, isForgotPassword = false } = route.params;

	useEffect(() => {
		const sendOtp = async () => {
			const otpRes = await AuthAPI.sendOtp({ email });
		};
		sendOtp();
	}, [email]);

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
								onTextChange={(text) => {
									setOtp(text);
									setErr("");
								}}
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

						{err ? (
							<View style={{ marginTop: 10 }}>
								<ReusableText
									text={err}
									size={SIZES.small}
									family="medium"
									color={COLORS.red}
								/>
							</View>
						) : null}

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
							<TouchableOpacity
								onPress={async () => {
									await AuthAPI.sendOtp({
										email: email,
									});
								}}
							>
								<ReusableText
									text="Resend"
									size={SIZES.medium}
									family="medium"
									color={COLORS.lightGreen}
								/>
							</TouchableOpacity>
						</View>

						<ReusableBtn
							onPress={async () => {
								if (otp.length < 6) {
									setErr("Please enter a valid OTP");
									return;
								}
								const verifyRes = await AuthAPI.verifyOtp({
									email,
									otp,
								});

								if (verifyRes.status != StatusCodes.OK) {
									setErr("Invalid OTP");
									return;
								}
								setErr("");

								if (isForgotPassword) {
									navigation.navigate("ResetPassword", { email, otp });
								} else {
									dispatch(updateUserLogin(user, true));
									navigation.reset({
										index: 0,
										routes: [{ name: "BottomTab" }],
									});
								}
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
