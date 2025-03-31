import {
     View,
     Text,
     ScrollView,
     TouchableOpacity,
     Alert,
     ImageBackground,
     StatusBar
   } from "react-native";
   import { SafeAreaView } from "react-native-safe-area-context";
   import images from "@/constants/images";
   import React from "react";
   import { login } from "@/lib/appwrite";
   import { useGlobalContext } from "@/lib/global-provider";
   import { Link, router } from "expo-router";
   
   const Welcome = () => {
     return (
       <SafeAreaView className="bg-white h-full">
         <ScrollView contentContainerClassName="h-full" >
           <ImageBackground source={images.welcome} className="w-full h-full" resizeMode="cover">
             <View className="flex justify-end h-full px-8 pb-24">
                  <View className="">
                       <Text className="text-4xl text-left font-rubik-light text-white">
                       Find Your <Text className="font-rubik-medium">Dream</Text> {"\n"}
                       <Text className="font-rubik-medium">Home</Text> on the Go
                       </Text>
   
                       <Text className="text-md font-rubik text-white/70 text-left mt-4">
                       Scroll, Select and Let's Get Started
                       </Text>
   
                       <TouchableOpacity
                       className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-8"
                       onPress={() => router.push("/sign-up")}
                       >
                       <View className="flex flex-row items-center justify-center">
                       <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                           Get Started
                       </Text>
                       </View>
                       </TouchableOpacity>
                       <Text className="text-sm font-rubik text-white/70 text-center mt-4">
                       Already have an account? <Link href="/sign-in" className="text-white font-rubik-extrabold">Sign In</Link>
                       </Text>
                  </View>
             </View>
           </ImageBackground>
          
         </ScrollView>
       </SafeAreaView>
     );
   };
   
   export default Welcome;
   