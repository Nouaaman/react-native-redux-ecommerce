import { Text, View, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../state/categorySlice";
import { fetchProductsByCategory } from "../state/productSlice";

export default Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  //handle category selection
  const handleCategorySelection = (index) => {
    setActiveCategory(index);
    dispatch(fetchProductsByCategory(categories[index]));
  };

  useEffect(() => {
    dispatch(fetchCategories());
    console.log(categories);
  }, [dispatch]);

  return (
    <View className="px-4 mt-2">
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        renderItem={({ item, index }) => {
          let isActive = index === activeCategory;
          let activeTextClass = isActive ? "text-white" : "text-neutral-700";
          return (
            <TouchableOpacity
              className="p-3  bg-neutral-200 mr-2 rounded-full"
              style={{
                backgroundColor: isActive
                  ? "rgb(249 ,115, 22)"
                  : "rgb(229 ,229 ,229)",
              }}
              onPress={() => handleCategorySelection(index)}
            >
              <Text className={"font-semibold " + activeTextClass}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
