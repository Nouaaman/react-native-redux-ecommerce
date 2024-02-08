import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { ShoppingCartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

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
  const [activeCategory, setActiveCategory] = useState(1);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-neutral-100">
      <SafeAreaView>
        <View className="flex-row justify-between items-center mt-2 px-4">
          <View className="flex-row justify-center items-end gap-1">
            <Image
              source={require("../assets/logo-small.png")}
              className="w-10 h-10"
            />
            <Text className="text-2xl font-bold color-neutral-700">
              Senmart
            </Text>
          </View>
          {/* cart and search buttons */}
          <View className="flex-row justify-between items-center gap-4">
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-center items-start"
              onPress={() => navigation.navigate("Cart")}
            >
              <ShoppingCartIcon size="30" color={"#333"} />
              <Text className=" text-xs font-bold color-orange-700">
                {cartTotal}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* categories */}
      <View className="px-4 mt-6">
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

      {/* test nav */}
      <View>
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
