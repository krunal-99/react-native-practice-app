import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../components/ui/CustomText";
import CustomButton from "../components/ui/CustomButton";

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <View style={styles.container}>
      <CustomText style={styles.title} label="Counter"></CustomText>
      <CustomText style={styles.count} label={count}></CustomText>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <CustomButton title="+" onPress={() => setCount(count + 1)} />
        </View>
        <View style={styles.button}>
          <CustomButton title="Reset" onPress={() => setCount(0)} />
        </View>
        <View style={styles.button}>
          <CustomButton title="-" onPress={() => setCount(count - 1)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  count: {
    fontSize: 48,
    fontWeight: "600",
    marginVertical: 20,
    color: "#222",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    marginHorizontal: 5,
    minWidth: 80,
  },
});

export default Counter;
