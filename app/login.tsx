import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Linking,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { RootState } from "@/redux/app/store";
import {
  useCreateSessionMutation,
  useLazyGetAccountQuery,
  useLazyGetRequestTokenQuery,
} from "@/redux/services/tmddbApi";
import {
  setRequestToken,
  setSessionId,
  setUser,
} from "@/redux/reducers/authReducer";

type Step = 1 | 2 | 3;

export default function LoginScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const requestToken = useSelector((s: RootState) => s.auth.requestToken);

  const [getToken, { isFetching: gettingToken }] =
    useLazyGetRequestTokenQuery();
  const [createSession, { isLoading: creatingSession }] =
    useCreateSessionMutation();
  const [getAccount, { isFetching: gettingAccount }] = useLazyGetAccountQuery();

  // küçük bir state makinesi
  const [step, setStep] = useState<Step>(1);
  const [done, setDone] = useState({
    token: false,
    approved: false,
    login: false,
  });

  // 1) Token al
  const handleGetToken = async () => {
    try {
      const res = await getToken().unwrap();
      dispatch(setRequestToken(res.request_token));
      setDone((d) => ({ ...d, token: true }));
      setStep(2);
    } catch (e: any) {
      Alert.alert("Hata", "Token alınamadı.");
    }
  };

  // 2) Tarayıcıda onayla
  const handleOpenApprove = async () => {
    try {
      if (!requestToken) return;
      const url = `https://www.themoviedb.org/authenticate/${requestToken}`;
      await Linking.openURL(url);
      // kullanıcı tarayıcıda Allow diyecek; uygulamaya dönünce 2. butona tekrar basman gerekmiyor
      // ama basıldığını gösterip 3. adıma izin verelim:
      setDone((d) => ({ ...d, approved: true }));
      setStep(3);
    } catch (e) {
      Alert.alert("Hata", "Tarayıcı açılamadı.");
    }
  };

  // 3) Session oluştur + account çek
  const handleFinishLogin = async () => {
    try {
      if (!requestToken) return;
      // TMDb bazen 'Allow' sonrası hemen approve etmeyebiliyor, ufak bekleme iyi gelir
      await new Promise((r) => setTimeout(r, 1000));

      const ses = await createSession({ request_token: requestToken }).unwrap();
      dispatch(setSessionId(ses.session_id));

      const acc = await getAccount({ session_id: ses.session_id }).unwrap();
      dispatch(setUser({ id: acc.id, name: acc.name, username: acc.username }));

      setDone((d) => ({ ...d, login: true }));
      router.replace("/(tabs)/profile");
    } catch (e: any) {
      Alert.alert(
        "Hata",
        "Oturum oluşturulamadı. Token'ı tekrar onaylaman gerekebilir."
      );
    }
  };

  const loading3 = creatingSession || gettingAccount;

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 6 }}>
        TMDb Login (V3)
      </Text>

      {/* 1. ADIM */}
      <Button
        title={`${done.token ? "✅ " : ""}${
          gettingToken ? "Token alınıyor..." : "1) Token Al"
        }`}
        onPress={handleGetToken}
        disabled={gettingToken || step !== 1}
      />

      {/* 2. ADIM */}
      <Button
        title={`${done.approved ? "✅ " : ""}2) Token'ı Onayla (Tarayıcıda)`}
        onPress={handleOpenApprove}
        disabled={step < 2 || done.approved} // 1. adım bitmeden aktif değil, onaylanınca kilitle
      />

      {/* 3. ADIM */}
      <Button
        title={`${done.login ? "✅ " : ""}${
          loading3 ? "Oturum tamamlanıyor..." : "3) Oturumu Tamamla"
        }`}
        onPress={handleFinishLogin}
        disabled={step < 3 || loading3}
      />

      {loading3 ? <ActivityIndicator style={{ marginTop: 8 }} /> : null}

      <Text style={{ marginTop: 16, opacity: 0.7 }}>
        İpucu: 2. adım tarayıcıda açılır. Orada "Allow" dedikten sonra
        uygulamaya dön ve 3. adıma bas.
      </Text>
    </View>
  );
}
