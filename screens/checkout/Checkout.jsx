import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { Appbar, Provider as PaperProvider } from "react-native-paper"; // Thêm import
import {
	BackButton,
	Input,
	OrderCard,
	ReusableBtn,
	ReusableText,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";

const item = {
	thumbnail:
		"https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	title: "Tropical Paradise Resort Ho Chi Minh City 2 days 3 nights",
	startDate: "2024-11-20",
	participants: "Adult x 1, Child x 2",
	regularPrice: "1000000",
};

const Checkout = () => {
	const navigation = useNavigation();

	return (
		<PaperProvider>
			<View>
				<Appbar.Header
					theme={{ colors: { primary: COLORS.lightWhite } }}
					style={{ elevation: 0 }}
				>
					<View style={styles.header}>
						<BackButton
							size={SIZES.large}
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

					<View style={{ marginTop: 20, marginBottom: 20 }}>
						<OrderCard item={item} />
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

								<ReusableText
									text={item?.regularPrice + " VND"}
									family={"bold"}
									size={SIZES.medium + 6}
									color={COLORS.green}
								/>
							</View>

							<View
								style={{
									marginTop: 20,
									flexDirection: "row",
								}}
							>
								<View style={{ flex: 1, paddingRight: 20 }}>
									<Input
										containerStyles={{ height: 50 }}
										placeholder="Discount Code"
										keyboardType="default"
										autoCapitalize="none"
										autoCorrect={false}
										secureTextEntry={false}
									/>
								</View>

								<ReusableBtn
									btnText="Apply"
									onPress={() => {}}
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
								/>

								<Input
									containerStyles={{ height: 50 }}
									icon={
										<FontAwesome5 name="phone" size={18} color={COLORS.black} />
									}
									placeholder="Phone"
									keyboardType="default"
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry={false}
								/>

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
								/>
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
							onPress={() => {}}
							styleBtn={{ height: 60 }}
							btnWidth={300}
							backgroundColor={COLORS.lightGreen}
							textColor={COLORS.white}
						/>
					</View>
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
});

export default Checkout;
