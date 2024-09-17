import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
	Avatar,
	CategoryButton,
	GroupListings,
	HeightSpacer,
	Input,
	Listings,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import mockCategories from "../../data/categories";
import mockGroups from "../../data/groups";
import mockTours from "../../data/tours";
import styles from "./home.style";

const Home = () => {
	const navigation = useNavigation();
	const { user } = useSelector((state) => state.auth);
	const [category, setCategory] = useState("All");

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
									source={user?.profilePicture}
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
							/>

							<TouchableOpacity onPress={() => {}} style={styles.filterBtn}>
								<Ionicons name="options" size={28} color={COLORS.white} />
							</TouchableOpacity>
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
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
};

export default Home;
