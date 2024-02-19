import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { DummyCart } from "../constants/DummyData";
import CartProduct from "../components/CartProduct";

export default function CartScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState(DummyCart);
  const cartTotal = cart.products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  return (
    <View className="flex-1 bg-white">
      {/*  */}
      <View className="relative p-4  mt-4 border-b-2 border-gray-100">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="absolute z-10 p-1 shadow top-5 left-2 rounded-full p-2  bg-black/50 "
        >
          <ChevronLeftIcon size="28" strokeWidth={3} color="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-2xl">
            Cart ({cart.products.length})
          </Text>
          <Text className="text-center text-gray-500">Alexa Doe</Text>
        </View>
      </View>

      {/* cart products */}
      <View className=" flex-1  shadow-md">
        <ScrollView contentContainerStyle={{ gap: 10 }}>
          {cart.products.map((product) => (
            <CartProduct key={product.id} product={product} />
          ))}
        </ScrollView>
      </View>

      {/* checkout */}
      <View className="flex-row justify-between items-center p-4 border-t-2  border-gray-100 ">
        <View className="flex-row items-center">
          <Text className="font-semibold mr-2">Total</Text>
          <Text className="font-semibold">$ {cartTotal}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Checkout");
          }}
          className="flex-row items-center bg-orange-500 rounded-full p-4"
        >
          <Text className="text-white font-lg font-semibold">Checkout</Text>
          <ChevronRightIcon size={18} strokeWidth={3} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
