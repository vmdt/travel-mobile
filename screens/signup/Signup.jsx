import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { StatusCodes } from "http-status-codes";
import React from "react";
import {
	Keyboard,
	Pressable,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { AuthAPI } from "../../api";
import Icon from "../../assets/icons";
import {
	BackButton,
	Input,
	Password,
	ReusableBtn,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { updateUserSignup } from "../../redux/actions/authAction";
import { signupSchema } from "../../schema/auth.schema";
import styles from "./signup.style";

const Signup = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [obsecureText, setObsecureText] = React.useState(true);
	const [obsecureTextConfirm, setObsecureTextConfirm] = React.useState(true);

	return (
		<ScreenWrapper>
			<KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={100}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.container}>
						<BackButton
							size={SIZES.xLarge}
							onPress={() => navigation.goBack()}
						/>
						<ReusableText
							text="Welcome to Travelife"
							family="xtrabold"
							size={SIZES.xxLarge}
							color={COLORS.black}
						/>

						<Formik
							initialValues={{
								username: "",
								email: "",
								password: "",
								confirmPassword: "",
							}}
							validationSchema={signupSchema}
							onSubmit={async (values, { setErrors }) => {
								const response = await AuthAPI.signup({
									username: values.username,
									email: values.email,
									password: values.password,
									passwordConfirm: values.confirmPassword,
								});
								if (response?.code === StatusCodes.BAD_REQUEST) {
									if (response.message.startsWith("Username")) {
										setErrors({
											email: response.message,
											username: response.message,
										});
									} else if (response.message.startsWith("Password")) {
										setErrors({
											confirmPassword: response.message,
										});
									}
								} else {
									if (!response.metadata.user.isVerifiedOTP) {
										navigation.navigate("Otp", {
											email: values.email,
											user: response.metadata.user,
										});
									} else {
										dispatch(
											updateUserSignup(
												response.metadata.user,
												true,
												response.metadata.accessToken,
											),
										);
										navigation.reset({
											index: 0,
											routes: [{ name: "BottomTab" }],
										});
									}
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
									<Input
										containerStyles={{ height: 60 }}
										icon={
											<Icon name="user" strokeWidth={1.6} size={SIZES.xLarge} />
										}
										placeholder="Username"
										onChangeText={handleChange("username")}
										onFocus={() => setFieldTouched("username")}
										onBlur={() => setFieldTouched("username", "")}
										value={values.username}
										autoCapitalize="none"
										autoCorrect={false}
									/>

									<View style={{ marginTop: -20 }}>
										{touched.username && errors.username && (
											<ReusableText
												style={styles.errorText}
												text={errors.username}
												family="medium"
												size={SIZES.small}
												color={COLORS.red}
											/>
										)}
									</View>

									<Input
										containerStyles={{ height: 60 }}
										placeholder="Email"
										icon={
											<Icon name="mail" strokeWidth={1.6} size={SIZES.xLarge} />
										}
										onChangeText={handleChange("email")}
										onFocus={() => setFieldTouched("email")}
										onBlur={() => setFieldTouched("email", "")}
										value={values.email}
										autoCapitalize="none"
										autoCorrect={false}
									/>

									<View style={{ marginTop: -20 }}>
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

									<Password
										containerStyles={{ height: 60 }}
										icon={
											<Icon name="lock" strokeWidth={1.6} size={SIZES.xLarge} />
										}
										placeholder="Password"
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

									<View style={{ marginTop: -20 }}>
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

									<View style={{ marginTop: -20 }}>
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
										btnText="Signup"
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

						<View style={styles.footer}>
							<ReusableText
								text="Already have an account?"
								family="medium"
								size={SIZES.medium}
								color={COLORS.black}
							/>
							<Pressable onPress={() => navigation.navigate("Login")}>
								<ReusableText
									text="Login"
									family="medium"
									size={SIZES.medium}
									color={COLORS.lightGreen}
								/>
							</Pressable>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAwareScrollView>
		</ScreenWrapper>
	);
};

export default Signup;
