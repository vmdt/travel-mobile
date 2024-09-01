import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { SIZES } from '../../constants/theme'

const ReusableBtn = ({
    onPress,
    btnText,
    textColor,
    btnWidth,
    backgroundColor,
    borderWidth,
    borderColor,
    styleBtn,
    styleText
}) => {
  return (
    <TouchableOpacity
        style={[styles.btnStyle(btnWidth, backgroundColor, borderWidth, borderColor), styleBtn]}
        onPress={onPress}
    >
        <Text style={[styles.btnText(textColor), styleText]}>{btnText}</Text>
    </TouchableOpacity>
  )
}

export default ReusableBtn

const styles = StyleSheet.create({
    btnText: (textColor) => ({
        fontFamily: 'medium',
        fontSize: SIZES.medium,
        color: textColor
    }),
    btnStyle: (width, backgroundColor, borderWidth, borderColor) => ({
        width: width,
        backgroundColor: backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        borderRadius: SIZES.small,
        borderColor: borderColor,
        borderWidth: borderWidth
    })
})