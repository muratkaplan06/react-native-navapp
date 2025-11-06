import { useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../redux/app/hooks";
import {
  selectIsAuthenticated,
  selectCurrentUser,
  selectSessionId,
  selectRequestToken,
  selectUserId,
  selectUsername,
  selectDisplayName,
} from "../redux/reducers/authReducer";

type UseUserReturn = {
  isAuthenticated: boolean;
  user: { id: number; name?: string; username?: string } | null;
  userId: number | null;
  username: string | null;
  displayName: string;
  sessionId: string | null;
  requestToken: string | null;
};

const useUser = (): UseUserReturn => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser, shallowEqual);
  const sessionId = useAppSelector(selectSessionId);
  const requestToken = useAppSelector(selectRequestToken);
  const userId = useAppSelector(selectUserId);
  const username = useAppSelector(selectUsername);
  const displayName = useAppSelector(selectDisplayName);

  return useMemo(
    () => ({
      isAuthenticated,
      user,
      userId,
      username,
      displayName,
      sessionId,
      requestToken,
    }),
    [
      isAuthenticated,
      user,
      userId,
      username,
      displayName,
      sessionId,
      requestToken,
    ]
  );
};

export default useUser;
