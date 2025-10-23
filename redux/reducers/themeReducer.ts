import { GlobalStyles } from "@/constants/styles";
import { ThemeMode } from "@/utils/enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ColorScheme = {
  mainBackgroundColor: string;
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  // ...
};

type ThemeState = {
  mode: ThemeMode;
  colors: {
    light: ColorScheme;
    dark: ColorScheme;
  };
};

const initialColors: ThemeState["colors"] = {
  light: {
    mainBackgroundColor: "#ffffff",
    primary: "rgb(0,122,255)",
    background: "rgb(242,242,242)",
    card: "rgb(255,255,255)",
    text: "rgb(28,28,30)",
    border: "rgb(216,216,216)",
    notification: "rgb(255,59,48)",
  },
  dark: {
    mainBackgroundColor: "#011029",
    primary: "rgb(10,132,255)",
    background: "#011029",
    card: "#3e4653",
    text: "rgb(229,229,231)",
    border: "rgb(39,39,41)",
    notification: "rgb(255,69,58)",
  },
};

const initialState: ThemeState = {
  mode: ThemeMode.LIGHT,
  colors: initialColors,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<{ mode: ThemeMode }>) {
      state.mode = action.payload.mode;
    },
    setColorScheme(
      state,
      action: PayloadAction<{
        identifier: keyof ColorScheme;
        mode: "light" | "dark";
        color: string;
      }>
    ) {
      const { identifier, mode, color } = action.payload;
      state.colors = {
        ...state.colors,
        [mode]: { ...state.colors[mode], [identifier]: color },
      };
    },
    resetColorScheme(state) {
      // derin kopya istersen JSON klon kullan
      state.colors = JSON.parse(JSON.stringify(initialColors));
    },
  },
});

export const { setThemeMode, setColorScheme, resetColorScheme } =
  themeSlice.actions;

export default themeSlice.reducer;
export type { ColorScheme, ThemeState };
