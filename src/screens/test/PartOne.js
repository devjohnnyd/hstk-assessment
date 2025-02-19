import { SafeAreaView, Text, FlatList, View, StyleSheet } from "react-native";
import posts from "../../../src/localPlaceholderData.js";
import { AntDesign } from "@expo/vector-icons";

export default function () {
  return (
    <SafeAreaView>
      <FlatList
        data={posts}
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});
