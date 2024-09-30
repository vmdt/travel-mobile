import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { TourAPI } from "../../api";
import TourCard from "../CardItem/TourCard";

const Listings = ({ listings, category }) => {
	const [loading, setLoading] = useState(false);
	const [tours, setTours] = useState([]);

	useEffect(() => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 200);

		const fetchTour = async () => {
			const response = await TourAPI.getToursByCategory(category);
			setTours(response.metadata.tours);
		};

		if (category) {
			fetchTour();
		}
	}, [category]);

	const renderItems = ({ item }) => {
		return <TourCard item={item} />;
	};

	return (
		<View>
			<FlatList
				data={loading ? [] : tours}
				renderItem={renderItems}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default Listings;
