import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../components/ui/CustomText";
import CustomButton from "../components/ui/CustomButton";
import { decrement, increment, reset } from "../store/counter.slice";
import { useAppDispatch, useAppSelector } from "../store/store";

const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.count);
  return (
    <View style={styles.container}>
      <CustomText style={styles.title} label="Counter"></CustomText>
      <CustomText style={styles.count} label={count}></CustomText>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <CustomButton title="+" onPress={() => dispatch(increment())} />
        </View>
        <View style={styles.button}>
          <CustomButton title="Reset" onPress={() => dispatch(reset())} />
        </View>
        <View style={styles.button}>
          <CustomButton title="-" onPress={() => dispatch(decrement())} />
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
