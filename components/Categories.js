import { Text, View, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";

export default Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Men's clothes" },
    { id: 2, name: "Women's clothes" },
    { id: 3, name: "Accessories" },
    { id: 4, name: "Jewelry" },
    { id: 5, name: "Fragrances" },
  ]);

  const [activeCategory, setActiveCategory] = useState(0);
  
  return (
    <View className="px-4 mt-2">
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        renderItem={({ item }) => {
          let isActive = item.id === activeCategory;
          let activeTextClass = isActive ? "text-white" : "text-neutral-700";
          return (
            <TouchableOpacity
              className="p-3  bg-neutral-200 mr-2 rounded-full"
              style={{
                backgroundColor: isActive
                  ? "rgb(249 ,115, 22)"
                  : "rgb(229 ,229 ,229)",
              }}
              onPress={() => setActiveCategory(item.id)}
            >
              <Text className={"font-semibold " + activeTextClass}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
