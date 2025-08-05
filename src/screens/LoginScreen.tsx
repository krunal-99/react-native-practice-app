import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { RootStackParamList } from "../constants/types";
import LoginForm from "../components/form/LoginForm";
import { SafeAreaView } from "react-native-safe-area-context";

export type Props = StackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={"padding"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.innerContainer}>
          <LoginForm navigation={navigation} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default LoginScreen;
