import { View, Text } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";

export default function Reviews({ reviews }) {
  return (
    <View>
      <View className="flex-row items-center mt-2">
        <StarIcon size={16} color="orange" />
        <Text className="text-lg font-bold ml-1">4.5</Text>
        <Text className="ml-1">({reviews.length} reviews)</Text>
      </View>
      <View className="">
        {reviews.map((item, index) => (
          <View key={index} className="pl-2 mt-2 bg-neutral-200 rounded-xl p-2" >
            <View className="flex-row items-center justify-between">
              <View className="">
                <Text className="font-semibold">{item.name}</Text>
              </View>
              <Text className="text-gray-500 italic">{item.date}</Text>
            </View>
            <Text className="text-gray-700 mt-1">{item.comment}</Text>
          </View>
        ))}
        {/* end review */}
      </View>
    </View>
  );
}
