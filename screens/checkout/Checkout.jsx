import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { StatusCodes } from "http-status-codes";
import React, { useEffect, useState } from "react";
import {
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { Appbar, Provider as PaperProvider } from "react-native-paper"; // Thêm import
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { BookingAPI, DiscountAPI } from "../../api";
import {
	BackButton,
	Input,
	OrderCard,
	ReusableBtn,
	ReusableText,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { personalInfoSchema } from "../../schema/user.schema";
import { formatCurrency, formatDate } from "../../utils";

const Checkout = () => {
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const { user, accessToken } = useSelector((state) => state.auth);
	const { cart, tours } = useSelector((state) => state.booking);
	const [items, setItems] = useState([]);
	const [checkoutOrder, setCheckoutOrder] = useState({});
	const [discountCode, setDiscountCode] = useState("");

	useEffect(() => {
		const fetchCheckoutReview = async () => {
			const response = await BookingAPI.checkoutReview(
				cart,
				tours,
				accessToken,
			);
			setItems(response.metadata.checkoutReview);
			setCheckoutOrder(response.metadata.checkoutOrder);
		};

		if (isFocused) {
			fetchCheckoutReview();
		}
	}, [isFocused]);

	const handlePayNow = async (personalInfo) => {
		const bookingData = {
			cart,
			tours: items.map((item) => {
				return {
					tour: item?.tour?._id,
					startDate: formatDate(item?.startDate),
				};
			}),
			personalInfo,
			...(discountCode && { discountCode }),
		};

		const bookingRes = await BookingAPI.createBooking(bookingData, accessToken);
		const payRes = await BookingAPI.getVNPayUrl(
			bookingRes?.metadata?.booking?._id,
			accessToken,
		);

		const { paymentURL } = payRes?.metadata;

		// navigation.navigate("MyWebView", { url: paymentURL });
		Toast.show({
			type: "success",
			text1: "Create Booking Successfully",
		});
		Linking.openURL(paymentURL);
		navigation.navigate("Home");
	};

	const handleApplyDiscount = async () => {
		if (!discountCode) {
			return;
		}
		const tours = items.map((item) => {
			return {
				tourId: item?.tour?._id,
				totalPrice: item?.participants.reduce((acc, part) => {
					return acc + part?.quantity * part?.price;
				}, 0),
			};
		});

		const response = await DiscountAPI.getDiscountAmount(discountCode, tours);

		if (response?.status != StatusCodes.OK) {
			Toast.show({
				type: "error",
				text1: "Error Apply Discount",
				...(response?.status != StatusCodes.INTERNAL_SERVER_ERROR && {
					text2: response?.data?.message,
				}),
			});
			return;
		}
		setCheckoutOrder(response?.metadata?.checkoutOrder);
		Toast.show({
			type: "success",
			text1: "Apply Discount Successfully",
		});
	};

	return (
		<PaperProvider>
			<View>
				<Appbar.Header
					theme={{ colors: { primary: COLORS.lightWhite } }}
					style={{ elevation: 0 }}
				>
					<View style={styles.header}>
						<BackButton
							size={SIZES.xLarge}
							onPress={() => navigation.goBack()}
							customStyle={{ alignSelf: "center" }}
						/>

						<View style={{ flex: 1, alignItems: "center" }}>
							<ReusableText
								text="Checkout Review"
								family="medium"
								size={SIZES.large}
							/>
						</View>
					</View>
				</Appbar.Header>
			</View>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<ReusableText
						text="Your Order"
						family="xtrabold"
						size={SIZES.medium + 6}
						color={COLORS.green}
					/>

					<View style={{ marginTop: 20, marginBottom: 20, gap: 20 }}>
						{items.map((item, index) => {
							return <OrderCard item={item} key={index} />;
						})}
					</View>

					<ReusableText
						text="Total Order"
						family="xtrabold"
						size={SIZES.medium + 6}
						color={COLORS.green}
					/>

					<View style={{ marginTop: 20, marginBottom: 20 }}>
						<View style={styles.pannel}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									paddingBottom: 10,
									borderBottomWidth: 0.5,
									borderBottomColor: COLORS.black,
								}}
							>
								<ReusableText
									text={"Total Price"}
									family={"bold"}
									size={SIZES.medium + 4}
									color={COLORS.black}
								/>

								<View>
									{checkoutOrder?.discount > 0 ? (
										<>
											<ReusableText
												text={formatCurrency(checkoutOrder?.totalOrder)}
												family={"bold"}
												size={SIZES.medium + 4}
												color={COLORS.gray}
												style={{ textDecorationLine: "line-through" }}
											/>
											<ReusableText
												text={formatCurrency(checkoutOrder?.totalPrice)}
												family={"bold"}
												size={SIZES.medium + 6}
												color={COLORS.green}
											/>
										</>
									) : (
										<ReusableText
											text={formatCurrency(checkoutOrder?.totalOrder)}
											family={"bold"}
											size={SIZES.medium + 6}
											color={COLORS.green}
										/>
									)}
								</View>
							</View>

							<View
								style={{
									marginTop: 20,
									flexDirection: "row",
								}}
							>
								<View style={{ flex: 1, paddingRight: 20 }}>
									<Input
										icon={
											<MaterialIcons
												name="local-offer"
												size={18}
												color={COLORS.black}
											/>
										}
										containerStyles={{ height: 50 }}
										placeholder="Discount Code"
										keyboardType="default"
										autoCapitalize="none"
										autoCorrect={false}
										secureTextEntry={false}
										value={discountCode}
										onChangeText={(text) => setDiscountCode(text)}
									/>
								</View>

								<ReusableBtn
									btnText="Apply"
									onPress={handleApplyDiscount}
									styleBtn={{ height: 50 }}
									btnWidth={100}
									backgroundColor={COLORS.lightGreen}
									textColor={COLORS.white}
								/>
							</View>
						</View>
					</View>

					<ReusableText
						text="Personal Info"
						family="xtrabold"
						size={SIZES.medium + 6}
						color={COLORS.green}
					/>

					<Formik
						initialValues={{
							fullname: user?.fullname ?? "",
							phone: user?.phone ?? "",
							email: user?.email ?? "",
						}}
						validationSchema={personalInfoSchema}
						onSubmit={async (values, { setErrors }) => {
							handlePayNow({
								fullname: values?.fullname,
								phone: values?.phone,
								email: values?.email,
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
							<View>
								<View style={{ marginTop: 20, marginBottom: 20 }}>
									<View style={styles.pannel}>
										<View
											style={{
												flexDirection: "column",
												gap: 20,
												paddingHorizontal: 10,
												paddingVertical: 10,
											}}
										>
											<Input
												containerStyles={{ height: 50 }}
												icon={
													<FontAwesome5
														name="user-tag"
														size={18}
														color={COLORS.black}
													/>
												}
												placeholder="Full Name"
												keyboardType="default"
												autoCapitalize="none"
												autoCorrect={false}
												secureTextEntry={false}
												onChangeText={handleChange("fullname")}
												onFocus={() => setFieldTouched("fullname")}
												onBlur={() => setFieldTouched("fullname", "")}
												value={values?.fullname}
											/>

											<View style={{ marginTop: -20 }}>
												{touched.fullname && errors.fullname && (
													<ReusableText
														style={styles.errorText}
														text={errors.fullname}
														family="medium"
														size={SIZES.small}
														color={COLORS.red}
													/>
												)}
											</View>

											<Input
												containerStyles={{ height: 50 }}
												icon={
													<FontAwesome5
														name="phone"
														size={18}
														color={COLORS.black}
													/>
												}
												placeholder="Phone"
												keyboardType="default"
												autoCapitalize="none"
												autoCorrect={false}
												secureTextEntry={false}
												onChangeText={handleChange("phone")}
												onFocus={() => setFieldTouched("phone")}
												onBlur={() => setFieldTouched("phone", "")}
												value={values?.phone}
											/>

											<View style={{ marginTop: -20 }}>
												{touched.phone && errors.phone && (
													<ReusableText
														style={styles.errorText}
														text={errors.phone}
														family="medium"
														size={SIZES.small}
														color={COLORS.red}
													/>
												)}
											</View>

											<Input
												containerStyles={{ height: 50 }}
												icon={
													<MaterialIcons
														name="email"
														size={18}
														color={COLORS.black}
													/>
												}
												placeholder="Email"
												keyboardType="default"
												autoCapitalize="none"
												autoCorrect={false}
												secureTextEntry={false}
												value={values?.email}
												onChangeText={handleChange("email")}
												onFocus={() => setFieldTouched("email")}
												onBlur={() => setFieldTouched("email", "")}
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
										</View>
									</View>
								</View>

								<ReusableText
									text="Payment Method"
									family="xtrabold"
									size={SIZES.medium + 6}
									color={COLORS.green}
								/>

								<View
									style={{
										marginTop: 20,
										marginBottom: 20,
										flexDirection: "row",
										justifyContent: "center",
										gap: 20,
									}}
								>
									<TouchableOpacity style={{ ...styles.pannel, width: 80 }}>
										<Image
											source={require("../../assets/images/vnpay.png")}
											style={{
												width: 100,
												height: 50,
												resizeMode: "contain",
												alignSelf: "center",
											}}
										/>
									</TouchableOpacity>

									<TouchableOpacity
										style={{ ...styles.pannel, width: 80, opacity: 0.5 }}
									>
										<Image
											source={require("../../assets/images/PayPal.png")}
											style={{
												width: 100,
												height: 50,
												resizeMode: "contain",
												alignSelf: "center",
											}}
										/>
									</TouchableOpacity>

									<TouchableOpacity
										style={{ ...styles.pannel, width: 80, opacity: 0.5 }}
									>
										<Image
											source={require("../../assets/images/Mastercard.png")}
											style={{
												width: 100,
												height: 50,
												resizeMode: "contain",
												alignSelf: "center",
											}}
										/>
									</TouchableOpacity>
								</View>

								<View
									style={{
										flexDirection: "row",
										justifyContent: "center",
										paddingVertical: 10,
										paddingBottom: 30,
									}}
								>
									<ReusableBtn
										btnText="Pay Now"
										onPress={handleSubmit}
										styleBtn={{ height: 60 }}
										btnWidth={300}
										backgroundColor={COLORS.lightGreen}
										textColor={COLORS.white}
									/>
								</View>
							</View>
						)}
					</Formik>
				</ScrollView>
			</View>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: SIZES.medium,
		paddingHorizontal: SIZES.large - 5,
		// paddingBottom: 150,
		paddingTop: 15,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		position: "absolute",
		top: 5,
		left: 0,
		right: 0,
		paddingBottom: 10,
		paddingRight: 20,
		paddingLeft: 20,
		zIndex: 1,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		gap: 15,
		backgroundColor: COLORS.white,
	},
	pannel: {
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 10,
	},
	imageCover: {
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 10,
		width: 80,
	},
	errorText: {
		marginTop: 5,
		marginLeft: 10,
	},
});

export default Checkout;
