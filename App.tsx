import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./src/navigation/MainNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
