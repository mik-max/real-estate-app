import { Text, View, Image, TouchableOpacity,  FlatList, ActivityIndicator, } from "react-native";
import Search from "@/components/Search";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { FeaturedCard, Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import { useLocalSearchParams, router } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import NoResults from "@/components/NoResults";
import { useEffect, useState } from "react";
import { getItem } from "@/lib/async-storage";
import { BASE_URL } from "@/api";
import axios from "axios";



interface IPropertiesQuery{
     type?: string;
     status?: string;
     leaseType?: string;
     limit?: number;
     page?: number;
}
interface User {
     avatar: string;
     name: string;
     token: string
}
export default function Index() {
    

     const [user, setUser] = useState<User>();
     const [properties, setProperties] = useState<{ data: any[] }>();
     const [isLoading, setIsLoading] = useState(false);
     const [isLoadingStorage, setIsLoadingStorage] = useState(true);

     useEffect(() => {
          const getUserData = async () => {
               try {
                    setIsLoadingStorage(true);
                 const userString = await getItem('user');
                 console.log("user string",userString);
                 setUser(userString ? JSON.parse(userString) : null);
                 setIsLoadingStorage(false);
               } catch (error) {
                 console.error('Failed to get login status:', error);
                 setIsLoadingStorage(false);
               }
          };
         
             getUserData();
     }, [])
     
     console.log("User", user);


     const params = useLocalSearchParams<{query?: string; filter?: string;}>();
     // const {data: latestProperties, loading: latestPropertiesLoading} = useAppwrite({
     //      fn: getLatestProperties
     // });
     const getProperties = async ( {leaseType, type, limit, page, status}:IPropertiesQuery ) => {
          setIsLoading(true);
               axios.get(`${BASE_URL}/properties?${status? `status=${status}&`: ''}${page? `page=${page}&`: ""}${limit? `limit=${limit}&`: ""}${type? `type=${type}&`: ""} ${leaseType? `leaseType=${leaseType}&`: ""}`, {headers: {'Authorization': `Bearer ${user?.token}`}})
               .then((res) => {setProperties(res.data); console.log(res.data); setIsLoading(false);})
               .catch((err) => {console.log(err); router.push('/sign-in')})
     }

     // const {data: properties, loading, refetch} = useAppwrite({
     //      fn: getProperties,
     //      params:{
     //           filter: params.filter!,
     //           query: params.query!,
     //           limit: 6
     //      },
     //      skip: true,
     // });

     const handleCardPress = (id: string) => {
          router.push(`/properties/${id}`)
     }

     useEffect(() => {
          if(!isLoadingStorage && user){
               getProperties({
                    limit: 6
               })
          }
       
     }, [user, isLoadingStorage])
     
  return (
    <SafeAreaView className="bg-white h-full">
     <FlatList data={properties?.data} renderItem={({item}) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
          ListHeaderComponent={
               <View className="px-5">
          <View className="flex flex-row items-center justify-between mt-5">
               <View className="flex flex-row">
                    {/* <Image source={{uri: user?.data?.avatar}} className="size-12 rounded-full" /> */}
                    <View className="flex flex-col items-start, ml-2 justify-center">
                         <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                         <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                    </View>
               </View>
               <Image source={icons.bell} className="size-6" />
          </View>
          <Search/>
          <View className="my-5">
               <View className="flex flex-row items-center justify-between">
                    <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                    <TouchableOpacity>
                         <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                    </TouchableOpacity>
               </View>
               {
                    isLoading ? (<ActivityIndicator size={'large'} className="text-primary-300"/>): !properties?.data || properties?.data?.length === 0 ? <NoResults/> :(
                         <FlatList 
                         data = {properties?.data} 
                         renderItem={({item}) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)}/>}  
                         keyExtractor={(item) => item.$id} 
                         horizontal
                         bounces={false}
                         showsHorizontalScrollIndicator={false}
                         contentContainerClassName="flex gap-5 mt-5"
                         />
                    )
               }
              
           
          </View>

          <View className="flex flex-row items-center justify-between">
               <Text className="text-xl font-rubik-bold text-black-300">Our Recommendation</Text>
               <TouchableOpacity>
                    <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
               </TouchableOpacity>
          </View>
          <Filters/>

               </View>
          }

          keyExtractor={(item) => item.$id}
          numColumns={2}
          contentContainerClassName="pb-32"
          columnWrapperClassName="flex gap-5 px-5"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={isLoading ?  (<ActivityIndicator size={'large'} className="text-primary-300 mt-5"/>): <NoResults/>}
     />

     
    </SafeAreaView>
  );
}
