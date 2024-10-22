import React, { useState } from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { ScreenWrapper } from "../../components";

const formatPrice = (amount, currency) => {
	const options = { style: "currency", currency: currency };
	const locale = currency === "VND" ? "vi-VN" : "en-US"; // Kiểm tra loại tiền tệ để chọn locale
	const formatter = new Intl.NumberFormat(locale, options);
	return formatter.format(amount);
};

const cartItems = [
	{
		id: "1",
		title: "Dalat: Sunrise",
		description: "Hike the second highest mountain peek in Dalat and be...",
		location: "DaLat - VietNam",
		price: 1500000,
		currency: "VND",
		imageUrl: "https://example.com/image1.jpg",
	},
	{
		id: "2",
		title: "Dalat: Sunrise",
		description: "Hike the second highest mountain peek in Dalat and be...",
		location: "DaLat - VietNam",
		price: 1100000,
		currency: "VND",
		imageUrl: "https://example.com/image2.jpg",
	},
	{
		id: "3",
		title: "Dalat: Sunrise",
		description: "Hike the second highest mountain peek in Dalat and be...",
		location: "DaLat - VietNam",
		price: 150,
		currency: "USD",
		imageUrl: "https://example.com/image2.jpg",
	},
	{
		id: "4",
		title: "Dalat: Sunrise",
		description: "Hike the second highest mountain peek in Dalat and be...",
		location: "DaLat - VietNam",
		price: 150,
		currency: "USD",
		imageUrl: "https://example.com/image2.jpg",
	},
	{
		id: "5",
		title: "Dalat: Sunrise",
		description: "Hike the second highest mountain peek in Dalat and be...",
		location: "DaLat - VietNam",
		price: 110,
		currency: "USD",
		imageUrl: "https://example.com/image2.jpg",
	},
];

const Cart = () => {
	const [selectedItems, setSelectedItems] = useState([]);
	const [showCheckbox, setShowCheckbox] = useState(false);

	const toggleSelectItem = (id) => {
		setSelectedItems((prevSelected) => {
			if (prevSelected.includes(id)) {
				return prevSelected.filter((item) => item !== id);
			} else {
				return [...prevSelected, id];
			}
		});
	};

	const calculateTotalPrice = () => {
		return (
			selectedItems
				.reduce((total, id) => {
					const item = cartItems.find((item) => item.id === id);
					const price =
						item.currency === "VND" ? item.price : item.price * 23000;
					return total + price;
				}, 0)
				.toLocaleString() + " VMD"
		);
	};

	const handleSelectAll = () => {
		if (selectedItems.length === cartItems.length) {
			// Nếu tất cả đã được chọn, thì bỏ chọn hết
			setSelectedItems([]);
		} else {
			// Chọn tất cả các mục
			setSelectedItems(cartItems.map((item) => item.id));
		}
	};

	const renderItem = ({ item }) => (
		<View style={styles.card}>
			<Image source={{ uri: item.imageUrl }} style={styles.image} />
			<View style={styles.details}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
				<Text style={styles.location}>📍 {item.location}</Text>
				<View style={styles.actions}>
					<TouchableOpacity style={styles.editButton}>
						<Text>Edit</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.deleteButton}>
						<Text>🗑️</Text>
					</TouchableOpacity>
					<Text style={styles.price}>{item.price}</Text>
				</View>
			</View>
			<View style={styles.checkboxContainer}>
				<CheckBox
					checked={selectedItems.includes(item.id)}
					onPress={() => toggleSelectItem(item.id)}
				/>
			</View>
		</View>
	);

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Text style={styles.header}>Booking Cart ({selectedItems.length})</Text>
				<FlatList
					data={cartItems}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.listContainer}
				/>
				<View style={styles.footer}>
					<TouchableOpacity onPress={handleSelectAll}>
						<View style={styles.selectAllContainer}>
							<Text style={styles.selectAllText}>
								{selectedItems.length === cartItems.length
									? "Deselect all"
									: "Select all"}
							</Text>
						</View>
					</TouchableOpacity>
					<Text style={styles.totalPrice}>{calculateTotalPrice()}</Text>
					<TouchableOpacity style={styles.checkoutButton}>
						<Text style={styles.checkoutText}>Check out</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 16,
	},
	selectButton: {
		backgroundColor: "blue",
		padding: 10,
		margin: 16,
		borderRadius: 8,
	},
	selectButtonText: {
		color: "#fff",
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
	},
	listContainer: {
		padding: 16,
	},
	card: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
		marginBottom: 16,
		padding: 8,
		alignItems: "center",
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 8,
		marginLeft: 8,
	},
	details: {
		flex: 1,
		paddingLeft: 12,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	description: {
		fontSize: 14,
		color: "#666",
	},
	location: {
		fontSize: 12,
		color: "#888",
		marginVertical: 4,
	},
	actions: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},
	editButton: {
		marginRight: 12,
	},
	deleteButton: {
		marginRight: 12,
	},
	price: {
		marginLeft: "auto",
		fontSize: 16,
		fontWeight: "bold",
	},
	checkboxContainer: {
		marginLeft: 16,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderTopWidth: 1,
		borderColor: "#ddd",
		paddingBottom: 110,
	},
	selectAllContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	selectAllText: {
		marginLeft: 8,
	},
	totalPrice: {
		fontSize: 18,
		fontWeight: "bold",
	},
	checkoutButton: {
		backgroundColor: "red",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	checkoutText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default Cart;
