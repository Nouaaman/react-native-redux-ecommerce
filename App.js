import "react-native-gesture-handler"; // shouiuld be the first import
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppNavigation from "./AppNavigation";

import { Provider } from "react-redux";
import store from "./state/store";

import { DrawerContextProvider } from "./context/DrawerContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <AppNavigation />
    </Provider>
  );
}
