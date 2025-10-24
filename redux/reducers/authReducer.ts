import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = { id: number; name?: string; username?: string } | null;

interface AuthState {
  requestToken: string | null;
  sessionId: string | null;
  user: User;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  requestToken: null,
  sessionId: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRequestToken: (s, a: PayloadAction<string | null>) => {
      s.requestToken = a.payload;
    },
    setSessionId: (s, a: PayloadAction<string | null>) => {
      s.sessionId = a.payload;
      s.isAuthenticated = !!a.payload;
    },
    setUser: (s, a: PayloadAction<User>) => {
      s.user = a.payload;
    },
    resetAuth: (s) => {
      s.requestToken = null;
      s.sessionId = null;
      s.user = null;
      s.isAuthenticated = false;
    },
  },
});

export const { setRequestToken, setSessionId, setUser, resetAuth } =
  authSlice.actions;
export default authSlice.reducer;
