import React from "react";
import { Formik } from "formik";
import { Dimensions, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import CustomInput from "../ui/CustomInput";
import CustomText from "../ui/CustomText";
import { LoginScreenProps } from "../../constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTouchableOpacity from "../ui/CustomTouchableOpacity";

const { width } = Dimensions.get("window");

const LoginForm = ({
  navigation,
}: {
  navigation: LoginScreenProps["navigation"];
}) => {
  const validationLogic = Yup.object({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationLogic}
      onSubmit={async (values) => {
        await AsyncStorage.setItem("user", JSON.stringify(values));
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
        values.email = "";
        values.password = "";
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        handleSubmit,
      }) => (
        <View style={styles.wrapper}>
          <View style={styles.formContainer}>
            <CustomText label="Welcome Back" style={styles.heading} />
            <CustomText label="Email" style={styles.label} />
            <CustomInput
              placeholder="Enter your email"
              id="email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={styles.input}
              placeholderTextColor="#a0a0a0"
            />
            {errors.email && touched.email && (
              <CustomText label={errors.email} style={styles.error} />
            )}
            <CustomText label="Password" style={styles.label} />
            <CustomInput
              placeholder="Enter your password"
              id="password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              style={styles.input}
              placeholderTextColor="#a0a0a0"
              secureTextEntry
            />
            {errors.password && touched.password && (
              <CustomText label={errors.password} style={styles.error} />
            )}
            <CustomTouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <CustomText label="Login" style={styles.buttonText}></CustomText>
            </CustomTouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  formContainer: {
    width: width * 0.9,
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a3c34",
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  error: {
    fontSize: 12,
    color: "#e63946",
    marginTop: 4,
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#1a3c34",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
export default LoginForm;
