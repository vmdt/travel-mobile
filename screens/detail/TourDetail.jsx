import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { TourAPI } from "../../api";
import {
	BackButton,
	Booking,
	CheckAvailabilityModal,
	ReusableBtn,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import InfoDetails from "./InfoDetails";
import styles from "./tourDetail.style";

const Tab = createMaterialTopTabNavigator();

const TourDetail = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const [tourData, setTourData] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const { item } = route.params;

	useEffect(() => {
		const fetchTourData = async () => {
			const response = await TourAPI.getTourById(item?._id);
			setTourData(response.metadata);
		};

		fetchTourData();
	}, [item?._id]);

	const renderItem = ({ item, isInclusion }) => (
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			{isInclusion ? (
				<Ionicons name="checkmark" size={16} color={COLORS.green} />
			) : (
				<Ionicons name="close" size={16} color={COLORS.red} />
			)}

			<ReusableText
				text={item}
				family="regular"
				size={SIZES.small}
				style={{ marginLeft: 5 }}
			/>
		</View>
	);

	if (!tourData) return <ScreenWrapper></ScreenWrapper>;

	return (
		<View style={styles.container}>
			{/* <Text style={styles.header}>Booking Cart</Text> */}
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

					<View style={{ height: "auto", marginTop: 10, marginBottom: 50 }}>
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
							<Tab.Screen name="Review" component={Booking} />
						</Tab.Navigator>
					</View>

					<CheckAvailabilityModal
						isOpen={modalVisible}
						onClose={() => setModalVisible(false)}
						tourDetail={tourData}
						guestInfo={tourData?.priceOptions}
						totalPrice={30000000}
						handleAddToCart={() => {}}
						handleBookNow={() => {}}
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
