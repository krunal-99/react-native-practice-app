import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

type CustomTextProps = TextProps & {
  label?: string | number;
};

const CustomText: React.FC<CustomTextProps> = ({
  label,
  style,
  children,
  ...props
}) => {
  return (
    <Text style={[styles.defaultStyle, style]} {...props}>
      {label ?? children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 16,
    color: "#333",
  },
});

export default CustomText;
