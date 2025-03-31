import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import { Link , router} from 'expo-router';
import React from 'react';
import { Formik } from 'formik';
import { BASE_URL } from '@/api';
import * as Yup from "yup";
import axios from 'axios';


interface ISignUpData {
     email: string,
     password: string;
     name: string;  
     confirm_password: string;
}
const SignUpSchema = Yup.object().shape({
     email: Yup.string().email("Invalid email").required("Email is required"),
     password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
     name: Yup.string().required("Name is required"),
     confirm_password: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm Password is required')
})
const initialValues: ISignUpData = {
     email: "",
     password: "",
     name: "",
     confirm_password: ""
}
const SignUp = () => {
     const [isLoading, setIsLoading] = useState(false);

     const handleSignUp = async (values: ISignUpData) => {
          setIsLoading(true);
          console.log(values);
          axios.post(`${BASE_URL}/auth/sign-up`, {
               email: values.email,
               password: values.password,
               name: values.name
          }).then(async (res) => {
               console.log(res.data);
               router.push('/sign-in');
               setIsLoading(false);
          }).catch((err) => {
               console.log(err); 
               setIsLoading(false);
          })
     }
  return (
    <SafeAreaView className='bg-white h-full px-8 '>
      <ScrollView className='h-full'>
          {
               isLoading ? <View className='h-screen flex items-center justify-center'>
                    <ActivityIndicator className="text-primary-300" size={"large"} />
               </View> : (
                    <View className='flex flex-col justify-center h-screen relative'>
               <View className='flex flex-row items-center absolute top-10 left-0'>
                    <TouchableOpacity
                         onPress={() => router.back()}
                         className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                    >
                         <Image source={icons.backArrow} className="size-5" />
                    </TouchableOpacity>
               </View>
                 <View className='flex flex-col justify-center items-center'>
                    <Text className='text-4xl font-rubik-medium text-primary-300'>
                         Sign Up
                    </Text>
                    <Text className='text-md font-rubik-light text-black-300/60 mt-2'>
                         Create an account to get started
                    </Text>
                 </View>

                 <View className='w-full'>
                   <Formik
                         initialValues={initialValues}
                         validationSchema={SignUpSchema}
                         onSubmit={(values: ISignUpData) => handleSignUp(values)}
                   >

                    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                         <>
                              <View className='flex flex-col mt-8'>
                    <TextInput className='w-full font-rubik text-sm text-black-300  bg-primary-100 py-4 px-4 mt-2 rounded-md' placeholder='Full Name' onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
                    {errors.name && touched.name && <Text className="text-sm font-rubik-medium text-red-500 mt-2">{errors.name}</Text>}
               </View>

               <View className='flex flex-col mt-4'>
               <TextInput className='w-full font-rubik text-sm text-black-300   bg-primary-100 py-4 px-4 mt-2 rounded-md' placeholder='Email' onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
               {errors.email && touched.email && <Text className="text-sm font-rubik-medium text-red-500 mt-2">{errors.email}</Text>}
               </View>

               <View className='flex flex-col mt-4'>
                    
               <TextInput className='w-full font-rubik text-sm text-black-300   bg-primary-100 py-4 px-4 mt-2 rounded-md' secureTextEntry placeholder='Password' onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
               {errors.password && touched.password && <Text className="text-sm font-rubik-medium text-red-500 mt-2">{errors.password}</Text>}
               </View>

               <View className='flex flex-col mt-4'>
                    <TextInput className='w-full font-rubik text-sm text-black-300   bg-primary-100 py-4 px-4 mt-2 rounded-md' secureTextEntry  placeholder='Confirm Password' onChangeText={handleChange('confirm_password')} onBlur={handleBlur('confirm_password')} value={values.confirm_password} />
                    {errors.confirm_password && touched.confirm_password && <Text className="text-sm font-rubik-medium text-red-500 mt-2">{errors.confirm_password}</Text>}
               </View>

                    <TouchableOpacity className="bg-primary-300 shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-8" onPress={() => handleSubmit()}>
                    <View className="flex flex-row items-center justify-center">
                         <Text className="text-lg font-rubik-medium text-white  uppercase">
                              Sign Up
                         </Text>
                    </View>
               </TouchableOpacity>
               <Text className="text-sm font-rubik text-black-300/70 text-center mt-4">
                    Already have an account? <Link href="/sign-in" className="text-primary-300 font-rubik-extrabold">Sign In</Link>
               </Text>
                         </>
                    )}
                   </Formik>

                   
                 </View>
          </View>
               )
          }
          
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp