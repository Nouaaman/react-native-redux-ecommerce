import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { MinusIcon } from "react-native-heroicons/outline";
import { deleteFromCart, fet } from "../state/cartSlice";
import { AuthContext } from "../context/useContext";
import { useSelector, useDispatch } from "react-redux";

export default function CartProduct({ product }) {
  const { userInfo } = useContext(AuthContext);
  const dispatch = useDispatch();
  const screenWidth = Dimensions.get("window").width;

  const handleDeleteFromCart = () => {
    if (userInfo.data?.token !== undefined) {
      const data = {
        token: userInfo.data?.token,
        productId: product.productId,
      };
      dispatch(deleteFromCart(data));
    }
  };
  return (
    <View className="flex-row justify-between items-center px-4 py-2">
      <View className="flex-row items-center">
        <Text className="text-sm font-semibold mr-2">x {product.quantity}</Text>
        <View className="w-16 h-16">
          <Image
            source={{ uri: product.image }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <View className="ml-2">
          <Text className="text-sm font-semibold " style={{}}>
            {product.title?.length > screenWidth / 25
              ? product.title.slice(0, screenWidth / 25) + "..."
              : product.title}
          </Text>
          <View className="flex-row items-center space-x-1 rounded-full  self-start">
            <Text className="text-xs ">Size:</Text>
            <Text className="text-xs font-semibold ">{product.size}</Text>
          </View>
          <Text className="text-xs text-gray-500">$ {product.price}</Text>
        </View>
      </View>
      <View className="flex-row items-center space-x-2">
        <Text className="text-sm font-semibold">
          $ {product.quantity * product.price}
        </Text>
        <TouchableOpacity
          onPress={() => {
            handleDeleteFromCart();
          }}
          className="p-1 bg-orange-500 rounded-full"
        >
          <MinusIcon strokeWidth={3} size="20" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
