import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
	Avatar,
	CategoryButton,
	FilterModal,
	GroupListings,
	HeightSpacer,
	Input,
	Listings,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { AVATAR_DEFAULT, COLORS, SIZES } from "../../constants/theme";
import mockCategories from "../../data/categories";
import mockGroups from "../../data/groups";
import mockTours from "../../data/tours";
import styles from "./home.style";

const Home = () => {
	const navigation = useNavigation();
	const { user } = useSelector((state) => state.auth);
	const [category, setCategory] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedFilterCount, setSelectedFilterCount] = useState(0);
	const [searchText, setSearchText] = useState("");
	const inputRef = useRef(null);

	const handleApplyFilters = (count) => {
		setSelectedFilterCount(count);
	};

	const onCategoryChange = (category) => {
		setCategory(category);
	};

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
									family="xtrabold"
									size={SIZES.large}
								/>
							</View>
						</View>

						<TouchableOpacity
							onPress={() => {}}
							style={styles.notificationIcon}
						>
							<Ionicons name="notifications" size={24} color={COLORS.black} />
						</TouchableOpacity>
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
