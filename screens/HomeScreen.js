import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { ShoppingBagIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [cartTotal, setCartTotal] = useState(2);

  const [categories, setCategories] = useState([
    { id: 1, name: "Men's clothes" },
    { id: 2, name: "Women's clothes" },
    { id: 3, name: "Accessories" },
    { id: 4, name: "Jewelry" },
    { id: 5, name: "Fragrances" },
  ]);
  const [activeCategory, setActiveCategory] = useState(0);

  const product = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 3.9, count: 120 },
  };

  return (
    <View className="flex-1 bg-neutral-100">
      <SafeAreaView>
        <View className="flex-row justify-between items-center mt-2 px-4">
          <View className="flex-row justify-center items-end gap-1">
            <Image
              source={require("../assets/logo-small.png")}
              className="w-10 h-10"
            />
            <Text className="text-2xl font-bold color-neutral-600">
              Senmart
            </Text>
          </View>
          {/* cart and search buttons */}
          <View className="flex-row justify-between items-center gap-4">
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-center items-start"
              onPress={() => navigation.navigate("Cart")}
            >
              <ShoppingBagIcon size="30" color={"#555"} />
              <Text className=" text-xs font-semibold">{cartTotal}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* categories */}
      <View className="px-4 mt-4">
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="overflow-visible"
          renderItem={({ item }) => {
            let isActive = item.id === activeCategory;
            let activeTextClass = isActive ? "text-white" : "text-neutral-700";
            return (
              <TouchableOpacity
                className="p-3  bg-neutral-200 mr-2 rounded-full"
                style={{
                  backgroundColor: isActive
                    ? "rgb(249 ,115, 22)"
                    : "rgb(229 ,229 ,229)",
                }}
                onPress={() => setActiveCategory(item.id)}
              >
                <Text className={"font-semibold " + activeTextClass}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* products */}
      <ScrollView className="mt-4">
        <View className="px-4">
          <Text className="text-lg font-semibold">Featured products</Text>
        </View>
        <View className="flex-row justify-around flex-wrap px-4 mt-4">
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
        </View>
      </ScrollView>

      {/* test nav */}
      
      <View className="flex-row">
        <Button
          title="login"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
        <Button
          title="sign up"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        />
      </View>
      
    </View>
  );
}
