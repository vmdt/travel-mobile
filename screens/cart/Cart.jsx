import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const cartItems = [
    {
        id: '1',
        title: 'Dalat: Sunrise',
        description: 'Hike the second highest mountain peek in Dalat and be...',
        location: 'DaLat - VietNam',
        price: '1.500.000 VNĐ',
        imageUrl: 'https://example.com/image1.jpg',
    },
    {
        id: '2',
        title: 'Dalat: Sunrise',
        description: 'Hike the second highest mountain peek in Dalat and be...',
        location: 'DaLat - VietNam',
        price: '1.500.000 VNĐ',
        imageUrl: 'https://example.com/image2.jpg',
    },
];

const Cart = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [showCheckbox, setShowCheckbox] = useState(false);

    const toggleSelectItem = (id) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(item => item !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const toggleCheckboxVisibility = () => {
        setShowCheckbox(!showCheckbox);
    };

    const handleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            // Nếu tất cả đã được chọn, thì bỏ chọn hết
            setSelectedItems([]);
        } else {
            // Chọn tất cả các mục
            setSelectedItems(cartItems.map(item => item.id));
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
            {showCheckbox && (
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        checked={selectedItems.includes(item.id)}
                        onPress={() => toggleSelectItem(item.id)}
                    />
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Shopping Cart ({selectedItems.length})</Text>
            <TouchableOpacity style={styles.selectButton} onPress={toggleCheckboxVisibility}>
                <Text style={styles.selectButtonText}>{showCheckbox ? 'Cancel' : 'Select'}</Text>
            </TouchableOpacity>
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
                            {selectedItems.length === cartItems.length ? 'Deselect all' : 'Select all'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.totalPrice}>3.000.000đ</Text>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutText}>Check out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
    },
    selectButton: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 16,
        borderRadius: 8,
    },
    selectButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 16,
        padding: 8,
        alignItems: 'center',
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
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    location: {
        fontSize: 12,
        color: '#888',
        marginVertical: 4,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    editButton: {
        marginRight: 12,
    },
    deleteButton: {
        marginRight: 12,
    },
    price: {
        marginLeft: 'auto',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        marginLeft: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    selectAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectAllText: {
        marginLeft: 8,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    checkoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Cart;
