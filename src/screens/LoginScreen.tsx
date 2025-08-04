import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../constants/types";
import CustomText from "../components/ui/CustomText";

type Props = StackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <CustomText label="Login to continue" style={styles.title}></CustomText>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        }
      >
        <CustomText label="Login" style={styles.buttonText}></CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});

export default LoginScreen;
