import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon, XMarkIcon } from "react-native-heroicons/outline";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { DummyProducts } from "../constants/DummyData";

const { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  return (
    <View className="bg-gray-100 flex-1">
      <SafeAreaView className=" w-full flex-row justify-between items-center py-2 px-4 space-x-2 ">
        <TouchableOpacity
          className="rounded-2xl p-2 bg-orange-500 "
          onPress={() => navigation.navigate("Home")}
        >
          <ChevronLeftIcon size="28" strokeWidth={3} color="white" />
        </TouchableOpacity>
        {/* search input */}
        <View className="flex-row flex-1 justify-between items-center border border-gray-400 rounded-full">
          <TextInput
            onChangeText={setSearchText}
            value={searchText}
            placeholder="Search products..."
            placeholderTextColor={"gray"}
            className=" pl-5 py-3 flex-1 text-base  rounded-full"
          />
          <TouchableOpacity
            onPress={() => setSearchText("")}
            className="rounded-full p-2 m-1 bg-gray-500"
          >
            <XMarkIcon size="25" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* search results */}
      {loading ? (
        <ActivityIndicator size="large" className="m-10" />
      ) : (
        <>
          {results.length > 0 && (
            <Text className="text-gray-500  text-sm text-center font-light">
              {results.length} results
            </Text>
          )}
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 10,
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 20,
            }}
            className="mt-2"
          >
            {results.length ? (
              results.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))
            ) : (
              <Text className="text-center text-gray-500 text-2xl">
                No results
              </Text>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}
