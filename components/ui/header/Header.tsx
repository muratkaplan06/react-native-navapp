import useUser from "../../../hooks/useUser";
import Text from "../text/Text";

export default function HeaderUser() {
  const { isAuthenticated, displayName } = useUser();

  if (!isAuthenticated) {
    return <Text className="text-end">Sign In</Text>;
  }
  return <Text className="text-end">Merhaba, {displayName}</Text>;
}
