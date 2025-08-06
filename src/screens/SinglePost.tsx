import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../store/store";
import { Posts, SinglePostScreenProps } from "../constants/types";
import CustomText from "../components/ui/CustomText";

const SinglePost = ({ route }: SinglePostScreenProps) => {
  const { id } = route.params;
  const { posts, status } = useAppSelector((state) => state.posts);
  const [currentPost, setCurrentPost] = useState<Posts | null>(null);

  useEffect(() => {
    if (posts.posts.length > 0) {
      const post = posts.posts.find((post) => post.id === id);
      setCurrentPost(post || null);
    }
  }, [posts, id]);

  if (status === "loading") {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <CustomText style={styles.loadingText}>Loading post...</CustomText>
      </View>
    );
  }

  if (!currentPost) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
        <CustomText style={styles.errorText}>Post not found</CustomText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentCard}>
          <View style={styles.postMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="eye-outline" size={16} color="#64748b" />
              <CustomText style={styles.metaText}>
                {currentPost.views} views
              </CustomText>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="person-outline" size={16} color="#64748b" />
              <CustomText style={styles.metaText}>
                User {currentPost.userId}
              </CustomText>
            </View>
          </View>

          <CustomText style={styles.postBody}>{currentPost.body}</CustomText>

          {currentPost.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <CustomText style={styles.tagsTitle}>Tags:</CustomText>
              <View style={styles.tagsList}>
                {currentPost.tags.map((tag, index) => (
                  <View key={index} style={styles.tagItem}>
                    <CustomText style={styles.tagText}>#{tag}</CustomText>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.reactionsCard}>
          <CustomText style={styles.reactionsTitle}>Reactions</CustomText>
          <View style={styles.reactionsContainer}>
            <View style={styles.reactionItem}>
              <Ionicons name="heart" size={20} color="#ef4444" />
              <CustomText style={styles.reactionText}>
                {currentPost.reactions.likes}
              </CustomText>
            </View>
            <View style={styles.reactionItem}>
              <Ionicons name="heart-dislike" size={20} color="#64748b" />
              <CustomText style={styles.reactionText}>
                {currentPost.reactions.dislikes}
              </CustomText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748b",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    color: "#64748b",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  postMeta: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: "#64748b",
  },
  postBody: {
    fontSize: 16,
    lineHeight: 24,
    color: "#334155",
    marginBottom: 20,
  },
  tagsContainer: {
    marginTop: 16,
  },
  tagsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagItem: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    color: "#6366f1",
    fontWeight: "500",
  },
  reactionsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  reactionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 12,
  },
  reactionsContainer: {
    flexDirection: "row",
    gap: 24,
  },
  reactionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  reactionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569",
  },
});

export default SinglePost;
