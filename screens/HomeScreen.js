import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useContext } from "react";
import { Bars3Icon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { ShoppingBagIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";
import Categories from "../components/Categories";

import { fetchProducts } from "../state/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../context/useContext";

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.product);
  const cartData = useSelector((state) => state.cart);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCartNavigation = () => {
    if (userInfo.data?.token !== undefined) {
      return navigation.navigate("Cart");
    }
    return navigation.navigate("Login");
  };

  return (
    <View className="flex-1 bg-neutral-50">
      <SafeAreaView>
        <View className="flex-row justify-between items-center mt-2 px-4">
          <View className="flex-row justify-center items-end gap-2">
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <Bars3Icon size="35" strokeWidth={2} color="#555" />
            </TouchableOpacity>
            <Image
              source={require("../assets/logo-small.png")}
              className="w-10 h-10"
            />
            <Text className="text-2xl font-bold color-orange-400">Senmart</Text>
          </View>
          {/* cart and search buttons */}
          <View className="flex-row justify-between items-center gap-4">
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-center items-start"
              onPress={() => handleCartNavigation()}
            >
              <ShoppingBagIcon size="30" color={"#555"} />
              <Text className=" text-sm font-semibold">
                {cartData.cart.products ? cartData.cart.products.length : 0}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* categories */}
      <Categories />

      {/* products */}
      <ScrollView className="mt-2">
        <View className="px-4">
          <Text className="text-lg font-semibold">Featured products</Text>
        </View>
        <View className="flex-row justify-around flex-wrap px-4 mt-4">
          {productData.loading ? (
            <ActivityIndicator size="large" color={"orange"} />
          ) : (
            productData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
