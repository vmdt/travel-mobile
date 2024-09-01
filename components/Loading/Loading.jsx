import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'

const Loading = ({ size = 24, color = COLORS.primary }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loading