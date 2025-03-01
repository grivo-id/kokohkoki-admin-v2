/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function retrieveStoredToken() {
  const storedToken = sessionStorage.getItem("userToken");
  return {
    token: storedToken,
  };
}

export const AuthProvider = ({ children }) => {
  const storedToken = retrieveStoredToken();
  const initialToken = storedToken.token || "";
  const [userToken, setUserToken] = useState(initialToken);
  const [userPayload, setUserPayload] = useState(null);
  const isLoggedIn = !!userToken;

  useEffect(() => {
    if (userToken) {
      const decoded = jwtDecode(userToken);
      setUserPayload(decoded);
    } else {
      setUserPayload(null);
    }
  }, [userToken]);
  // console.log(userPayload);

  return <AuthContext.Provider value={{ isLoggedIn, userToken, setUserToken, userPayload }}>{children}</AuthContext.Provider>;
};
