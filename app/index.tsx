import { Text, View, StyleSheet } from "react-native";


export default function Index() {
  return (
    <View style={styles.text}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})