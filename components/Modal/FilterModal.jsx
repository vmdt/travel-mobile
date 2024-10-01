import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "../../assets/icons";
import { COLORS, SIZES } from "../../constants/theme";
import ReusableBtn from "../Buttons/ReusableBtn";
import Input from "../Input/Input";
import ReusableText from "../Reusable/ReusableText";

const FilterModal = ({ visible, onClose, onApply }) => {
	const [rating, setRating] = useState(null);
	const [duration, setDuration] = useState([]);
	const [selectedOptions, setSelectedOptions] = useState([1]);
	const ratingOptions = ["3.5+", "4.0+", "4.5+"];
	const durationOptions = ["30 min", "1 hour", "2 hours"];

	const handleApply = () => {
		onApply(selectedOptions.length);
		onClose();
	};

	const handleDurationSelect = (option) => {
		if (duration.includes(option)) {
			setDuration(duration.filter((item) => item !== option));
		} else {
			setDuration([...duration, option]);
		}
	};

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

					<ReusableText text="Price" family="xtrabold" size={SIZES.large} />
					<View style={styles.row}>
						<Input
							icon={<Icon name="dolar" strokeWidth={1.6} size={SIZES.large} />}
							placeholder="Min"
							keyboardType="number-pad"
							containerStyles={{ flex: 1 }}
						/>

						<ReusableText
							text="~"
							size={SIZES.large}
							style={{ alignSelf: "center" }}
						/>

						<Input
							icon={<Icon name="dolar" strokeWidth={1.6} size={SIZES.large} />}
							placeholder="Max"
							keyboardType="number-pad"
							containerStyles={{ flex: 1 }}
						/>
					</View>

					<ReusableText text="Rating" family="xtrabold" size={SIZES.large} />
					<View style={styles.ratingContainer}>
						{ratingOptions.map((option) => (
							<TouchableOpacity
								key={option}
								style={styles.radioContainer}
								onPress={() => {
									setRating((prev) => (prev === option ? null : option));
								}}
							>
								<View
									style={[
										styles.customRadio,
										rating === option && styles.checkedRadio,
									]}
								/>
								<ReusableText text={option} />
							</TouchableOpacity>
						))}
					</View>

					<ReusableText text="Duration" family="xtrabold" size={SIZES.large} />

					<View style={styles.ratingContainer}>
						{durationOptions.map((option) => (
							<TouchableOpacity
								key={option}
								style={styles.radioContainer}
								onPress={() => handleDurationSelect(option)}
							>
								<View
									style={[
										styles.customCheckbox,
										duration.includes(option) && styles.checkedCheckbox,
									]}
								/>
								<ReusableText text={option} />
							</TouchableOpacity>
						))}
					</View>

					<ReusableBtn
						btnText="Apply"
						styleBtn={{ alignSelf: "center", marginTop: 20 }}
						onPress={handleApply}
						btnWidth="50%"
						backgroundColor={COLORS.lightGreen}
						textColor={COLORS.white}
					/>
				</View>
			</View>
		</Modal>
	);
};

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
	row: {
		flexDirection: "row",
		alighItems: "center",
		justifyContent: "space-between",
		marginVertical: 10,
		marginBottom: 20,
		gap: 20,
	},
	ratingContainer: {
		flexDirection: "column",
		alignItems: "flex-start",
		marginVertical: 10,
		gap: 5,
	},
	radioContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
	},
	customRadio: {
		width: 16,
		height: 16,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: COLORS.lightGreen,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
	},
	checkedRadio: {
		backgroundColor: COLORS.lightGreen,
	},
	innerCircle: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "white",
		borderWidth: 2,
		borderColor: "white",
		display: "none",
	},
	checkedRadio: {
		backgroundColor: COLORS.lightGreen,
	},
	customCheckbox: {
		width: 16,
		height: 16,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: COLORS.lightGreen,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
	},
	checkedCheckbox: {
		backgroundColor: COLORS.lightGreen,
	},
});

export default FilterModal;
