import { Dimensions, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slides } from '../../components';

export default function Onboarding() {
    const slides = [
        {
            id: 1,
            image: require('../../assets/images/1.png'),
            title: 'Find the perfect place to stay',
        },
        {
            id: 2,
            image: require('../../assets/images/2.png'),
            title: 'Find the best Sky in the world',
        },
    ];

    return (
        <FlatList
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            data={slides}
            renderItem={({ item }) => <Slides item={item} />}
            keyExtractor={item => item.id}
        />
    )
}