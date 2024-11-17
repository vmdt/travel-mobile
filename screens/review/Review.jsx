import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Rating } from "react-native-ratings";
import { useSelector } from "react-redux";
import { ReviewAPI } from "../../api";
import { Avatar, ReusableText } from "../../components";
import { COLORS } from "../../constants/theme";

const Review = ({ tourId }) => {
	const [reviews, setReviews] = useState([]);
	const { accessToken } = useSelector((state) => state.auth);

	useEffect(() => {
		const fetchReviews = async () => {
			const response = await ReviewAPI.getReviewsInTour(tourId, accessToken);
			setReviews(response?.metadata?.reviews);
		};

		if (tourId) {
			fetchReviews();
		}
	}, [tourId]);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.container}
		>
			{reviews?.map((review) => {
				return (
					<View
						key={review?._id}
						style={[
							styles.item,
							{ alignItems: "flex-start", flexDirection: "column", gap: 15 },
						]}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 20,
								paddingHorizontal: 10,
							}}
						>
							<Avatar
								source={review?.user?.profilePicture}
								imageStyle={{ width: 40, height: 40 }}
							/>
							<View>
								<ReusableText
									text={review?.user?.username}
									size={16}
									family="medium"
									color={COLORS.black}
								/>
								<Rating
									type="star"
									ratingCount={5}
									startingValue={review?.rating}
									imageSize={15}
									readonly
								/>
							</View>
						</View>

						<ReusableText
							text={review?.content}
							size={14}
							family="regular"
							style={{ paddingHorizontal: 10 }}
						/>
					</View>
				);
			})}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingBottom: 10,
		paddingTop: 20,
	},
	item: {
		height: 100,
		width: "100%",
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 10,
		marginRight: 20,
		overflow: "hidden",
		gap: 5,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
});

export default Review;
