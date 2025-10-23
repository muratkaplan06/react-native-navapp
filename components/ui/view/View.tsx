import { View as DefaultView } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { ThemeProps } from "../theme/Themed";

export type ViewProps = ThemeProps & DefaultView["props"];

export default function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const { colors } = useTheme();

  return (
    <DefaultView
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  );
}
