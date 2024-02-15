import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { fetchSignIn } from "../hooks/authentification/useAuth";
import Snackbar from "../components/Snackbar";

export default LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [snackbarInfo, setSnackbarInfo] = useState({
    visible: false,
    message: "",
  });

  return (
    <View className="flex-1 justify-start items-center p-4 ">
      <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center py-2 ">
        <TouchableOpacity
          className="rounded-2xl p-2 bg-orange-500 "
          onPress={() => navigation.navigate("Home")}
        >
          <ChevronLeftIcon size="28" strokeWidth={3} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <View className=" flex-1 w-full justify-start items-center mt-12">
        <Text className="text-3xl font-bold ">Login</Text>
        {/* Inputs */}
        <View className=" flex-1 justify-center">
          {/* email */}
          <View className=" relative flex flex-row justify-stretch items-center w-full mb-2">
            <View className="absolute left-4">
              <EnvelopeIcon size="25" color={"gray"} />
            </View>
            <TextInput
              className="w-full pl-12  border border-orange-500 text-lg h-12 rounded-xl "
              placeholder="E-mail"
              textContentType="emailAddress"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          {/* password */}
          <View className=" relative flex flex-row justify-stretch items-center w-full mb-2">
            <View className="absolute left-4">
              <LockClosedIcon size="25" color={"gray"} />
            </View>
            <TextInput
              className="w-full pl-12  border border-orange-400 text-lg h-12 rounded-xl "
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          {/* login button */}
          <TouchableOpacity
            className=" mt-10 flex justify-center items-center "
            onPress={async () => {
              const res = await fetchSignIn({ email, password });
              if (res.data) return navigation.navigate("Home");

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
              Login
            </Text>
          </TouchableOpacity>
          <View className="mt-8 text-center flex flex-row justify-center align-center">
            <Text> Dont you have and account?</Text>
            <TouchableOpacity>
              <Text
                className="text-orange-500"
                onPress={() => navigation.navigate("SignUp")}
              >
                Sign Up
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
};
