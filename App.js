import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppNavigation from "./AppNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <AppNavigation />
    </View>
  );
}
