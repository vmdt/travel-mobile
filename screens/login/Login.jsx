import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { StatusCodes } from "http-status-codes";
import React from "react";
import {
	Image,
	Keyboard,
	Pressable,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
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
import { updateUserLogin } from "../../redux/actions/authAction";
import { loginSchema } from "../../schema/auth.schema";
import styles from "./login.style";

const Login = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [obsecureText, setObsecureText] = React.useState(true);

	return (
		<ScreenWrapper>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<BackButton size={SIZES.xLarge} onPress={() => navigation.goBack()} />
					<View>
						<ReusableText
							text="Hey,"
							family="xtrabold"
							size={SIZES.xxLarge}
							color={COLORS.black}
						/>

						<ReusableText
							text="Welcome back to Travelife"
							family="xtrabold"
							size={SIZES.xxLarge}
							color={COLORS.black}
						/>
					</View>

					<Formik
						initialValues={{
							email: "vodat3444@gmail.com",
							password: "1234567890",
						}}
						validationSchema={loginSchema}
						onSubmit={async (values, { setErrors }) => {
							const response = await AuthAPI.login(
								values.email,
								values.password,
							);
							if (response?.code === StatusCodes.BAD_REQUEST) {
								if (response.message.includes("email")) {
									setErrors({
										email: response.message,
									});
								} else {
									setErrors({
										password: response.message,
									});
								}
							} else {
								if (!response.metadata.user.isVerifiedOTP) {
									navigation.navigate("OTPVerification", {
										email: values.email,
										user: response.metadata.user,
									});
								} else {
									dispatch(
										updateUserLogin(
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

								<View>
									<TouchableOpacity
										onPress={() => navigation.navigate("ForgotPassword")}
										style={{ alignSelf: "flex-end" }}
									>
										<ReusableText
											style={styles.forgotPassword}
											text="Forgot Password?"
											family="medium"
											size={SIZES.medium}
											color={COLORS.black}
										/>
									</TouchableOpacity>
								</View>

								<ReusableBtn
									onPress={() => {
										handleSubmit();
									}}
									btnText="Login"
									btnWidth={SIZES.full}
									backgroundColor={COLORS.lightGreen}
									textColor={COLORS.white}
									styleBtn={{ height: 60 }}
									styleText={{
										fontSize: SIZES.xLarge,
										fontFamily: "xtrabold",
									}}
								/>

								<TouchableOpacity style={styles.googleBtn} onPress={() => {}}>
									<Image
										source={require("../../assets/images/icons/google_96px.png")}
										style={styles.googleIcon}
									/>
									<ReusableText
										text="Login with Google"
										family="medium"
										size={SIZES.medium}
										color={COLORS.black}
									/>
								</TouchableOpacity>
							</View>
						)}
					</Formik>

					<View style={styles.footer}>
						<ReusableText
							text="Don’t have an account?"
							family="medium"
							size={SIZES.medium}
							color={COLORS.black}
						/>
						<Pressable onPress={() => navigation.navigate("Signup")}>
							<ReusableText
								text="Signup"
								family="medium"
								size={SIZES.medium}
								color={COLORS.lightGreen}
							/>
						</Pressable>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</ScreenWrapper>
	);
};

export default Login;
