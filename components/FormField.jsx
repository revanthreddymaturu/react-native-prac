import { Image,View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'


const FormField = ({title,value,placeholder,handleChangeText,otherStyles,...props}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 w-full h-12 rounded-xl border-black-200 bg-black-100 focus:border-secondary items-center flex-row">
      <TextInput className="flex-1 font-psemibold text-base text-white"
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#7b7b8b'}
        onChangeText={handleChangeText}
        secureTextEntry={title==='Password' && !showPassword}
        {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      
    </View>
    
  )
}

export default FormField