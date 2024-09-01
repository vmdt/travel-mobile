import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import styles from './input.style'

const Input = (props) => {
  return (
    <View style={[ styles.container, props.containerStyles && props.containerStyles]}>
        {props.icon && props.icon}
        <TextInput 
            style={{ flex: 1 }}
            placeholderTextColor={COLORS.gray}
            ref={props.inputRef && props.inputRef}
            {...props}
        />
    </View>
  )
}

export default Input
