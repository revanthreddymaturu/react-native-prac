import { TouchableOpacity,Text } from 'react-native'
import React from 'react'

const CustomButton = ({title,handlePress,containerStyles,textStyles,isLoading}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress} disabled={isLoading}
    className={`bg-secondary items-center justify-center rounded-lg p-2 ${containerStyles} ${isLoading?'opacity-50':''}`}>
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`} >{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton