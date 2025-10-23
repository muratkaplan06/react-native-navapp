import Colors from "../../../constants/Colors";
import { useTheme } from "../../../hooks/useTheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { mode } = useTheme();
  const colorFromProps = props[mode as "light" | "dark"];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[mode as "light" | "dark"][colorName];
  }
}

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};
