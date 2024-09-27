import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import {
	Image,
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "../../assets/icons";
import {
	BackButton,
	Input,
	ReusableBtn,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { forgotPasswordSchema } from "../../schema/password.schema";

const ForgotPassword = () => {
	const navigation = useNavigation();

	return (
		<ScreenWrapper>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAwareScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps="handled"
					keyboardDismissMode="interactive"
					extraScrollHeight={100}
					enableOnAndroid={true}
				>
					<View style={styles.container}>
						<BackButton
							size={SIZES.xLarge}
							onPress={() => navigation.goBack()}
						/>

						<Image
							source={require("../../assets/images/forgot-password.png")}
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
								text="Forgot Password?"
								size={SIZES.xxLarge}
								family="xtrabold"
							/>
							<ReusableText
								text="Enter your email address"
								size={SIZES.large}
								family="bold"
							/>
						</View>

						<Formik
							initialValues={{
								email: "vodat3444@gmail.com",
							}}
							validationSchema={forgotPasswordSchema}
							onSubmit={async (values, { setErrors }) => {
								navigation.navigate("OTPVerification", {
									isForgotPassword: true,
									email: values.email,
								});
							}}
						>
							{({
								handleChange,
								handleBlur,
								handleSubmit,
								values,
								errors,
								touched,
								setFieldTouched,
							}) => (
								<View style={styles.form}>
									<Input
										containerStyles={{ height: 60 }}
										icon={
											<Icon name="mail" strokeWidth={1.6} size={SIZES.xLarge} />
										}
										placeholder="Email"
										onChangeText={handleChange("email")}
										onFocus={() => setFieldTouched("email")}
										onBlur={() => setFieldTouched("email", "")}
										value={values.email}
										autoCapitalize="none"
										autoCorrect={false}
									/>

									<View style={{ marginTop: -10 }}>
										{touched.email && errors.email && (
											<ReusableText
												style={styles.errorText}
												text={errors.email}
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
										btnText="Submit"
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
			</TouchableWithoutFeedback>
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

export default ForgotPassword;
