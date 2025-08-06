import React, { useEffect } from "react";
import { AuthLoadingScreenProps } from "../constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const AuthLoadingScreen = ({ navigation }: AuthLoadingScreenProps) => {
  useEffect(() => {
    const checkAuth = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        navigation.navigate("Login");
      }
    };
    checkAuth();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1a3c34" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthLoadingScreen;
