import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

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
    setRequestToken: (state, action: PayloadAction<string | null>) => {
      state.requestToken = action.payload;
    },
    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.sessionId = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetAuth: (state) => {
      state.requestToken = null;
      state.sessionId = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setRequestToken, setSessionId, setUser, resetAuth } =
  authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectSessionId = (state: RootState) => state.auth.sessionId;
export const selectRequestToken = (state: RootState) => state.auth.requestToken;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectUserId = (state: RootState) => state.auth.user?.id ?? null;
export const selectUsername = (state: RootState) =>
  state.auth.user?.username ?? null;
export const selectDisplayName = (state: RootState) =>
  state.auth.user?.name || state.auth.user?.username || "";

export default authSlice.reducer;
