import React, { useEffect } from "react";
import ThemeModeSegment from "@/components/ThemeModeSegment";
import View from "@/components/ui/view/View";
import Text from "@/components/ui/text/Text";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { RootState } from "@/redux/app/store";
import { useDeleteSessionMutation } from "@/redux/services/tmddbApi";
import { resetAuth } from "@/redux/reducers/authReducer";
import { Button } from "react-native";

const profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((s: RootState) => s.auth.user);
  const sessionId = useSelector((s: RootState) => s.auth.sessionId);
  const [logoutApi, { isLoading }] = useDeleteSessionMutation();

  const handleLogout = async () => {
    if (sessionId) {
      try {
        await logoutApi({ session_id: sessionId }).unwrap();
      } catch {}
    }
    dispatch(resetAuth());
    router.replace("/login");
  };

  useEffect(() => {
    if (!sessionId) router.replace("/login");
  }, [sessionId]);
  return (
    <View className="flex-1 p-4">
      <View className="items-center mt-20 mb-10">
        <Text className="text-2xl font-bold">Kullanıcı</Text>
        <Text className="text-2xl font-bold">ID: {user?.id ?? "-"}</Text>
        <Text className="text-2xl font-bold">
          Kullanıcı Adı: {user?.username ?? "-"}
        </Text>
        <Button
          title={isLoading ? "Çıkış yapılıyor..." : "Çıkış Yap"}
          onPress={handleLogout}
        />
      </View>
      <ThemeModeSegment />
    </View>
  );
};

export default profile;
