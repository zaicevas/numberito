import * as React from "react";
import { StyleSheet, TextStyle, TextInput } from "react-native";
import Layout from "../../utils/constants/Layout";

const INITIAL_TEXTINPUT_TEXT = "_ _ _ _";

class GuessInput extends React.Component {
  state = { textInputText: INITIAL_TEXTINPUT_TEXT };
  textInput: null | TextInput = null;
  render() {
    return (
      <TextInput
        ref={input => {
          this.textInput = input;
        }}
        returnKeyType="done"
        keyboardType="number-pad"
        value={this.state.textInputText}
        placeholderTextColor="white"
        caretHidden={true}
        maxLength={4}
        style={styles.textInput}
        onChangeText={text => this.setState({ textInputText: text })}
        onFocus={() => {
          if (
            this.state.textInputText === INITIAL_TEXTINPUT_TEXT &&
            this.textInput
          )
            this.textInput.clear();
        }}
      />
    );
  }
}

interface Style {
  textInput: TextStyle;
}
const styles = StyleSheet.create<Style>({
  textInput: {
    height: '20%',
    fontSize: 42,
    textAlign: "center",
    color: "white",
    padding: 10
  }
});

export default GuessInput;
