import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import CustomText from "../components/ui/CustomText";
import { flip } from "../store/coin.slice";
import { useAppDispatch, useAppSelector } from "../store/store";

const CoinFlipApp = () => {
  const side = useAppSelector((state) => state.coin.side);
  const coinImage = require("./assets/coin.png");
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.coinContainer}>
        <Image source={coinImage} style={styles.image} resizeMode="contain" />
      </View>

      <CustomText style={styles.resultText} label={side}></CustomText>
      <Pressable style={styles.button} onPress={() => dispatch(flip())}>
        <CustomText
          style={styles.buttonText}
          label="Flip the Coin"
        ></CustomText>
      </Pressable>
    </View>
  );
};

export default CoinFlipApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  coinContainer: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e4e4e4",
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#0f3460",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 1,
  },
});
