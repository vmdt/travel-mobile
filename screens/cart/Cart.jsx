import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { TourAPI } from "../../api";
import {
	CheckAvailabilityModal,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { updateCheckout } from "../../redux/actions/bookingAction";
import {
	deleteCartItem,
	getListCart,
	updateCartItem,
} from "../../redux/actions/cartAction";
import { formatCurrency, formatDate } from "../../utils";
import styles from "./cart.style";

const Cart = () => {
	const [items, setItems] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedTourData, setSelectedTourData] = useState(null);
	const { accessToken } = useSelector((state) => state.auth);
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.auth);

	const [editingItem, setEditingItem] = useState(null);

	const handleUpdateItem = ({ itemId, startDate, participants }) => {
		const updateData = {
			user: user?._id,
			tour: {
				itemId,
				startDate,
				participants,
			},
		};

		dispatch(updateCartItem(updateData, accessToken));
		setItems((prev) =>
			prev.map((item) => {
				if (item._id === itemId) {
					return {
						...item,
						startDate,
						participants,
					};
				}
				return item;
			}),
		);

		setModalVisible(false);
	};

	const handleCheckoutReview = async () => {
		let tours = [];
		if (selectedItems.length > 0) {
			tours = items.reduce((filteredTours, item) => {
				if (selectedItems.includes(item?._id)) {
					filteredTours.push({
						tour: item?.tour?._id,
						startDate: formatDate(item?.startDate),
					});
				}
				return filteredTours;
			}, []);
		}

		await dispatch(
			updateCheckout({
				cart: cart?._id,
				tours,
			}),
		);

		navigation.navigate("Checkout");
	};

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
		if (selectedItems?.length === items?.length) {
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
		if (isFocused) {
			dispatch(getListCart(accessToken));
		}
	}, [isFocused]);

	useEffect(() => {
		if (cart?.tours) {
			setItems(cart.tours);
		}
	}, [cart?.tours]);

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
							{item?.participants?.length > 0
								? item?.participants
										.map((guest) => `${guest?.title} x${guest?.quantity} `)
										.join(", ")
								: "Select participant"}
						</Text>
					</View>
				</View>
				{item?.isPrivate && item.hotels?.length > 0 && (
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Icon name="hotel" size={24} color="black" />
						<Text style={{ fontSize: 16, marginLeft: 8 }}>
							{item.hotels[0].name}
						</Text>
					</View>
				)}
				{item?.isPrivate && item.transports?.length > 0 && (
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
					<TouchableOpacity
						style={styles.editButton}
						onPress={async () => {
							const tourResponse = await TourAPI.getTourById(item.tour._id);
							setSelectedTourData(tourResponse.metadata);
							setEditingItem(item);
							setModalVisible(true);
						}}
					>
						<Text>Edit</Text>
						<CheckAvailabilityModal
							isOpen={modalVisible}
							onClose={() => {
								setModalVisible(false);
								setEditingItem(null);
							}}
							tourDetail={selectedTourData}
							editingItem={editingItem}
							handleUpdateItem={handleUpdateItem}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.deleteButton}
						onPress={async () => {
							await dispatch(
								deleteCartItem(
									{
										cartId: cart._id,
										itemId: item._id,
									},
									accessToken,
								),
							);
							setItems((prev) => prev.filter((i) => i._id !== item._id));
						}}
					>
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
				<Text style={styles.header}>
					Booking Cart ({selectedItems?.length})
				</Text>
				{items?.length === 0 ? (
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
						keyExtractor={(item) => item._id}
						contentContainerStyle={styles.listContainer}
					/>
				)}
				<View style={styles.footer}>
					<TouchableOpacity onPress={handleSelectAll}>
						<View style={styles.selectAllContainer}>
							<Text style={styles.selectAllText}>
								{selectedItems?.length === items?.length
									? "Deselect all"
									: "Select all"}
							</Text>
						</View>
					</TouchableOpacity>
					<Text style={styles.totalPrice}>{calculateTotalPrice()}</Text>
					<TouchableOpacity
						style={[
							styles.checkoutButton,
							selectedItems.length == 0 && { opacity: 0.5 },
						]}
						disabled={selectedItems.length == 0}
						onPress={handleCheckoutReview}
					>
						<Text style={styles.checkoutText}>Check out</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScreenWrapper>
	);
};

export default Cart;
