import { useGlobalContext } from "@/lib/global-provider";
import { ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Slot } from "expo-router";
import { getItem } from "@/lib/async-storage";

export default function AppLayout() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
            setLoading(true);
        const status = await getItem('isLoggedIn');
        setIsLoggedIn(status);
        console.log(status);
            setLoading(false);
      } catch (error) {
        console.error('Failed to get login status:', error);
          setLoading(false);
      }
    };

    checkLoginStatus();

  }, []);
  console.log("Here is", isLoggedIn)
  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size={"large"} />
      </SafeAreaView>
    );
  }
  if (!isLoggedIn && !loading) return <Redirect href={"/welcome"} />;
  return <Slot />;
}
