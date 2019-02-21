import * as React from "react";
import { View, StyleSheet, ViewStyle, TextInput } from "react-native";
import { Text } from "native-base";
import Background from "../../utils/Background";
import CalculatorButton from "./NumberButton";

class WholePlayScreen extends React.Component {
  state = {textInputText: "????"};
  render() {
    return (
      <View style={styles.container}>
        <Background />
        <TextInput
        ref={input => { this.textInput = input }}
          returnKeyType="done"
          keyboardType="number-pad"
          value={this.state.textInputText}
                    placeholderTextColor="white"
          caretHidden={true}
          maxLength={4}
          style={styles.textInput}
          onChangeText={text => this.setState({textInputText: text})}
          onFocus={() => { if (this.state.textInputText === "????") this.textInput.clear(); }}
        />
        <CalculatorButton operator="1"/>
                <CalculatorButton operator="1"/>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  textInput: ViewStyle;
}
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1
  },
  textInput: {
  height: 150,
  fontSize: 42,
  textAlign: 'center',
  color: 'white',
  borderColor: '#bfbfbf',
  borderWidth: 1,
  padding: 10
},
});

export default WholePlayScreen;
