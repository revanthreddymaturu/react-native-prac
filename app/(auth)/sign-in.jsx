import { Image,View, Text,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { supabase } from '../../lib/supabase'
import { Alert } from 'react-native'
import { useSessionContext } from '../../utils/SessionProvider'
import { Redirect } from 'expo-router'

const SignIn = () => {
    const {session} = useSessionContext();
  if(session!=null){
    return <Redirect href="/home" />;
  }
    const [form,setForm]=useState({
        email:'',
        password:''
    })
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })
    
        if (error) Alert.alert(error.message)
        else{
          router.replace('/home')
      }
      setLoading(false) 
      }

  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
            <View className="w-full justify-center min-h-[80vh] my-2 px-4">
                <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">Log in to Moments</Text>
                <FormField
                title="Email"
                value={form.email}
                handleChangeText={(e)=>{
                    setForm({...form,email:e})
                }}
                otherStyles="mt-6"
                keyboardType="email-address"
                
                />
                <FormField
                title="Password"
                value={form.password}
                handleChangeText={(e)=>{
                    setForm({...form,password:e})
                }}
                otherStyles="mt-6"
                />

                <CustomButton title="Sign in" isLoading={loading} handlePress={signInWithEmail} containerStyles="mt-7"/>
                <View className="flex justify-center pt-5 flex-row gap-2">
                    <Text className="text-lg text-gray-100 font-pregular">
                        Don't have an account?
                    </Text>
                    <Link
                    href="/sign-up"
                    className="text-lg font-psemibold text-secondary"
                    >
                        Sign Up
                    </Link>
                </View>

            </View>        
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light"></StatusBar>

    </SafeAreaView>
  )
}

export default SignIn