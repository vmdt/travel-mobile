import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import TourCard from "../CardItem/TourCard";

const Listings = ({ listings, category }) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 200);
	}, [category]);

	const renderItems = ({ item }) => {
		return <TourCard item={item} />;
	};

	return (
		<View>
			<FlatList
				data={loading ? [] : listings}
				renderItem={renderItems}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default Listings;
