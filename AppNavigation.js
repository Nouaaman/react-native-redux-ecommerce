import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import CustomDawer from "./components/CustomDrawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerType: "front",
      drawerStyle: {
        width: "80%",
      },
      drawerLabelStyle: {
        color: "black",
        fontSize: 16,
        fontWeight: "500",
      },
    }}
  >
    <Drawer.Screen
      name="HomeDrawer"
      component={HomeScreen}
      options={{ title: "Home" }}
    />
     
    {/* <Drawer.Screen name="Settings" component={Settings} /> */}
  </Drawer.Navigator>
);

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={DrawerNavigation} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animation: "slide_from_left" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ animation: "slide_from_left" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
