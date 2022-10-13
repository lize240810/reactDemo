import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

const data = [
  { key: "Devin" },
  { key: "Dan" },
  { key: "Dominic" },
  { key: "Jackson" },
  { key: "James" },
  { key: "Joel" },
  { key: "John" },
  { key: "Jillian" },
  { key: "Jimmy" },
  { key: "Julie" },
];

export default function testList() {

  const styles = StyleSheet.create({
    container: {
      paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });
  return (
    <View>
      <FlatList data={data} renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>} />
    </View>
  );
}
