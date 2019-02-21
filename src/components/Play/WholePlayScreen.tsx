import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Background from "../../utils/Background";
import GuessInput from "./GuessInput";

class WholePlayScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Background />
        <GuessInput />
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
}
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1
  }
});

export default WholePlayScreen;
