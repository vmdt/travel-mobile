import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Rating } from "react-native-ratings";
import { COLORS, SIZES } from "../../constants/theme";
import ReusableBtn from "../Buttons/ReusableBtn";
import Input from "../Input/Input";
import ReusableText from "../Reusable/ReusableText";

const ReviewModal = ({ visible, onClose, handleSubmitReview }) => {
	const [rating, setRating] = useState(3.5);
	const [content, setContent] = useState("");

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalBackGround}>
				<View style={styles.modalContainer}>
					<TouchableOpacity
						style={{ position: "absolute", top: 10, right: 20 }}
						onPress={onClose}
					>
						<ReusableText text="✖" size={SIZES.large} />
					</TouchableOpacity>

					<View style={{ alignItems: "center", gap: 10 }}>
						<ReusableText
							text="Rate your experience"
							family="xtrabold"
							size={SIZES.large}
						/>
						<Rating
							type="star"
							ratingCount={5}
							imageSize={40}
							showRating
							startingValue={3.5}
							jumpValue={0.5}
							fractions={1}
							onFinishRating={(rating) => {
								setRating(rating);
							}}
						/>

						<Input
							placeholder="Write your review"
							multiline
							numberOfLines={5}
							containerStyles={{ width: "100%" }}
							value={content}
							onChangeText={(text) => setContent(text)}
						/>

						<ReusableBtn
							btnText={"Submit"}
							onPress={() => {
								handleSubmitReview(rating, content);
							}}
							styleBtn={{ marginTop: 20 }}
							btnWidth="50%"
							backgroundColor={COLORS.lightGreen}
							textColor={COLORS.white}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ReviewModal;

const styles = StyleSheet.create({
	modalBackGround: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContainer: {
		width: "80%",
		backgroundColor: COLORS.lightWhite,
		paddingHorizontal: 20,
		paddingVertical: 30,
		borderRadius: 20,
		elevation: 20,
	},
});
