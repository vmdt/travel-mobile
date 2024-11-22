import { Ionicons } from "@expo/vector-icons";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import PushNotification from "react-native-push-notification";
import { useSelector } from "react-redux";
import {
	Avatar,
	CategoryButton,
	FilterModal,
	GroupListings,
	HeightSpacer,
	Input,
	Listings,
	NotificationModal,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { AVATAR_DEFAULT, COLORS, SIZES } from "../../constants/theme";
import mockCategories from "../../data/categories";
import mockGroups from "../../data/groups";
import mockTours from "../../data/tours";
import { formatDate } from "../../utils";
import styles from "./home.style";

const notifications = [
	{
		_id: "1",
		title: "Sales off 100% from 2024-11-20 to 2024-11-30",
		message: "CODE: 123456",
	},
	{
		_id: "2",
		title: "Sales off 100% from 2024-11-20 to 2024-11-30",
		message: "CODE: 123456",
	},
	{
		_id: "3",
		title: "Sales off 100% from 2024-11-20 to 2024-11-30",
		message: "CODE: 123456",
	},
	{
		_id: "4",
		title: "Sales off 100% from 2024-11-20 to 2024-11-30",
		message: "CODE: 123456",
	},
];

const Home = () => {
	const navigation = useNavigation();
	const { user } = useSelector((state) => state.auth);
	const [category, setCategory] = useState("");
	const [hasNotification, setHasNotification] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalNotificationVisible, setModalNotificationVisible] =
		useState(false);
	const [selectedFilterCount, setSelectedFilterCount] = useState(0);
	const [searchText, setSearchText] = useState("");
	const inputRef = useRef(null);

	const handleApplyFilters = (count) => {
		setSelectedFilterCount(count);
	};

	const onCategoryChange = (category) => {
		setCategory(category);
	};

	useEffect(() => {
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			console.log("Foreground message received: ", remoteMessage);
			// Handle the foreground message here (e.g., show a notification)
			setHasNotification(true);
		});

		// Set background message handler
		messaging().setBackgroundMessageHandler(async (remoteMessage) => {
			console.log("Background message received: ", remoteMessage);
			const { title } = remoteMessage.data;
			const { discount } = remoteMessage.data;
			const discountObj = JSON.parse(discount);

			// Handle the background message here (e.g., show a notification)
			PushNotification.localNotification({
				channelId: "default-channel-id", // Must match the ID of the created channel
				title: title || "New noti", // Notification title
				message: `${discountObj?.name} start from ${formatDate(discountObj?.startDate)} to ${formatDate(discountObj?.endDate)}`, // Notification content
				bigText: `${discountObj?.name} start from ${formatDate(discountObj?.startDate)} to ${formatDate(discountObj?.endDate)}`, // Expanded content (Android)
				vibrate: true, // Vibrate when receiving a notification
				vibration: 300, // Vibration duration (ms)
				playSound: true, // Play sound
				soundName: "default", // Sound file name (set to default)
				priority: "high", // Priority (Android)
			});

			setHasNotification(true);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<ScreenWrapper>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.header}>
						<View style={styles.headerContent}>
							<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
								<Avatar
									source={user?.profilePicture || AVATAR_DEFAULT}
									imageStyle={{
										width: 50,
										height: 50,
									}}
								/>
							</TouchableOpacity>
							<View>
								<ReusableText
									text="Welcome to Travelife"
									family="medium"
									size={SIZES.medium}
								/>
								<ReusableText
									text={user?.username}
									family="bold"
									size={SIZES.large}
								/>
							</View>
						</View>

						<TouchableOpacity
							onPress={() => {
								setModalNotificationVisible(true);
								setHasNotification(false);
							}}
							style={styles.notificationIcon}
						>
							<Ionicons name="notifications" size={24} color={COLORS.black} />
							{hasNotification && <View style={styles.redDot} />}
						</TouchableOpacity>

						<NotificationModal
							visible={modalNotificationVisible}
							onClose={() => setModalNotificationVisible(false)}
							notifications={notifications}
						/>
					</View>

					<View style={styles.body}>
						<ReusableText
							text="Explore The Beautiful World"
							family="xtrabold"
							size={SIZES.xLarge}
							color={COLORS.black}
						/>

						<View style={styles.searchSectionWrapper}>
							<Input
								icon={<Ionicons name="search" size={24} color={COLORS.black} />}
								placeholder="Search for places"
								containerStyles={{ height: 60, flex: 1 }}
								onFocus={() => {
									navigation.navigate("Search");
									setTimeout(() => {
										inputRef.current.blur();
									}, 0);
								}}
								inputRef={inputRef}
							/>

							<TouchableOpacity
								onPress={() => {
									setModalVisible(true);
								}}
								style={styles.filterBtn}
							>
								<Ionicons name="options" size={28} color={COLORS.white} />
								{selectedFilterCount > 0 && (
									<View style={styles.badge}>
										<Text style={styles.badgeText}>{selectedFilterCount}</Text>
									</View>
								)}
							</TouchableOpacity>
							<FilterModal
								visible={modalVisible}
								onClose={() => setModalVisible(false)}
								onApply={handleApplyFilters}
							/>
						</View>

						<View style={{ gap: 10 }}>
							<ReusableText
								text="Categories"
								family="xtrabold"
								size={SIZES.large}
								color={COLORS.black}
							/>

							<CategoryButton
								categories={mockCategories}
								onCategoryChange={onCategoryChange}
							/>
						</View>

						<Listings listings={mockTours} category={category} />

						<HeightSpacer height={20} />

						<View style={{ gap: 10 }}>
							<ReusableText
								text="Top Traveling"
								family="xtrabold"
								size={SIZES.large}
								color={COLORS.black}
							/>
							<GroupListings listings={mockGroups} />
						</View>

						{/* <HeightSpacer height={100} /> */}
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
};

export default Home;
