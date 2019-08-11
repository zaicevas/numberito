import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import History from '../components/Play/History';
import Keyboard from '../components/Play/Keyboard';
import { Layout, Theme } from '../constants/index';

const INPUT_LINE_WIDTH = 0.17;

const NumberInput: React.SFC = () => {
  return <View style={styles.underlineStyle} />;
};

class PlayScreen extends React.PureComponent {
  public static navigationOptions = {
    tabBarIcon: ({ tintColor }: { tintColor: string }) => (
      <SimpleLineIcons name="book-open" size={24} color={tintColor} />
    ),
  };

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.horizontalContainer}>
          <NumberInput />
          <NumberInput />
          <NumberInput />
          <NumberInput />
        </View>
        <View style={styles.history}>
          <History />
        </View>
        <View>
          <Keyboard />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '20%',
    width: '85%',
    alignSelf: 'center',
  },
  history: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Theme.colors.tertiary,
    padding: Layout.height * 0.04,
    marginTop: 10,
  },
});

export default PlayScreen;
