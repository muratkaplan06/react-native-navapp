import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { icons } from "@/constants/icons";
import React from "react";

interface SearchBarProps {
  value?: string;
  placeholder: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder,
  onPress,
  onChangeText,
}) => {
  return (
    <View className="flex-row items-center bg-dark-200" rounded-full px-5 py-4>
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
