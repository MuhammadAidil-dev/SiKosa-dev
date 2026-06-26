import { createContext, useState } from "react";
import { getAccessToken, getAuthUserSession, putAccessTokenSession, putAuthUserSession } from "../utils/utils";
import CONFIG from "../config/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => getAuthUserSession());
  const [accessToken, setAccessToken] = useState(() => getAccessToken());
  const handleAuthUserChange = (newAuthUser) => {
    setAuthUser(newAuthUser);
    putAuthUserSession(newAuthUser);
  };

  const handleAccessToken = (dataAccessToken) => {
    setAccessToken(dataAccessToken);
    putAccessTokenSession(dataAccessToken);
  };

  const clearSession = () => {
    setAuthUser(null);
    setAccessToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("accessToken");
  };

  const handleLogout = async () => {
    try {
      await fetch(`${CONFIG.BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (_) {
      // best-effort server logout; always clear client session
    } finally {
      clearSession();
      window.location.href = "/login";
    }
  };

  const handleUnauthorized = () => {
    clearSession();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        handleAuthUserChange,
        handleLogout,
        handleUnauthorized,
        accessToken,
        handleAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
