import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "native-base";
import Background from "../../utils/background";

class WholePlayScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Background />
        <Text>yo</Text>
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
