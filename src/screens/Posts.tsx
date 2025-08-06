import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Button,
} from "react-native";
import PostCard from "../components/PostCard";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchPosts } from "../store/posts.slice";
import { PostScreenProps } from "../constants/types";

export const Post = ({ navigation }: PostScreenProps) => {
  const { posts, status, error } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading posts...</Text>
      </View>
    );
  } else if (status === "succeeded") {
    content = (
      <FlatList
        data={posts.posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <PostCard post={item} navigation={navigation} />;
        }}
      />
    );
  } else if (status === "failed") {
    content = (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={() => dispatch(fetchPosts())} />
      </View>
    );
  }
  return <SafeAreaView style={styles.container}>{content}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", marginBottom: 10 },
});

export default Post;
