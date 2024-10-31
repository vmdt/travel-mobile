import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { CartAPI } from "../../api";
import { ReusableText, ScreenWrapper } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { formatCurrency } from "../../utils";
import styles from "./cart.style";

const Cart = () => {
	const [items, setItems] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const { accessToken } = useSelector((state) => state.auth);
	const isFocused = useIsFocused();

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
				.reduce((total, _id) => {
					const item = items.find((item) => item._id === _id);
					const price = item?.participants.reduce(
						(acc, participant) =>
							acc + participant.quantity * participant.price,
						0,
					);
					return total + price;
				}, 0)
				.toLocaleString() + " VND"
		);
	};

	const handleSelectAll = () => {
		if (selectedItems.length === items.length) {
			setSelectedItems([]);
		} else {
			setSelectedItems(items.map((item) => item._id));
		}
	};

	const formatStartDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		``;
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	useEffect(() => {
		const fetchCartItems = async () => {
			const response = await CartAPI.getListCart(accessToken);
			setItems(response.metadata.cart.tours);
		};
		if (isFocused) {
			fetchCartItems();
		}
	}, [isFocused]);

	const renderItem = ({ item }) => (
		<View style={styles.card}>
			<Image source={{ uri: item?.tour?.thumbnail }} style={styles.image} />
			<View style={styles.details}>
				<Text style={styles.title}>{item?.tour?.title}</Text>
				<Text>{formatStartDate(item?.startDate)}</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Icon name="person" size={24} color="black" />
						<Text style={{ fontSize: 16, marginLeft: 8 }}>
							{item.participants.length > 0
								? item.participants
										.map((guest) => `${guest.title} x${guest.quantity} `)
										.join(", ")
								: "Select participant"}
						</Text>
					</View>
				</View>
				{item?.isPrivate && item.hotels.length > 0 && (
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Icon name="hotel" size={24} color="black" />
						<Text style={{ fontSize: 16, marginLeft: 8 }}>
							{item.hotels[0].name}
						</Text>
					</View>
				)}
				{item?.isPrivate && item.transports.length > 0 && (
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Icon name="hotel" size={24} color="black" />
						<Text style={{ fontSize: 16, marginLeft: 8 }}>
							{item.transports[0].name}
						</Text>
					</View>
				)}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Text style={{ fontSize: 16, marginLeft: 8 }}>
						{formatCurrency(
							item?.participants.reduce(
								(acc, participant) =>
									acc + participant.quantity * participant.price,
								0,
							),
						)}
					</Text>
				</View>
				<View style={styles.actions}>
					<TouchableOpacity style={styles.editButton}>
						<Text>Edit</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.deleteButton}>
						<Text>🗑️</Text>
					</TouchableOpacity>
					<Text style={styles.price}>{item?.price}</Text>
				</View>
			</View>
			<View style={styles.checkboxContainer}>
				<CheckBox
					checked={selectedItems.includes(item?._id)}
					onPress={() => toggleSelectItem(item?._id)}
				/>
			</View>
		</View>
	);

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Text style={styles.header}>Booking Cart ({selectedItems.length})</Text>
				{items.length === 0 ? (
					<View style={styles.noResult}>
						<ReusableText
							text="No cart items"
							family="medium"
							size={SIZES.large}
							color={COLORS.green}
						/>
					</View>
				) : (
					<FlatList
						data={items}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						contentContainerStyle={styles.listContainer}
					/>
				)}
				<View style={styles.footer}>
					<TouchableOpacity onPress={handleSelectAll}>
						<View style={styles.selectAllContainer}>
							<Text style={styles.selectAllText}>
								{selectedItems.length === items.length
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

export default Cart;
