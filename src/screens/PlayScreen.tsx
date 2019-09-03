import React from 'react';
import { StyleSheet, View, ViewStyle, Text } from 'react-native';
import History from '../components/Play/History';
import Input from '../components/Play/Input';
import CustomKeyboard from '../components/Play/Keyboard';
import { Layout, MAX_DIGITS, Theme } from '../constants/index';
import { KeyType, SingleGuess } from '../types/index';
import {
  getRandomAnswer,
  getBulls,
  getCows,
} from '../helpers/InputManipulation';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationScreenProps } from 'react-navigation';
import { InputState } from '../constants/Screens';

const INPUT_LINE_WIDTH = 0.17;

interface PlayScreenState {
  inputState: InputState;
  input: string;
  answer: string;
  guesses: SingleGuess[];
}

interface PlayScreenNavigationProps {
  refreshScreen: () => void;
  provideAnswer: () => void;
}

class PlayScreen extends React.Component<
  NavigationScreenProps<PlayScreenNavigationProps>,
  PlayScreenState
> {
  public static getEmptyState = () => {
    return {
      input: '',
      inputState: InputState.VALID,
      guesses: [],
      answer: getRandomAnswer(),
    };
  }

  public state = PlayScreen.getEmptyState();

  public refreshState = () => this.setState(PlayScreen.getEmptyState());

  public provideAnswer = () => {
    const { answer } = this.state;
    this.setState({ input: answer, inputState: InputState.PROVIDED_ANSWER });
  }

  public componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      refreshScreen: this.refreshState,
      provideAnswer: this.provideAnswer,
    });
  }

  public handleNumberPress = (key: [KeyType, string]) => {
    const { input } = this.state;
    if (
      input.length < MAX_DIGITS &&
      new Set(input + key[1]).size === input.length + 1
    ) {
      this.setState({
        input: input + key[1],
        inputState: InputState.VALID,
      });
    }
  }

  public handleDeletePress = () => {
    const { input } = this.state;
    this.setState({ input: input.slice(0, input.length - 1) });
  }

  public handleCheckPress = () => {
    const { input, answer, guesses } = this.state;
    if (input.length === MAX_DIGITS) {
      const bulls = getBulls(input, answer);
      const cows = getCows(input, answer);
      const guess = { input, bulls, cows };
      this.setState({
        guesses: [...guesses, guess],
        input: '',
      });
    } else this.handleInvalidInput();
  }

  public handleInvalidInput = () => {
    this.setState({ inputState: InputState.INVALID });
  }

  public onKeyboardPress = (key: [KeyType, string]) => {
    if (key[0] === KeyType.Number) {
      this.handleNumberPress(key);
    } else if (key[0] === KeyType.Delete) {
      this.handleDeletePress();
    } else if (key[0] === KeyType.Check) this.handleCheckPress();
  }

  public render() {
    const { input, guesses, inputState } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input value={input} inputState={inputState} />
        </View>
        <LinearGradient
          colors={['#6191FF', '#4439A7']}
          start={[0.1, 0.1]}
          end={[1, 1]}
          style={styles.historyGradient}
        >
          <View style={styles.historyContainer}>
            <History guesses={guesses} />
          </View>
        </LinearGradient>
        <View style={styles.keyboardContainer}>
          <CustomKeyboard
            onPress={key => this.onKeyboardPress(key)}
            disabledKeys={input}
            inputState={inputState}
          />
        </View>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  underlineStyle: ViewStyle;
  inputContainer: ViewStyle;
  historyGradient: ViewStyle;
  historyContainer: ViewStyle;
  keyboardContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  underlineStyle: {
    width: Layout.width * INPUT_LINE_WIDTH,
    height: Layout.width * 0.01,
    backgroundColor: Theme.colors.black,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20%',
    alignSelf: 'center',
  },
  historyGradient: {
    flex: 0.75,
    width: '95%',
    borderRadius: Theme.sizes.radius,
    alignSelf: 'center',
  },
  historyContainer: {
    flex: 1,
    borderRadius: Theme.sizes.radius,
  },
  keyboardContainer: {
    marginTop: '3%',
    paddingBottom: '12%',
  },
});

export default PlayScreen;
