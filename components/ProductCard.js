import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function ProductCard({ product }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Product", { ...product });
      }}
      className="bg-white shadow mb-3 rounded-xl"
    >
      <View style={{ width: width / 2 - 30 }} className="justify-between p-2 space-y-2">
        <View>
          <Image
            // className="rounded-t-xl w-full"
            style={{ height: width / 2 - 50 }}
            resizeMode="contain"
            source={{ uri: product.image }}
          />
        </View>
        <View className="justify-between">
          <Text className=" font-semibold color-neutral-800  mb-1">
            {product.title.length > width / 24
              ? product.title.slice(0, width / 25) + "..."
              : product.title}
          </Text>
          <Text className=" text-sm color-neutral-700">$ {product.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
