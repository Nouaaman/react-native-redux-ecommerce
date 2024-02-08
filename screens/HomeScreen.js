import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-neutral-100">
      <SafeAreaView>
        <View className="flex-row justify-between items-center mt-2 px-4">
          <View className="flex-row justify-between items-center gap-2">
            <Image
              source={require("../assets/logo-small.png")}
              className="w-12 h-12"
            />
            <Text className="text-2xl font-bold ">SenMart</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View>
        <Button
          title="login"
          onPress={() => {
            navigation.navigate('Login')
          }}
        />
        <Button
          title="sign up"
          onPress={() => {
            navigation.navigate('SignUp')
          }}
        />
      </View>
    </View>
  );
}
