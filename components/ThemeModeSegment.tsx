import React from "react";
import { Pressable } from "react-native";
import { useAppDispatch } from "../redux/app/hooks";
import { setThemeMode } from "../redux/reducers/themeReducer";
import { useTheme } from "../hooks/useTheme";
import { ThemeMode } from "@/utils/enum";
import View from "@/components/ui/view/View";
import Text from "@/components/ui/text/Text";

type Opt = { label: string; value: ThemeMode };

const OPTIONS: Opt[] = [
  { label: "Açık", value: ThemeMode.LIGHT },
  { label: "Koyu", value: ThemeMode.DARK },
  { label: "Sistem", value: ThemeMode.SYSTEM },
];

export default function ThemeModeSegment() {
  const dispatch = useAppDispatch();
  const { rawMode, mode, colors } = useTheme();

  return (
    <View className="flex-row p-1 rounded-xl">
      {OPTIONS.map((opt) => {
        const isActive = rawMode === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => dispatch(setThemeMode({ mode: opt.value }))}
            className={`flex-1 items-center py-2 rounded-lg ml-2
                        ${
                          isActive
                            ? "bg-blue-600"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
          >
            <Text
              className={`${
                isActive ? "text-white" : "text-black dark:text-white"
              } font-semibold`}
            >
              {opt.label}
            </Text>

            {opt.value === ThemeMode.SYSTEM && (
              <Text
                className={`text-xs ${
                  isActive
                    ? "text-white/80"
                    : "text-black/50 dark:text-white/50"
                }`}
              >
                ({mode})
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
