import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Posts } from "../constants/types";

export const PostCard = ({ post }: { post: Posts }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>

        <View style={styles.tagContainer}>
          {post.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.reaction}>👍 {post.reactions.likes}</Text>
          <Text style={styles.reaction}>👎 {post.reactions.dislikes}</Text>
          <Text style={styles.views}>👁️ {post.views} views</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f4f8",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    marginBottom: 15,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 15,
  },
  tag: {
    backgroundColor: "#013914",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 50,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "white",
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reaction: {
    fontSize: 14,
    color: "#555",
  },
  views: {
    fontSize: 14,
    color: "#999",
  },
});

export default PostCard;
