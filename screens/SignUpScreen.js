import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import { useNavigation } from "@react-navigation/native";
import { fetchSignUp } from "../hooks/authentification/useAuth";
import Snackbar from "../components/Snackbar";

export default function SignUpScreen() {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [snackbarInfo, setSnackbarInfo] = useState({
    visible: false,
    message: "",
  });

  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-start items-center p-4 ">
      <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center py-2 ">
        <TouchableOpacity
          className="rounded-xl p-2 bg-orange-500 "
          onPress={() => navigation.navigate('Home')}
        >
          <ChevronLeftIcon size="28" strokeWidth={3} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <View className=" flex-1 w-full justify-start items-center mt-12">
        <Text className="text-3xl font-bold">Sign Up</Text>
        {/* Inputs */}
        <View className=" flex-1 justify-center">
          {/* email */}
          <View className=" relative flex flex-row justify-stretch items-center w-full mb-2">
            <View className="absolute left-4">
              <EnvelopeIcon size="25" color={"gray"} />
            </View>
            <TextInput
              className="w-full pl-12  border border-gray-300 text-lg h-12 rounded-lg "
              placeholder="E-mail"
              textContentType="emailAddress"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          {/* username */}
          <View className=" relative flex flex-row justify-stretch items-center w-full mb-2">
            <View className="absolute left-4">
              <UserIcon size="25" color={"gray"} />
            </View>
            <TextInput
              className="w-full pl-12  border border-gray-300 text-lg h-12 rounded-lg "
              placeholder="Username"
              textContentType="username"
              autoCapitalize="none"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          {/* password */}
          <View className=" relative flex flex-row justify-stretch items-center w-full mb-2">
            <View className="absolute left-4">
              <LockClosedIcon size="25" color={"gray"} />
            </View>
            <TextInput
              className="w-full pl-12  border border-gray-300 text-lg h-12 rounded-lg"
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View className=" relative flex flex-row justify-stretch items-center w-full mb-2">
            <View className="absolute left-4">
              <LockClosedIcon size="25" color={"gray"} />
            </View>
            <TextInput
              className="w-full pl-12  border border-gray-300 text-lg h-12 rounded-lg"
              placeholder="Confirm Password"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
          {/* singup button */}
          <TouchableOpacity
            className=" mt-10 flex justify-center items-center "
            onPress={async () => {
              const res = await fetchSignUp({
                username,
                email,
                password,
                confirmPassword,
              });
              if (res.data) return navigation.navigate("Login");

              const message = res.error;
              setSnackbarInfo({
                visible: true,
                message,
              });

              setTimeout(
                () => setSnackbarInfo((prev) => ({ ...prev, visible: false })),
                5000
              );
            }}
          >
            <Text className=" w-full py-3 bg-orange-500  rounded-full justify-center items-center text-white text-lg font-bold text-center">
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="mt-8 text-center flex flex-row justify-center align-center space-x-1">
            <Text> Already have an account?</Text>
            <TouchableOpacity>
              <Text
                className="text-orange-500"
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={{ width: 150, height: 150 }}
      />
      {snackbarInfo.visible && (
        <Snackbar
          message={snackbarInfo.message}
          actionText="Dismiss"
          onActionPress={() =>
            setSnackbarInfo((prev) => ({ ...prev, visible: false }))
          }
          duration={5000}
          position="bottom"
          backgroundColor="red"
          textColor="white"
          actionTextColor="white"
          containerStyle={{ marginHorizontal: 12 }}
        />
      )}
    </View>
  );
}
