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
import { AppState } from 'react-native'
import { useSessionContext } from '../../utils/SessionProvider'
import { Redirect } from 'expo-router'
// AppState.addEventListener('change', (state) => {
//   if (state === 'active') {
//     supabase.auth.startAutoRefresh()
//   } else {
//     supabase.auth.stopAutoRefresh()
//   }
// })
const SignUp = () => {
  const {session} = useSessionContext();
  if(session!=null){
    const { id,user_metadata:{username} } = session.user
    createUser(id,username)
    return <Redirect href="/home" />;
  }
  async function createUser(id,username){
    const response=await supabase
    .schema('aora')
    .from('users')
    .insert({ id:id,username:username })
    console.log('response: '+JSON.stringify(response));
  }  
    const [form,setForm]=useState({
        username:'',
        email:'',
        password:''
    })
    const [loading, setLoading] = useState(false)

    async function signUpWithEmail() {
      setLoading(true)
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { username: form.username } },
      })
     

      
  
      if (error) Alert.alert(error.message)
      else{
          router.replace('/home')
      }
      if (!session) Alert.alert('Please try again!')
      
    }
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
            <View className="w-full justify-center min-h-[80vh] my-2 px-4">
                <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]"/>
                <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">Sign up to Moments</Text>
                <FormField
                title="Username"
                value={form.username}
                handleChangeText={(e)=>{
                    setForm({...form,username:e})
                }}
                otherStyles="mt-6"
                
                />
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

                <CustomButton isLoading={loading} title="Sign up" handlePress={signUpWithEmail} containerStyles="mt-7"/>
                <View className="flex justify-center pt-5 flex-row gap-2">
                    <Text className="text-lg text-gray-100 font-pregular">
                        Have an account already?
                    </Text>
                    <Link
                    href="/sign-in"
                    className="text-lg font-psemibold text-secondary"
                    >
                        Sign In
                    </Link>
                </View>

            </View>        
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light"></StatusBar>

    </SafeAreaView>
  )
}

export default SignUp