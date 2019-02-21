import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Background from "../../utils/Background";
import GuessInput from "./GuessInput";
import NumberButton from "./NumberButton";

class WholePlayScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Background />
        <GuessInput />
        <NumberButton operator={1} handleButtonPress={() => {}} />
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
