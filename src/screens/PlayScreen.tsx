import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import History from '../components/Play/History';
import Input from '../components/Play/Input';
import CustomKeyboard from '../components/Play/Keyboard';
import { Layout, MAX_DIGITS, Theme } from '../constants/index';
import { KeyType, SingleGuess } from '../types/index';
const INPUT_LINE_WIDTH = 0.17;

const getRandomAnswer = () => {
  const shuffledNumbers = [...Array(10).keys()].sort(() => Math.random() - 0.5);
  return shuffledNumbers.slice(0, MAX_DIGITS).join('');
};

const getBulls = (input: string, answer: string) =>
  answer.split('').filter((char, index) => char === input.charAt(index)).length;

const getCows = (input: string, answer: string) =>
  answer
    .split('')
    .filter(
      (char, index) => input.includes(char) && input.charAt(index) != char,
    ).length;

interface PlayScreenState {
  input: string;
  answer: string;
  guesses: SingleGuess[];
}

class PlayScreen extends React.Component<never, PlayScreenState> {
  public state = {
    input: '',
    guesses: [],
    answer: '',
  };

  public componentDidMount() {
    this.setState({ answer: getRandomAnswer(), guesses: [] });
  }

  public handleNumberPress = (key: [KeyType, string]) => {
    const { input } = this.state;
    if (
      input.length < MAX_DIGITS &&
      new Set(input + key[1]).size === (input + key[1]).length
    ) {
      this.setState({ input: input + key[1] });
    }
  }

  public handleDeletePress = () => {
    const { input } = this.state;
    this.setState({ input: input.slice(0, input.length - 1) });
  }

  public handleCheckPress = () => {
    const { input, answer, guesses } = this.state;
    if (input.length < MAX_DIGITS) return;
    const bulls = getBulls(input, answer);
    const cows = getCows(input, answer);
    const guess = { input, bulls, cows };
    this.setState({ guesses: [...guesses, guess] });
  }

  public onKeyboardPress = (key: [KeyType, string]) => {
    if (key[0] === KeyType.Number) {
      this.handleNumberPress(key);
    } else if (key[0] === KeyType.Delete) {
      this.handleDeletePress();
    } else if (key[0] === KeyType.Check) this.handleCheckPress();
  }

  public render() {
    const { input, guesses } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.horizontalContainer}>
          <Input
            cellStyle={{
              borderBottomWidth: 2.5,
              width: Layout.width * 0.18,
              borderColor: Theme.colors.gray,
            }}
            cellStyleFocused={{
              borderColor: 'black',
            }}
            value={input}
          />
        </View>
        <View style={styles.history}>
          <History guesses={guesses} />
        </View>
        <View>
          <CustomKeyboard
            onPress={key => this.onKeyboardPress(key)}
            disabledKeys={input}
          />
        </View>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  underlineStyle: ViewStyle;
  horizontalContainer: ViewStyle;
  history: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  underlineStyle: {
    width: Layout.width * INPUT_LINE_WIDTH,
    height: Layout.width * 0.01,
    backgroundColor: 'black',
  },
  horizontalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '3%',
    marginBottom: '3%',
    alignSelf: 'center',
  },
  history: {
    flex: 1,
    backgroundColor: Theme.colors.tertiary,
  },
});

export default PlayScreen;
