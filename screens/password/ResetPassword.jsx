import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import { StatusCodes } from "http-status-codes";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthAPI } from "../../api";
import Icon from "../../assets/icons";
import {
	BackButton,
	Password,
	ReusableBtn,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { resetPasswordShema } from "../../schema/password.schema";

const ResetPassword = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [obsecureText, setObsecureText] = useState(true);
	const [obsecureTextConfirm, setObsecureTextConfirm] = useState(true);
	const { email, otp } = route.params;

	return (
		<ScreenWrapper>
			<KeyboardAwareScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
				enableOnAndroid={true}
				extraScrollHeight={200}
			>
				<View style={styles.container}>
					<BackButton
						size={SIZES.xLarge}
						onPress={() => navigation.navigate("ForgotPassword")}
					/>

					<Image
						source={require("../../assets/images/reset-password.png")}
						resizeMode="contain"
						style={{
							alignSelf: "center",
							width: SIZES.width * 0.8,
							height: SIZES.width * 0.8,
							marginBottom: -50,
						}}
					/>

					<View style={styles.textContent}>
						<ReusableText
							text="Reset Password"
							size={SIZES.xxLarge}
							family="xtrabold"
						/>
						<ReusableText
							text="Enter your new password"
							size={SIZES.large}
							family="bold"
						/>
					</View>

					<Formik
						initialValues={{
							password: "",
							confirmPassword: "",
						}}
						validationSchema={resetPasswordShema}
						onSubmit={async (values, { setErrors }) => {
							const response = await AuthAPI.resetPassword({
								email,
								otp,
								password: values.password,
								passwordConfirm: values.confirmPassword,
							});

							if (response?.code === StatusCodes.BAD_REQUEST) {
								if (response.message.startsWith("Password")) {
									setErrors({
										confirmPassword: response.message,
									});
								} else {
									// TODO: Handle invalid OTP, handle toast message
								}
							} else {
								navigation.reset({
									index: 0,
									routes: [{ name: "Login" }],
								});
							}
						}}
					>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							values,
							touched,
							errors,
							isValid,
							isSubmitting,
							setFieldTouched,
						}) => (
							<View style={styles.form}>
								<Password
									containerStyles={{ height: 60 }}
									icon={
										<Icon name="lock" strokeWidth={1.6} size={SIZES.xLarge} />
									}
									placeholder="New Password"
									secureTextEntry={obsecureText}
									isObsecure={obsecureText}
									toggleObsecure={() => setObsecureText(!obsecureText)}
									onChangeText={handleChange("password")}
									onFocus={() => setFieldTouched("password")}
									onBlur={() => setFieldTouched("password", "")}
									value={values.password}
									autoCapitalize="none"
									autoCorrect={false}
								/>

								<View style={{ marginTop: -10 }}>
									{touched.password && errors.password && (
										<ReusableText
											style={styles.errorText}
											text={errors.password}
											family="medium"
											size={SIZES.small}
											color={COLORS.red}
										/>
									)}
								</View>

								<Password
									containerStyles={{ height: 60 }}
									icon={
										<Icon name="lock" strokeWidth={1.6} size={SIZES.xLarge} />
									}
									placeholder="Confirm Password"
									secureTextEntry={obsecureTextConfirm}
									isObsecure={obsecureTextConfirm}
									toggleObsecure={() =>
										setObsecureTextConfirm(!obsecureTextConfirm)
									}
									onChangeText={handleChange("confirmPassword")}
									onFocus={() => setFieldTouched("confirmPassword")}
									onBlur={() => setFieldTouched("confirmPassword", "")}
									value={values.confirmPassword}
									autoCapitalize="none"
									autoCorrect={false}
								/>

								<View style={{ marginTop: -10 }}>
									{touched.confirmPassword && errors.confirmPassword && (
										<ReusableText
											style={styles.errorText}
											text={errors.confirmPassword}
											family="medium"
											size={SIZES.small}
											color={COLORS.red}
										/>
									)}
								</View>

								<ReusableBtn
									onPress={() => {
										handleSubmit();
									}}
									btnText="Reset Password"
									btnWidth={SIZES.full}
									backgroundColor={COLORS.lightGreen}
									textColor={COLORS.white}
									styleBtn={{ height: 60 }}
									styleText={{
										fontSize: SIZES.xLarge,
										fontFamily: "xtrabold",
									}}
								/>
							</View>
						)}
					</Formik>
				</View>
			</KeyboardAwareScrollView>
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: SIZES.large + 5,
		paddingVertical: SIZES.medium,
		// alignItems: "center",
	},
	textContent: {
		marginTop: 30,
		// alignItems: "start",
		gap: 20,
	},
	form: {
		marginTop: 30,
		justifyContent: "space-between",
		gap: 20,
	},
});

export default ResetPassword;
