import { View, Text } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";

export default function Reviews({ reviews }) {
  return (
    <View>
      <View className="flex-row items-center mt-2">
        <StarIcon size={18} color="orange" />
        <Text className="text-lg font-bold ml-1">4.5</Text>
        <Text className="ml-1">({reviews.length} reviews)</Text>
      </View>
      <View className="">
        {reviews.map((item, index) => (
          <View key={index} className="pl-2 mt-2 bg-gray-100 rounded-xl p-2">
            <View className="flex-row items-start justify-between">
              <View className="">
                <Text className="font-semibold">{item.name}</Text>
                <View className="flex-row ">
                  {[...Array(item.rate)].map((_, i) => {
                    return <StarIcon key={i} size={12} color="orange" />;
                  })}
                </View>
                {item.rate === 5 ? (
                  <Text className="text-xs text-green-500">Excellent</Text>
                ) : item.rate === 4 ? (
                  <Text className="text-xs text-green-500">Good</Text>
                ) : item.rate === 3 ? (
                  <Text className="text-xs text-yellow-500">Average</Text>
                ) : item.rate === 2 ? (
                  <Text className="text-xs text-red-500">Poor</Text>
                ) : (
                  <Text className="text-xs text-red-500">Very Poor</Text>
                )}
              </View>
              <Text className="text-gray-500 text-xs italic">{item.date}</Text>
            </View>
            <Text className="text-gray-700 mt-1">{item.comment}</Text>
          </View>
        ))}
        {/* end review */}
      </View>
    </View>
  );
}
