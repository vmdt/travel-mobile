import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Cart, Chat, Home, Profile } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();
const tabBarStyle = {
    paddingTop: 20,
    borderRadius: 25,
    height: 80,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
}

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false, 
            }}
        >
            <Tab.Screen name='Home' component={Home} options={{
                tabBarStyle: tabBarStyle,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Ionicons 
                        name={focused ? "grid" : 'grid-outline'} 
                        size={26} 
                        color={focused ? COLORS.red : COLORS.gray } 
                    />
                ),
            }} />

            <Tab.Screen name='Chat' component={Chat} options={{
                tabBarStyle: tabBarStyle,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Ionicons 
                        name={focused ? "chatbubbles" : 'chatbubbles-outline'} 
                        size={26} 
                        color={focused ? COLORS.red : COLORS.gray } 
                    />
                ),
            }}/>

            <Tab.Screen name='Cart' component={Cart} options={{
                tabBarStyle: tabBarStyle,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Ionicons 
                        name={focused ? "cart" : 'cart-outline'} 
                        size={26} 
                        color={focused ? COLORS.red : COLORS.gray } 
                    />
                ),
            }}/>

            <Tab.Screen name='Profile' component={Profile} options={{
                tabBarStyle: tabBarStyle,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Ionicons 
                        name={focused ? "person" : 'person-outline'} 
                        size={26} 
                        color={focused ? COLORS.red : COLORS.gray } 
                    />
                ),
            }}/>
        </Tab.Navigator>
    )
}

export default BottomTabNavigation