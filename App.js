import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppNavigation from "./AppNavigation";

import { AuthProvider } from "./context/useContext";
import { Provider } from "react-redux";
import store from "./state/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <StatusBar style="auto" />
          <AppNavigation />
        </AuthProvider>
      </Provider>
    </>
  );
}
