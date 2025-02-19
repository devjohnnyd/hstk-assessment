import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import hstkFetch from "../../hstkFetch.js";

export default function () {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await hstkFetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        const data = await response.json();
        console.log("Successfully fetched data:", data);

        if (Array.isArray(data)) {
          setPosts(data);
          setFilteredPosts(data);
        } else {
          console.error("Invalid API response format:", data);
          setPosts([]);
          setFilteredPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const lowerCaseText = text.toLowerCase();
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(lowerCaseText)
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.content}>
              <Text style={styles.icon}>📄</Text>
              <View style={styles.textContainer}>
                <Text>{item.id}</Text>
                <Text>{item.title}</Text>
              </View>
            </View>
            <AntDesign name="right" color="#151515" size={24} />
          </View>
        )}
        ListHeaderComponent={
          !loading ? (
            <TextInput
              style={styles.searchInput}
              placeholder="Search posts..."
              value={searchText}
              onChangeText={handleSearch}
              clearButtonMode="always"
            />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text>No Results</Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingLeft: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  textContainer: {
    flex: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
