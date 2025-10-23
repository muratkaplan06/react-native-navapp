import { Stack } from "expo-router";
import "./globals.css";
import Text from "@/components/ui/text/Text";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/app/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Yükleniyor...</Text>} persistor={persistor}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="movies/[id]"
            options={{ title: "Movie Details", headerShown: false }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
