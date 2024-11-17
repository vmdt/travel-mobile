import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, ImageBackground, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { useDispatch, useSelector } from "react-redux";
import { TourAPI } from "../../api";
import {
	BackButton,
	CheckAvailabilityModal,
	ReusableBtn,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { bookNow } from "../../redux/actions/bookingAction";
import { addToCart } from "../../redux/actions/cartAction";
import Review from "../review/Review";
import InfoDetails from "./InfoDetails";
import styles from "./tourDetail.style";

const Tab = createMaterialTopTabNavigator();

const TourDetail = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [tourData, setTourData] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const { item } = route.params;
	const { user, accessToken } = useSelector((state) => state.auth);

	useEffect(() => {
		const fetchTourData = async () => {
			const response = await TourAPI.getTourById(item?._id);
			setTourData(response.metadata);
		};

		fetchTourData();
	}, [item?._id]);

	const handleAddToCart = ({ startDate, participants, privateData = {} }) => {
		const dataCart = {
			user: user?._id,
			tour: {
				tour: tourData?._id,
				startDate,
				startTime: "08:00",
				participants,
				...privateData,
			},
		};

		dispatch(addToCart(dataCart, accessToken));

		Alert.alert("Success", "Tour has been added to cart successfully!", [
			{ text: "OK" },
		]);

		setModalVisible(false);
	};

	const handleBookNow = async ({ startDate, participants, privateData }) => {
		const dataCart = {
			user: user?._id,
			tour: {
				tour: tourData?._id,
				startDate,
				startTime: "08:00",
				participants,
				...privateData,
			},
		};

		await dispatch(bookNow(dataCart, accessToken));
		setModalVisible(false);
		navigation.navigate("Checkout");
	};

	if (!tourData) return <ScreenWrapper></ScreenWrapper>;

	return (
		<View style={styles.container}>
			<View style={styles.body}>
				{/* <ScrollView> */}
				<View style={{ height: 230 }}>
					<Swiper
						autoplay={true}
						showsPagination={false}
						style={{ height: 230 }}
					>
						{tourData?.images?.map((image, index) => (
							<ImageBackground
								key={index}
								source={{ uri: image }}
								style={{ width: "100%", height: 230 }}
							>
								<ScreenWrapper>
									<View style={styles.imageContainer}>
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<BackButton
												size={SIZES.xLarge}
												onPress={() => navigation.goBack()}
											/>

											<View>
												<TouchableOpacity
													style={{
														backgroundColor: COLORS.lightWhite,
														padding: 5,
														borderRadius: 10,
													}}
												>
													<Ionicons
														name="bookmark-outline"
														size={24}
														color={COLORS.black}
													/>
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</ScreenWrapper>
							</ImageBackground>
						))}
					</Swiper>
				</View>
				<View style={styles.detailsContainer}>
					<ReusableText
						text={tourData?.title}
						size={SIZES.xLarge}
						family="xtrabold"
					/>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 5,
						}}
					>
						<Ionicons name="star" size={16} color={COLORS.green} />
						<ReusableText
							text={tourData?.ratingAverage ?? 4.5}
							family="regular"
							size={14}
							color={COLORS.green}
						/>
						<ReusableText
							text={` (${tourData?.numOfRating ?? 0})`}
							family="regular"
							size={14}
							color={COLORS.black}
						/>
					</View>

					<View
						style={{
							height: "auto",
							marginTop: 10,
							marginBottom: 50,
							display: "flex",
						}}
					>
						<Tab.Navigator
							screenOptions={({ route }) => ({
								tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
								tabBarStyle: styles.tabBarStyle,
								tabBarLabel: ({ focused, color }) => (
									<ReusableText
										text={route.name}
										family="bold"
										size={SIZES.medium}
										color={focused ? COLORS.lightGreen : COLORS.black}
									/>
								),
							})}
						>
							<Tab.Screen
								name="Details"
								children={() => {
									return <InfoDetails tourData={tourData} />;
								}}
							/>
							<Tab.Screen
								name="Review"
								children={() => {
									return <Review tourId={tourData?._id} />;
								}}
							/>
						</Tab.Navigator>
					</View>

					<CheckAvailabilityModal
						isOpen={modalVisible}
						onClose={() => setModalVisible(false)}
						tourDetail={tourData}
						guestInfo={tourData?.priceOptions}
						totalPrice={30000000}
						handleAddToCart={handleAddToCart}
						handleBookNow={handleBookNow}
					/>
				</View>
				{/* </ScrollView> */}
			</View>
			<View style={styles.footer}>
				<View style={{ flexDirection: "column" }}>
					<ReusableText text={`From:`} family={"xtrabold"} size={SIZES.large} />
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<ReusableText
							text={`${tourData?.regularPrice}`}
							family={"xtrabold"}
							size={SIZES.large + 5}
							color={COLORS.green}
						/>
						<ReusableText
							text={` per person`}
							family={"xtrabold"}
							size={SIZES.large}
						/>
					</View>
				</View>
				<ReusableBtn
					onPress={() => setModalVisible(true)}
					btnText="Check Availability"
					btnWidth={150}
					backgroundColor={COLORS.lightGreen}
					textColor={COLORS.white}
					styleBtn={{ height: 60 }}
					styleText={{
						fontSize: SIZES.xLarge,
						fontFamily: "xtrabold",
					}}
				/>
			</View>
		</View>
		// </ScreenWrapper>
	);
};

export default TourDetail;
