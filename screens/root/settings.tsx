import { View, Text } from "react-native";
import ThemeModeSegment from "../../components/ThemeModeSegment";

export default function SettingsScreen() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-3">Tema Testi</Text>
      <ThemeModeSegment />
    </View>
  );
}
