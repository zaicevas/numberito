import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, ViewStyle, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import Button from '../components/Button';
import WelcomeBar from '../components/Home/WelcomeBar';
import Text from '../components/Text';
import { SCREEN_PLAY, SCREEN_TUTORIAL } from '../constants/Screens';

const TITLE = 'NUMBERITO';

class HomeScreen extends React.PureComponent<NavigationInjectedProps> {
  public static navigationOptions = {
    tabBarIcon: ({ tintColor }: { tintColor: string }) => (
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        size={28}
        color={tintColor}
      />
    ),
  };

  public handlePlayPress() {
    this.props.navigation.navigate(SCREEN_PLAY);
  }

  public handleHistoryPress() {
    console.log('history pressed');
  }

  public handleTutorialPress() {
    this.props.navigation.navigate(SCREEN_TUTORIAL);
  }

  public handleHelpPress() {
    console.log('about pressed');
  }

  public render() {
    return (
      <>
        <WelcomeBar title={TITLE} />
        <View style={styles.container}>
          <Button
            gradient
            onPress={() => this.handlePlayPress()}
            style={styles.button}
          >
            <Text center bold white>
              Play
            </Text>
          </Button>
          <Button
            gradient
            startColor={'#0AC4BA'}
            endColor={'#2BDA8E'}
            style={styles.button}
            onPress={() => this.handleTutorialPress()}
          >
            <Text center semibold white>
              Tutorial
            </Text>
          </Button>
        </View>
      </>
    );
  }
}

export default HomeScreen;

interface Style {
  container: ViewStyle;
  button: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '90%',
    alignSelf: 'center',
  },
});
