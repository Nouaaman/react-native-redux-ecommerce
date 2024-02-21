import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    console.log("data datta : ", data);
    const fetchUrl = `${baseUrl}/auth/login`;

    setIsLoading(true);
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => response);

      if (response) {
        let userInfo = response;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        return response;
      } else {
        setIsLoading(false);
        return response;
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const logout = async () => {
    const fetchUrl = `${baseUrl}/auth/logout`;
    setIsLoading(true);
    await fetch(fetchUrl, {
      method: "GET",
      headers: {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      },
    })
      .then((res) => res)
      .then((response) => {
        AsyncStorage.removeItem("userInfo");
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }
    } catch (e) {
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
