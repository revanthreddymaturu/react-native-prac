import { Link,Redirect,router } from "expo-router";
import { Text, View,ScrollView,Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from "../constants";
import CustomButton from "../components/CustomButton";
import { useEffect } from "react";
import { useSessionContext } from "@/utils/SessionProvider";
export default function Index() {
  if(useSessionContext().session!=null){
    return <Redirect href="/home" />;
  }
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary h-full">
      <ScrollView className="w-full" contentContainerStyle={{height:'100%'}}>
        <View className="justify-start items-center px-4">
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain"/>
          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain" />

          <View className="relative mt-5">
            <Text className="text-white text-3xl font-bold text-center">
              Discover Endless Possibilities with{' '}
              <Text className="text-secondary-200">Moments!</Text>
            </Text>
            <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8" resizeMode="contain"/>   
          </View>  
          <Text className="text-sm font-pregular text-gray-100 mt-5 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Moments</Text>
          <CustomButton 
          title="Continue with Email" 
          handlePress={()=>router.push('/sign-in')}
          containerStyles="mt-5 font-bold"
          ></CustomButton>    
        </View>

      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"></StatusBar>
      
    </SafeAreaView>
  );
}
