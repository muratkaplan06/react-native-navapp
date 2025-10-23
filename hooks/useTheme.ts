import { useMemo } from "react";
import { Appearance } from "react-native";
import { useAppSelector } from "../redux/app/hooks";
import { ThemeMode } from "@/utils/enum";

export function useTheme() {
  const mode = useAppSelector((s) => s.theme.mode);
  const schemes = useAppSelector((s) => s.theme.colors);

  const system =
    Appearance.getColorScheme() === "dark" ? ThemeMode.DARK : ThemeMode.LIGHT;

  const effectiveMode = mode === ThemeMode.SYSTEM ? system : mode;

  const colors = useMemo(
    () => schemes[effectiveMode],
    [schemes, effectiveMode]
  );

  return { mode: effectiveMode, rawMode: mode, colors };
}
