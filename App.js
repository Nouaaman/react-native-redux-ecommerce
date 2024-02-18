import "react-native-gesture-handler"; // shouiuld be the first import
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppNavigation from "./AppNavigation";

import { DrawerContextProvider } from "./context/DrawerContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigation />
    </>
  );
}
