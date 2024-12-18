import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { HeartIcon, ShoppingBagIcon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import Reviews from "../components/Reviews";
import Snackbar from "../components/Snackbar";

import { DummyReviews } from "../constants/DummyData";
import { AuthContext } from "../context/useContext";
import { addToCart } from "../state/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../state/productSlice";
import { fetchCart } from "../state/cartSlice";

export default function ProductScreen(props) {
  const product = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userInfo } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [size, setSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  const [snackbarInfo, setSnackbarInfo] = useState({
    visible: false,
    message: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart(userInfo.data?.token));
  }, [dispatch]);

  const [reviews] = useState(DummyReviews);

  const handleMinusBtn = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handlePlusBtn = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (userInfo.data?.token !== undefined) {
      const data = {
        token: userInfo.data?.token,
        body: {
          productId: product.id,
          title: product.title,
          price: product.price,
          size: size,
          quantity: quantity,
          category: product.category,
          image: product.image,
        },
      };

      dispatch(addToCart(data));
      setSnackbarInfo({
        visible: true,
        message: "Added to cart",
      });
      return;
    }
    return navigation.navigate("Login");
  };
  return (
    <View className="flex-1 bg-gray-50">
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
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Image
              source={{ uri: product.image }}
              className="w-full"
              style={{ height: 350 }}
            />
          </TouchableOpacity>
        </View>
        {/* show image fullscreen in modal */}
        <Modal
          visible={showModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <Pressable
            onPress={() => setShowModal(false)}
            className="flex-1 bg-black/80 justify-center items-center"
          >
            <Image
              source={{ uri: product.image }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </Pressable>
        </Modal>
        {/*  back and favorite button */}
        <SafeAreaView className="absolute px-4 w-full flex-row justify-between items-center py-2 ">
          <TouchableOpacity
            className="rounded-full p-2  bg-black/50 "
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={3} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-full p-2  bg-black/50 ">
            <HeartIcon size="24" strokeWidth={2} color="#bbb" />
          </TouchableOpacity>
        </SafeAreaView>

        <View className="mt-4 mx-4 flex-row justify-between items-start space-x-4">
          <Text className="flex-1 text-xl ">{product.title}</Text>
          <Text className="flex-2 text-lg font-semibold">
            $ {product.price}
          </Text>
        </View>

        <View className="px-4 space-y-2 mt-4">
          <Text className="text-lg font-bold">Size</Text>
          <View className="flex-row flex-wrap justify-evenly">
            <TouchableOpacity
              onPress={() => setSize("S")}
              style={{
                backgroundColor:
                  size == "S" ? "rgb(249 115 22)" : "rgba(0,0,0,0.07)",
              }}
              className="p-3 px-8 rounded-full"
            >
              <Text
                className={`font-semibold  ${
                  size == "S" ? "text-white" : "text-gray-700"
                }`}
              >
                S
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize("M")}
              style={{
                backgroundColor:
                  size == "M" ? "rgb(249 115 22)" : "rgba(0,0,0,0.07)",
              }}
              className="p-3 px-8 rounded-full"
            >
              <Text
                className={`font-semibold  ${
                  size == "M" ? "text-white" : "text-gray-700"
                }`}
              >
                M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize("L")}
              style={{
                backgroundColor:
                  size == "L" ? "rgb(249 115 22)" : "rgba(0,0,0,0.07)",
              }}
              className="p-3 px-8 rounded-full"
            >
              <Text
                className={`font-semibold  ${
                  size == "L" ? "text-white" : "text-gray-700"
                }`}
              >
                L
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* quantity */}

        <View className="px-4 mt-4 ">
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
        <View className="px-4 mt-4">
          <Text className="text-lg font-bold">Description</Text>
          <Text className="text-gray-700 mt-2">{product.description}</Text>
        </View>

        {/* reviews */}
        <View className="px-4 mt-6">
          <Text className="text-lg font-bold">Reviews</Text>
          <Reviews reviews={reviews} />
        </View>
      </ScrollView>

      {/* add to cart */}
      <TouchableOpacity
        className="absolute right-4 bottom-4 rounded-full flex justify-center items-center self-start p-5 bg-orange-500"
        onPress={() => handleAddToCart()}
        style={{
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
        }}
      >
        <ShoppingBagIcon size="30" strokeWidth={2} color="white" />
        <View className="absolute bottom-3 right-4 rounded-full bg-orange-500 ">
          <PlusIcon size="20" strokeWidth={3} color="white" />
        </View>
      </TouchableOpacity>
      {snackbarInfo.visible && (
        <Snackbar
          message={snackbarInfo.message}
          actionText="Dismiss"
          onActionPress={() =>
            setSnackbarInfo((prev) => ({ ...prev, visible: false }))
          }
          duration={2000}
          position="bottom"
          backgroundColor="green"
          textColor="white"
          actionTextColor="white"
          containerStyle={{ marginHorizontal: 12 }}
        />
      )}
    </View>
  );
}
