import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "../components/ui/CustomText";
import CustomInput from "../components/ui/CustomInput";
import { addIdea } from "../store/ideas.slice";
import { useAppDispatch, useAppSelector } from "../store/store";

const IdeaBank = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useAppDispatch();
  const ideas = useAppSelector((state) => state.idea.idea);
  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="What's on your mind"
        placeholderTextColor="#aaa"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={() => {
          dispatch(addIdea(input));
          setInput("");
        }}
        style={styles.button}
      >
        <CustomText style={styles.buttonText} label="Submit"></CustomText>
      </TouchableOpacity>
      <FlatList
        data={ideas}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <Text style={styles.ideaItem}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    elevation: 2,
  },
  button: {
    width: "100%",
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  list: {
    paddingBottom: 50,
  },
  ideaItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    elevation: 2,
  },
});

export default IdeaBank;
