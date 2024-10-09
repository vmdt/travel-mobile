import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

export function formatCurrency(amount) {
  const amountString = amount.toString();
  const amountArray = amountString.split('');
  const reversedArray = amountArray.reverse();
  let resultArray = [];
  for (let i = 0; i < reversedArray.length; i++) {
      if (i > 0 && i % 3 === 0) {
          resultArray.push('.');
      }
      resultArray.push(reversedArray[i]);
  }

  const formattedAmount = resultArray.reverse().join('');
  return formattedAmount + ' VNĐ';
}

const MenuItem = (props) => {
  const { quantity = 0, type, price, setType, setQuantity, setPrice } = props;
  const [count, setCount] = useState(quantity);
  const [start, setStart] = useState(true);

  function increaseQuantityHandler() {
    setCount(count + 1);
    setStart(false);
  }

  function decreaseQuantityHandler() {
    if (count > 0) {
      setCount(count - 1);
      setStart(false);
    }
  }

  useEffect(() => {
    if (!start) {
      setType(type ?? '');
      setQuantity(count);
      setPrice(price ?? 0);
    } else { 
      setStart(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemType}>{type}</Text>
        <Text style={styles.itemPrice}>price: {formatCurrency(price ?? 0)}</Text>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={count <= 0 ? styles.disabledButton : styles.activeButton}
          onPress={decreaseQuantityHandler}
          disabled={count <= 0}
        >
          <Ionicons name='remove-circle-sharp' size={24} color={COLORS.black}/>
        </TouchableOpacity>
        <Text style={styles.countText}>{count}</Text>
        <TouchableOpacity
          style={styles.activeButton}
          onPress={increaseQuantityHandler}
        >
          <Ionicons name='add-circle-sharp' size={24} color={COLORS.black}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 4,
  },
  itemDetails: {
    justifyContent: 'center',
  },
  itemType: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeButton: {
    padding: 4,
  },
  disabledButton: {
    padding: 4,
    opacity: 0.5,
  },
  countText: {
    borderWidth: 1,
    borderColor: 'rgba(26, 43, 73, 0.2)',
    textAlign: 'center',
    width: 32,
    height: 32,
    lineHeight: 32,
    borderRadius: 4,
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
});

export default MenuItem;
