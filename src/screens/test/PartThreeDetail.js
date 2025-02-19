import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import hstkFetch from "../../hstkFetch.js";

export default function PartThreeDetail() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const route = useRoute();
  const { postId } = route.params;

  useEffect(() => {
    fetchPostDetails();
    fetchPostComments();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await hstkFetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const data = await response.json();
      console.log("Fetched Post:", data);
      setPost(data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostComments = async () => {
    try {
      const response = await hstkFetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const data = await response.json();
      console.log("Fetched Comments:", data);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const hideComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {post ? (
        <View>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
        </View>
      ) : (
        <Text>Post not found</Text>
      )}

      {commentsLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentEmail}>{item.email}</Text>
              <Text style={styles.commentBody}>{item.body}</Text>
              <Button title="Hide" onPress={() => hideComment(item.id)} />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentEmail: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007bff",
  },
  commentBody: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
});
