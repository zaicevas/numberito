import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import GuessInput from '../components/Play/GuessInput';
import NumberButton from '../components/Play/NumberButton';

class PlayScreen extends React.PureComponent {
  public static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <SimpleLineIcons name="book-open" size={24} color={tintColor} />
    ),
  };

  public render() {
    return (
      <View style={styles.container}>
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
