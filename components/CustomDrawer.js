import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { useNavigation } from "@react-navigation/native";
import {
  HomeIcon,
  LockOpenIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/outline";

export default function CustomDawer(props) {
  const navigation = useNavigation();

  console.log(props);
  return (
    <View className="flex-1">
      <View className=" flex-row items-end p-4 pt-8 space-x-2 border-b-2 border-gray-100 ">
        <Image
          source={require("../assets/logo-small.png")}
          className="w-10 h-10"
        />
        <Text className="text-2xl font-bold color-orange-400">Senmart</Text>
      </View>
      <DrawerContentScrollView>
        {/* <DrawerItemList {...props} /> */}
        <View className="space-y-2">
          <TouchableOpacity
            className="flex-row items-center px-4 py-2 space-x-2 "
            onPress={() => navigation.navigate("Home")}
          >
            <HomeIcon size="25"  color={"black"} />
            <Text className="text-lg ">Home</Text>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity
            className="flex-row items-center p-4 py-2 space-x-2"
            onPress={() => navigation.navigate("Search")}
          >
            <MagnifyingGlassIcon size="25"  color={"black"} />
            <Text className="text-lg ">Search</Text>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity
            className="flex-row items-center p-4 py-2 space-x-2"
            onPress={() => navigation.navigate("Search")}
          >
            <ShoppingBagIcon size="25"  color={"black"} />
            <Text className="text-lg ">Cart</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <View className="flex justify-center items-center p-2 space-y-2">
        <TouchableOpacity
          className="flex justify-center items-center w-full p-2 bg-orange-500"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text className="  text-white text-lg font-semibold">Sign Up</Text>
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity
          className="flex justify-center items-center w-full p-2 bg-gray-200 "
          onPress={() => navigation.navigate("Login")}
        >
          <Text className=" text-lg font-semibold text-gray-700 ">Login</Text>
        </TouchableOpacity>
      </View>
      <View className="flex justify-center items-center p-4">
        <Text className="text-xs color-neutral-500">Senmart</Text>
        <Text className="text-xs color-neutral-500">All rights reserved</Text>
      </View>
    </View>
  );
}