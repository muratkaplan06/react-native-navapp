import React from "react";
import ThemeModeSegment from "@/components/ThemeModeSegment";
import View from "@/components/ui/view/View";
import Text from "@/components/ui/text/Text";

const profile = () => {
  return (
    <View className="flex-1 p-4">
      <View className="items-center mt-20 mb-10">
        <Text className="text-2xl font-bold">Profile</Text>
      </View>
      <ThemeModeSegment />
    </View>
  );
};

export default profile;
