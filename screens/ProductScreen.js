import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { HeartIcon, StarIcon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
export default function ProductScreen(props) {
  const product = props.route.params;
  const navigation = useNavigation();

  const [size, setSize] = useState("s");
  const [quantity, setQuantity] = useState(1);

  const handleMinusBtn = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handlePlusBtn = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 "
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <StatusBar style="inverted" />
        <View
          className
          style={{
            shadowOffset: { width: 0, height: 8 },
            shadowColor: "#aaa",
            shadowOpacity: 0.1,
          }}
        >
          <Image
            source={{ uri: product.image }}
            className="w-full"
            style={{ height: 300 }}
          />
        </View>
        <SafeAreaView className="absolute px-4 w-full flex-row justify-between items-center py-2 ">
          <TouchableOpacity
            className="rounded-xl p-2 bg-orange-500 "
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={3} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-full p-2 border-2 border-gray-400 ">
            <HeartIcon size="24" strokeWidth={2} color="#aaa" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* details */}
        {/* <View className="flex-row items-center bg-orange-300 rounded-3xl self-start py-1 px-2 m-4 ">
          <StarIcon size={16} color="white" />
          <Text className="text-white font-semibold ml-1 text-base">
            {product.rating.rate}
          </Text>
        </View> */}

        <View className="mt-4 mx-4 flex-row justify-between items-start space-x-4">
          <Text className="flex-1 text-xl ">{product.title}</Text>
          <Text className="flex-2 text-lg font-semibold">$ {product.price}</Text>
        </View>

        <View className="px-4 space-y-2 mt-4">
          <Text className="text-lg font-bold">Size</Text>
          <View className="flex-row flex-wrap justify-around">
            <TouchableOpacity
              onPress={() => setSize("s")}
              style={{
                backgroundColor:
                  size == "s" ? "rgb(249 115 22)" : "rgba(0,0,0,0.07)",
              }}
              className="p-3 px-8 rounded-full"
            >
              <Text className={size == "s" ? "text-white" : "text-gray-700"}>
                S
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize("m")}
              style={{
                backgroundColor:
                  size == "m" ? "rgb(249 115 22)" : "rgba(0,0,0,0.07)",
              }}
              className="p-3 px-8 rounded-full"
            >
              <Text className={size == "m" ? "text-white" : "text-gray-700"}>
                M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize("l")}
              style={{
                backgroundColor:
                  size == "l" ? "rgb(249 115 22)" : "rgba(0,0,0,0.07)",
              }}
              className="p-3 px-8 rounded-full"
            >
              <Text className={size == "l" ? "text-white" : "text-gray-700"}>
                L
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* quantity */}

        <View className="px-4 mt-6 ">
          <Text className="text-lg font-bold">Quantity</Text>
          <View className="flex-row  self-center items-center space-x-8 border-gray-300 border rounded-full p-1 px-4">
            <TouchableOpacity onPress={handleMinusBtn} className="p-1">
              <MinusIcon size="22" strokeWidth={4} color={"rgb(249 115 22)"} />
            </TouchableOpacity>
            <Text className="font-semibold text-lg">{quantity}</Text>
            <TouchableOpacity onPress={handlePlusBtn} className="p-1">
              <PlusIcon size="22" strokeWidth={4} color={"rgb(249 115 22)"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* description */}
        <View className="px-4 mt-6">
          <Text className="text-lg font-bold">Description</Text>
          <Text className="text-gray-700 mt-2">{product.description}</Text>
        </View>

        {/* reviews */}
        <View className="px-4 mt-6">
          <Text className="text-lg font-bold">Reviews</Text>
          <View className="flex-row items-center mt-2">
            <StarIcon size={16} color="orange" />
            <Text className="text-lg font-bold ml-1">4.5</Text>
            <Text className="ml-1">(24 reviews)</Text>
          </View>
          <Text className="text-gray-700 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </ScrollView>

      {/* add to cart */}
      <TouchableOpacity
        className="absolute right-4 bottom-4 rounded-full flex justify-center items-center self-start p-4 bg-orange-500"
        onPress={() => {}}
        style={{
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
        }}
      >
        <PlusIcon size="30" strokeWidth={3} color="white" />
      </TouchableOpacity>
    </View>
  );
}
