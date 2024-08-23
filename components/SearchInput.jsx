import { Image,View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'
import { Alert } from 'react-native'

const SearchInput = () => {
  const pathname=usePathname()  
  const [query, setQuery] = useState('')
  return (
    
      <View className="border-2 w-full h-14 rounded-xl border-black-200 bg-black-100 focus:border-secondary  items-center flex-row sapce-x-4">
        <TextInput className="flex-1 mt-5 ml-2 h-[100%]  mb-5 font-pregular text-base text-white  "
            value={query}
            placeholder="Search for a video topic"
            placeholderTextColor={'#CDCDE0'}
            onChangeText={(e)=>setQuery(e)}
            />
        <TouchableOpacity onPress={()=>{
          if(!query){
            return Alert.alert('Please enter a valid search query')
          }
          if(pathname.startsWith('/search')){
            return router.setParams({query})
          }
          else{
            router.push('/search/'+query)
        }}}>
            <Image source={icons.search} className="m-2 w-5 h-5" resizeMode="contain"/>
        </TouchableOpacity>
      </View>
      

    
  )
}

export default SearchInput