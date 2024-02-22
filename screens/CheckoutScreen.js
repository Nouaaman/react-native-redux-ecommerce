import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function reduct(total) {
  return (total * 5) / 100;
}

export default CheckoutScreen = (props) => {
  const navigation = useNavigation();
  const [formIsValid, setFormIsValid] = useState(true);
  const total = props.route.params;
  console.log(props.route);
  return (
    <View className="flex-1 bg-white">
      {/*  */}
      <View className="relative flex-row justify-center items-center  p-4  mt-4 border-b-2 border-gray-100 ">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="absolute left-4 rounded-full p-2 "
        >
          <Text className="color-orange-500 font-semibold text-base">
            Cancel
          </Text>
        </TouchableOpacity>
        <Text className="text-center font-bold text-2xl">Checkout</Text>
      </View>
      <ScrollView>
        {/* -------------- Address form  -----------------*/}
        <View className="flex-1 p-4">
          <Text className="font-bold text-xl">Shipping address</Text>
          {/* name */}
          <View className="mt-4 flex-row justify-stretch items-center space-x-2">
            <View className="flex-1 space-y-2">
              <Text className="font-semibold">First name</Text>
              <TextInput
                className="border p-2 border-gray-300 rounded-lg"
                placeholder="Alexa"
              />
            </View>
            <View className="flex-1 space-y-2">
              <Text className="font-semibold">Last name</Text>
              <TextInput
                className="border p-2 border-gray-300 rounded-lg"
                placeholder="Doe"
              />
            </View>
          </View>
          {/* address */}
          <View className="mt-4 space-y-2">
            <Text className="font-semibold">Address</Text>
            <TextInput
              className="border p-2 border-gray-300 rounded-lg"
              placeholder="1234 Main St"
            />
          </View>
          {/* city */}
          <View className="mt-4 flex-row justify-stretch items-center space-x-2">
            <View className="flex-1 space-y-2">
              <Text className="font-semibold">City</Text>
              <TextInput
                className="border p-2 border-gray-300 rounded-lg"
                placeholder="New York"
              />
            </View>
            <View className="flex-1 space-y-2">
              <Text className="font-semibold">Zip code</Text>
              <TextInput
                className="border p-2 border-gray-300 rounded-lg"
                placeholder="92099"
              />
            </View>
          </View>

          {/* -------------- Payment form  -----------------*/}
          <View className="mt-8">
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-xl">Payment</Text>
              <View className="flex-row justify-end items-center space-x-2">
                <Image
                  source={require("../assets/visa-logo.png")}
                  className="w-10 h-5"
                  resizeMode="contain"
                />
                <Image
                  source={require("../assets/mc-logo.png")}
                  className="w-10 h-5"
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* card number */}
            <View className="mt-4 space-y-2">
              <Text className="font-semibold">Card number</Text>
              <TextInput
                className="border p-2 border-gray-300 rounded-lg"
                placeholder="1234 5678 1234 5678"
              />
            </View>
            {/* expiry */}
            <View className="mt-4 flex-row justify-stretch items-center space-x-2">
              <View className="flex-1 space-y-2">
                <Text className="font-semibold">Expiry date</Text>
                <TextInput
                  className="border p-2 border-gray-300 rounded-lg"
                  placeholder="MM/YY"
                />
              </View>
              <View className="flex-1 space-y-2">
                <Text className="font-semibold">CVV</Text>
                <TextInput
                  className="border p-2 border-gray-300 rounded-lg"
                  placeholder="123"
                />
              </View>
            </View>
          </View>
        </View>

        {/* -------------- Order summary  -----------------*/}
        <View className="p-4 m-4 border border-gray-300 rounded-xl">
          <Text className="font-bold text-xl">Order summary</Text>
          <View className="flex-row justify-between items-center mt-4">
            <View>
              <Text className="font-semibold">Total</Text>
              <Text className="font-semibold">Shipping</Text>
            </View>
            <View>
              <Text>$ {Number.parseFloat(total).toFixed(2)}</Text>
              <Text>Free</Text>
            </View>
          </View>
          {total > 100 ? (
            <View>
              <View className="flex-row justify-between items-center mt-4">
                <Text className="font-bold text-base">Reduction of 5% </Text>
                <Text className="font-bold text-base">
                  {reduct(total).toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between items-center mt-4">
                <Text className="font-bold text-base">To pay</Text>
                <Text className="font-bold text-base">
                  {Number.parseFloat(total - reduct(total)).toFixed(2)}
                </Text>
              </View>
            </View>
          ) : (
            <View className="flex-row justify-between items-center mt-4">
              <Text className="font-bold text-base">To pay</Text>
              <Text className="font-bold text-base">
                ${Number.parseFloat(total).toFixed(2)}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {/* -------------- Submit button  -----------------*/}
      <View className="px-4 py-2 border-t-2 border-gray-100">
        <TouchableOpacity
          disabled={!formIsValid}
          onPress={() => {
            // submit order
          }}
          className={`flex-row justify-center items-center rounded-xl p-3
          ${formIsValid ? "bg-orange-500" : "bg-gray-400"}`}
        >
          <Text className="text-white text-lg font-semibold">Submit Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
