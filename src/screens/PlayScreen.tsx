import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Background from '../components/Background';
import GuessInput from '../components/Play/GuessInput';
import NumberButton from '../components/Play/NumberButton';

class PlayScreen extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <Background />
        <GuessInput />
        <NumberButton operator={1} handleButtonPress={() => { }} />
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
}
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
});

export default PlayScreen;
