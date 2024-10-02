import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Provider as PaperProvider } from "react-native-paper"; // Thêm import
import { SearchAPI } from "../../api";
import {
	BackButton,
	ReusableText,
	SearchCard,
	SearchInput,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import styles from "./search.style";

const mockData = [
	{
		thumbnail: "",
		title: "Ho Chi Minh City, Viet Nam",
		description:
			"Description for Place  descri for Place 1 Description for Place 1 Description for Place 1",
		price: "$100",
		rating: 4.5,
		type: "Location 1",
	},
	{
		thumbnail: "",
		title: "Place 2",
		description: "Description for Place 2",
		price: "$150",
		rating: 4.0,
	},
];

const Search = () => {
	const navigation = useNavigation();
	const [searchResults, setSearchResults] = useState([]);
	const searchInputRef = useRef(null);

	useEffect(() => {
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, []);

	const handleSearch = async (query) => {
		if (query.trim() === "") {
			setSearchResults([]);
			return;
		}
		const response = await SearchAPI.search(query);
		if (response.metadata.suggestions.length === 0) {
			setSearchResults([]);
			return;
		}
		setSearchResults(response.metadata.suggestions);
	};

	return (
		<PaperProvider>
			<View>
				<Appbar.Header
					theme={{ colors: { primary: COLORS.lightWhite } }}
					style={{ elevation: 0 }}
				>
					<View style={styles.header}>
						<BackButton
							size={SIZES.large}
							onPress={() => navigation.goBack()}
							customStyle={{ alignSelf: "center" }}
						/>
						<SearchInput
							handleSearch={handleSearch}
							icon={<Ionicons name="search" size={24} color={COLORS.black} />}
							placeholder="Search for places"
							containerStyles={{ height: 60, flex: 1 }}
							inputRef={searchInputRef}
							onChangeText={handleSearch}
						/>
					</View>
				</Appbar.Header>
			</View>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					{searchResults.length === 0 ? (
						<View style={styles.noResult}>
							<ReusableText
								text="No results found"
								family="medium"
								size={SIZES.large}
								color={COLORS.green}
							/>
						</View>
					) : (
						searchResults.map((item, index) => (
							<View key={index} style={styles.card}>
								<SearchCard item={item} />
							</View>
						))
					)}
				</ScrollView>
			</View>
		</PaperProvider>
	);
};

export default Search;
