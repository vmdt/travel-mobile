import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ReusableText = ({ text, family, size, color, style }) => {
  return (
    <Text style={[styles.textStyle(family, size, color), style]}>{text}</Text>
  )
}

export default ReusableText

const styles = StyleSheet.create({
    textStyle: (family, size, color) => ({
        fontFamily: family,
        fontSize: size,
        color: color
    })
})