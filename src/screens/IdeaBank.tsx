import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, StyleSheet, Text, View } from "react-native";
import CustomText from "../components/ui/CustomText";
import CustomInput from "../components/ui/CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomTouchableOpacity from "../components/ui/CustomTouchableOpacity";

const IdeaBank = () => {
  const [input, setInput] = useState<string>("");
  const [ideas, setIdeas] = useState<string[]>([]);

  const clearIdeas = async () => {
    setIdeas([]);
    await AsyncStorage.removeItem("ideas");
  };

  const setIdea = async (idea: string) => {
    if (!idea.trim()) return;
    setIdeas((prev) => [...prev, idea]);
    await AsyncStorage.setItem("ideas", JSON.stringify(ideas));
    Keyboard.dismiss();
  };
  useEffect(() => {
    const loadIdeas = async () => {
      const ideas = await AsyncStorage.getItem("ideas");
      setIdeas(ideas ? JSON.parse(ideas) : []);
    };
    loadIdeas();
  }, []);

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="What's on your mind"
        placeholderTextColor="#aaa"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <CustomTouchableOpacity
        onPress={() => {
          setIdea(input);
          setInput("");
        }}
        style={styles.button}
      >
        <CustomText style={styles.buttonText} label="Submit"></CustomText>
      </CustomTouchableOpacity>
      {ideas.length > 0 && (
        <CustomTouchableOpacity onPress={clearIdeas} style={styles.clearButton}>
          <AntDesign name="delete" size={24} color="#fff" />
        </CustomTouchableOpacity>
      )}
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
  clearButton: {
    width: "20%",
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: "auto",
    marginBottom: 25,
    elevation: 3,
  },
});

export default IdeaBank;
