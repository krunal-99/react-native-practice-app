import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./src/navigation/MainNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
