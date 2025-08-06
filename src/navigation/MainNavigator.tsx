import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import { RootStackParamList } from "../constants/types";
import HomeScreen from "../screens/HomeScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

export const MainNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthLoading"
        component={AuthLoadingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
