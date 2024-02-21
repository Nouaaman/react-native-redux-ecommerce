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
import { fetchProducts } from "../state/productSlice";
//category
import { setActiveCategory } from "../state/categorySlice";
import { useSelector, useDispatch } from "react-redux";

export default function SearchScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.product);

  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(setActiveCategory(null));
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (searchText.length > 0) {
      setLoading(true);
      const filtered = productData.products.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    } else {
      setResults([]);
    }
  }, [searchText]);

  return (
    <View className="bg-neutral-50 flex-1">
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
            className=" pl-5 pr-2 flex-1 rounded-full py-4"
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
      {productData.loading || isLoading ? (
        <ActivityIndicator size="large" className="m-10" color={"orange"} />
      ) : (
        <>
          {results.length > 0 && (
            <Text className="text-gray-500  text-sm text-center font-light">
              {results.length} found
            </Text>
          )}
          <ScrollView className="mt-2">
            <View className="flex-row justify-around flex-wrap px-4 mt-4">
              {results.length ? (
                results.map((item, index) => (
                  <ProductCard key={index} product={item} />
                ))
              ) : (
                <Text className="text-center text-gray-500 text-2xl">
                  No results
                </Text>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
