import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import History from '../components/Play/History';
import Input from '../components/Play/Input';
import CustomKeyboard from '../components/Play/Keyboard';
import { Layout, MAX_DIGITS, Theme } from '../constants/index';
import { KeyType } from '../types/index';
const INPUT_LINE_WIDTH = 0.17;

class PlayScreen extends React.Component {
  public static navigationOptions = {
    tabBarIcon: ({ tintColor }: { tintColor: string }) => (
      <SimpleLineIcons name="book-open" size={24} color={tintColor} />
    ),
  };

  public state = {
    input: '',
  };

  public onKeyboardPress = (key: [KeyType, string]) => {
    const { input } = this.state;
    if (key[0] === KeyType.Number) {
      if (
        input.length < MAX_DIGITS &&
        new Set(input + key[1]).size === (input + key[1]).length
      ) {
        this.setState({ input: input + key[1] });
      }
    } else if (key[0] === KeyType.Delete) {
      this.setState({ input: input.slice(0, input.length - 1) });
    }
  }

  public render() {
    const { input } = this.state;
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
          <History />
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
    alignSelf: 'center',
  },
  history: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Theme.colors.tertiary,
    paddingRight: Layout.width * 0.05,
    marginTop: 10,
  },
});

export default PlayScreen;
