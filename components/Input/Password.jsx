import { View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import styles from './input.style'
import { COLORS } from '../../constants/theme'

const Password = ({ isObsecure, toggleObsecure, ...props }) => {
    return (
        <View style={[ styles.container, props.containerStyles && props.containerStyles]}>
            {props.icon && props.icon}
            <TextInput 
                style={{ flex: 1 }}
                placeholderTextColor={COLORS.gray}
                ref={props.inputRef && props.inputRef}
                {...props}
            />
            <TouchableOpacity onPress={toggleObsecure}>
                <Ionicons 
                    name={isObsecure ? 'eye-off' : 'eye'} 
                    size={24} 
                    color={COLORS.gray} 
                />
            </TouchableOpacity>
        </View>
  )
}

export default Password