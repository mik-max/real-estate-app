import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image, 
  TextInput,
  KeyboardAvoidingView,
  Platform, 
  ActivityIndicator, 
} from "react-native";
import React, {useState} from "react";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Link, router } from "expo-router";
import {Formik} from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { BASE_URL } from "@/api";
import { getItem, setItem, removeItem } from "@/lib/async-storage";



interface ISignUpData {
     email: string,
     password: string;
}

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);



  const handleLogin = async ({email, password}: ISignUpData) => {
     setIsLoading(true);
    axios.post(`${BASE_URL}/auth/sign-in`, {
          email,
          password
    }).then(async (res) => {
     await setItem('token', res?.data?.data?.token);
     await setItem('isLoggedIn', 'true');
     await setItem('user', JSON.stringify(res?.data?.data));

     setIsLoading(false);
     router.push('/')
    }).catch((err) => {
     console.log(err); setIsLoading(false);
     Alert.alert('Error', err.message)
    })
  
  };
  interface IValues {
     email: string;
     password: string;
  }

  const validationSchema = Yup.object().shape({
     email: Yup.string().email("Invalid email").required("Email is required"),
     password: Yup.string()
       .required("Password is required"),
   });

  return (

      <KeyboardAvoidingView 
      className="bg-white h-full"
      behavior={'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{ flex: 1 }}
      >
      <ScrollView contentContainerClassName="h-full" >
          <View className="flex flex-col h-[100%] py-8 px-8 justify-center">
               {
                    isLoading ? <ActivityIndicator className="text-primary-300" size={"large"} /> : (
                         <>
                         <View className='flex flex-col justify-center items-center'>
                               <Text className='text-4xl font-rubik-medium text-primary-300'>
                                    Welcome Back
                               </Text>
                               <Text className='text-md font-rubik-light text-black-300/60 mt-2'>
                                   Login to your account
                               </Text>
                          </View>
                          <View className='w-full'>
                               <Formik
                               initialValues = {{ email: '', password: "" }}
                               validationSchema={validationSchema}
                               onSubmit={(values: IValues) => handleLogin(values)}
                               >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                                         <>
                                              <View className='flex flex-col mt-4'>
                                                   <TextInput className={`w-full font-rubik text-sm text-black-300 bg-primary-100 py-4 px-4 mt-2 rounded-md ${errors.email && touched?.email ? "border border-red-500 ":""}`} placeholder='Email' onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
                                                   {errors.email && touched.email && <Text className="text-sm font-rubik-medium text-red-500 mt-2">{errors.email}</Text>}
                                              </View>
           
                                              <View className='flex flex-col mt-4'>
                                                   <TextInput className={`w-full font-rubik text-sm text-black-300  py-4 px-4 mt-2 rounded-md ${errors.password && touched?.password ? "border border-red-500 bg-red-100/30 ":"bg-primary-100"}`} secureTextEntry placeholder='Password' onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
                                                   {errors.password && touched.password && <Text className="text-sm font-rubik-medium text-red-500 mt-2">{errors.password}</Text>}
                                              </View>
           
                                              <TouchableOpacity className="bg-primary-300 shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-16" onPress={() => handleSubmit()}>
                                                   <View className="flex flex-row items-center justify-center">
                                                        <Text className="text-lg font-rubik-medium text-white  uppercase">
                                                             Sign In
                                                        </Text>
                                                   </View>
                                              </TouchableOpacity>
                                         </>
                                    )}
                               </Formik>  
                               <Text className="text-sm font-rubik text-black-300/70 text-center mt-4">
                                    Don't have an account? <Link href="/sign-up" className="text-primary-300 font-rubik-extrabold">Sign Up</Link>
                               </Text>
                          
                          </View>
                         </>
                    )
               }
             
          </View>
      </ScrollView>
      </KeyboardAvoidingView>

  );
};

export default SignIn;
