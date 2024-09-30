import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, SIZES } from "../../constants/theme";
import { getListCategories } from "../../redux/actions/categoryAction";
import ReusableText from "../Reusable/ReusableText";

const CategoryButton = ({ category, onCategoryChange }) => {
	const itemRef = useRef([]);
	const scrollRef = useRef(null);
	const dispatch = useDispatch();
	const [activeIndex, setActiveIndex] = useState(0);
	const { categories } = useSelector((state) => state.category);

	useEffect(() => {
		dispatch(getListCategories());
		onCategoryChange(categories[0]?._id);
	}, [dispatch]);

	const handleSelectCategory = (index) => {
		const selected = itemRef.current[index];
		selected.measureLayout(scrollRef.current, (x, y, width, height) => {
			scrollRef.current.scrollTo({ x: x - 100, animated: true });
		});
		setActiveIndex(index);

		onCategoryChange(categories[index]?._id);
	};

	return (
		<View>
			<ScrollView
				horizontal
				ref={scrollRef}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					gap: 20,
					paddingVertical: 10,
					paddingHorizontal: 10,
					marginBottom: 5,
				}}
			>
				{categories.map((category, index) => (
					<TouchableOpacity
						key={index}
						ref={(el) => (itemRef.current[index] = el)}
						style={
							activeIndex === index
								? styles.categoryBtnActive
								: styles.categoryBtn
						}
						onPress={() => {
							handleSelectCategory(index);
						}}
					>
						<MaterialCommunityIcons
							name={category?.icon}
							size={24}
							color={activeIndex === index ? COLORS.white : COLORS.black}
						/>

						<ReusableText
							text={category?.name}
							family="medium"
							size={SIZES.medium}
							color={activeIndex === index ? COLORS.white : COLORS.black}
						/>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	categoryBtn: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.white,
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	categoryBtnActive: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.lightGreen,
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
});

export default CategoryButton;
