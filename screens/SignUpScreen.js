import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/solid";

export default function SignUpScreen() {
  return (
    <View className="flex-1 justify-start items-center p-4 ">
      <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 py-2 ">
        <TouchableOpacity
          className="rounded-full p-2 bg-orange-500 "
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={3} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <View className=" flex-1 w-full justify-start items-center mt-20">
        <Text className="text-2xl font-bold">Sign Up</Text>
        {/* Inputs */}
        <View className=" flex-1 justify-center">
          {/* email */}
          <View className=" relative flex flex-row justify-stretch items-center w-full mb-2">
            <View className="absolute left-4">
              <EnvelopeIcon size="25" color={"orange"} />
            </View>
            <TextInput
              className="w-full pl-12  border-2 border-orange-500 text-lg h-12 rounded-full "
              placeholder="E-mail"
              textContentType="emailAddress"
              autoCapitalize="none"
            />
          </View>

          {/* username */}
          <View className=" relative flex flex-row justify-stretch items-center w-full mb-2">
            <View className="absolute left-4">
              <UserIcon size="25" color={"orange"} />
            </View>
            <TextInput
              className="w-full pl-12  border-2 border-orange-500 text-lg h-12 rounded-full "
              placeholder="Username"
              textContentType="username"
              autoCapitalize="none"
            />
          </View>

          {/* password */}
          <View className=" relative flex flex-row justify-stretch items-center w-full mb-2">
            <View className="absolute left-4">
              <LockClosedIcon size="25" color={"orange"} />
            </View>
            <TextInput
              className="w-full pl-12  border-2 border-orange-400 text-lg h-12 rounded-full "
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
          {/* singup button */}
          <TouchableOpacity
            className=" mt-10 flex justify-center items-center "
            onPress={() => {}}
          >
            <Text className=" w-full py-3 bg-orange-500  rounded-full justify-center items-center text-white text-lg font-bold text-center">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
}
