import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme';
import Mail01Icon from './Mail01Icon';
import LockIcon from './LockIcon';

const icons = {
    mail: Mail01Icon,
    lock: LockIcon
}

const Icon = ({ name, ...props}) => {
    const IconComponent = icons[name];
    return (
        <IconComponent 
            height={props.size || SIZES.large}
            width={props.size || SIZES.large}
            color={props.color || COLORS.black}
            {...props}
        />
    )
}

export default Icon