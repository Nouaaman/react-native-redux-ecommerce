import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/useContext";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { DummyCart } from "../constants/DummyData";
import CartProduct from "../components/CartProduct";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../state/cartSlice";

export default function CartScreen() {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.cart);

  const [cart, setCart] = useState([]);

  const handleCartNavigation = () => {
    if (userInfo.data?.token !== undefined) {
      return navigation.navigate("Cart");
    }
    return navigation.navigate("Login");
  };

  useEffect(() => {
    dispatch(fetchCart(userInfo.data?.token));
  }, []);

  return (
    <View className="flex-1 bg-white">
      {/*  */}
      <View className="relative flex p-4 pb-8  mt-8 border-b-2 border-gray-100 items-center justify-center  ">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="absolute z-10 p-1 shadow top-2 left-4 rounded-full p-2  bg-black/50 "
        >
          <ChevronLeftIcon size="28" strokeWidth={3} color="white" />
        </TouchableOpacity>

        <Text className="text-center font-bold text-2xl">Cart</Text>
      </View>

      {/* cart products */}

      <View className=" flex-1  shadow-md">
        <ScrollView contentContainerStyle={{ gap: 10 }}>
          {cartData.cart?.products?.length
            ? cartData.cart?.products.map((product, index) => (
                <CartProduct key={index} product={product} />
              ))
            : ""}
        </ScrollView>
      </View>

      {/* checkout */}
      <View className="flex-row justify-between items-center px-4 py-2 border-t-2  border-gray-100 ">
        <View className="flex-row items-center">
          <Text className="font-semibold mr-2">Total</Text>
          <Text className="font-semibold">
            $ {Number.parseFloat(cartData.cart?.total).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Checkout", cartData.cart.total);
          }}
          className="flex-row items-center bg-orange-500 rounded-full p-4"
        >
          <Text className="text-white text-base font-semibold">Checkout</Text>
          <ChevronRightIcon size={18} strokeWidth={3} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
