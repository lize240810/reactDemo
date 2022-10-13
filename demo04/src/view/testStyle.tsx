import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
  bgGreen: {
    backgroundColor: "#45615f",
  },
  borderRadio:{
    borderRadius: 50
  },
  paddingLeft20:{
    paddingLeft: 20
  }
});

export default function LotsOfStyles() {
  return (
    <View style={styles.container}>
      <Text style={[styles.red, styles.bgGreen, styles.borderRadio, styles.paddingLeft20]}>just red</Text>
      <Text style={[styles.bigBlue]}>just bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
    </View>
  );
};
