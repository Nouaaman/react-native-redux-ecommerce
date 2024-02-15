import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function ProductCard({ product }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Product", { ...product });
      }}
    >
      <View
        className=" bg-white rounded-xl shadow-lg mb-4 "
        style={{ width: width / 2 - 30 }}
      >
        <Image
          className="rounded-t-xl w-full"
          style={{ height: width / 2 - 50 }}
          resizeMode="contain"
          source={{ uri: product.image }}
        />
        <View className="p-2">
          <Text className=" font-semibold color-neutral-800 mb-1">
            {product.title.length > 40
              ? product.title.slice(0, 40) + "..."
              : product.title}
          </Text>
          <Text className=" text-sm color-neutral-700">$ {product.price}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
