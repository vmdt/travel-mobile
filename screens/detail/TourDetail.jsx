import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
	FlatList,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Swiper from "react-native-swiper";
import { TourAPI } from "../../api";
import {
	BackButton,
	HeightSpacer,
	ReusableBtn,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import styles from "./tourDetail.style";

const TourDetail = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const [tourData, setTourData] = useState(null);
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
		<>
			<ScrollView>
				<View style={{ height: 300 }}>
					<Swiper
						autoplay={true}
						showsPagination={false}
						style={{ height: 300 }}
					>
						{tourData?.images?.map((image, index) => (
							<ImageBackground
								key={index}
								source={{ uri: image }}
								style={{ width: "100%", height: 300 }}
							>
								<ScreenWrapper>
									<View style={styles.container}>
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
						style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
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
							flexDirection: "row",
							alignItems: "center",
							marginTop: 5,
							justifyContent: "space-between",
						}}
					>
						<View style={{ flexDirection: "row", gap: 5 }}>
							<ReusableText
								text="From"
								size={SIZES.medium}
								family="bold"
								style={{ marginTop: 10, alignSelf: "center" }}
							/>

							<ReusableText
								text={`$${tourData?.regularPrice}`}
								size={SIZES.large}
								color={COLORS.green}
								family="bold"
								style={{ marginTop: 10, alignSelf: "center" }}
							/>

							<ReusableText
								text="per person"
								size={SIZES.medium}
								family="bold"
								style={{ marginTop: 10, alignSelf: "center" }}
							/>
						</View>

						<View
							style={{
								backgroundColor: COLORS.red,
								borderRadius: 5,
								paddingVertical: 5,
								paddingHorizontal: 10,
								alignItems: "center",
							}}
						>
							<ReusableText
								text={
									tourData?.ratingAverage > 4.7
										? "Likely to sell out"
										: "Best Choice"
								}
								family="bold"
								size={14}
								color={COLORS.white}
							/>
						</View>
					</View>

					<ReusableText
						text={tourData?.description ?? tourData?.summary}
						size={SIZES.small}
						style={{ marginTop: 10 }}
					/>

					<ReusableText
						text="Inclusions: "
						size={SIZES.medium}
						family="bold"
						style={{ marginTop: 20 }}
					/>
					<ScrollView horizontal={true}>
						<FlatList
							data={tourData?.inclusions}
							renderItem={({ item }) => renderItem({ item, isInclusion: true })}
						/>
					</ScrollView>

					<ReusableText
						text="Exclustions: "
						size={SIZES.medium}
						family="bold"
						style={{ marginTop: 20 }}
					/>
					<ScrollView horizontal={true}>
						<FlatList
							data={tourData?.exclusions}
							renderItem={({ item }) =>
								renderItem({ item, isInclusion: false })
							}
						/>
					</ScrollView>

					<ReusableText
						text="Location: "
						size={SIZES.medium}
						family="bold"
						style={{ marginTop: 20 }}
					/>
					<MapView
						style={{ height: 200, marginVertical: 10 }}
						initialRegion={{
							latitude: tourData?.startLocation?.coordinates[1],
							longitude: tourData?.startLocation?.coordinates[0],
							latitudeDelta: 0.05,
							longitudeDelta: 0.05,
						}}
					>
						<Marker
							coordinate={{
								latitude: tourData?.startLocation?.coordinates[1],
								longitude: tourData?.startLocation?.coordinates[0],
							}}
							title={tourData?.title}
						/>
					</MapView>

					<HeightSpacer height={200} />

					<View style={styles.buttonCheckAvail}>
						<ReusableBtn
							onPress={() => {}}
							btnText="Check Availability"
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
				</View>
			</ScrollView>
		</>
	);
};

export default TourDetail;
