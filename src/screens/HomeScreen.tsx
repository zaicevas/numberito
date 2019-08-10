import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, ViewStyle } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import Block from '../components/Block';
import Button from '../components/Button';
import WelcomeBar from '../components/Home/WelcomeBar';
import Text from '../components/Text';
import { Theme } from '../constants/index';
import { SCREEN_PLAY } from '../constants/Screens';

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
    console.log('tutorial pressed');
  }

  public handleHelpPress() {
    console.log('about pressed');
  }

  public render() {
    return (
      <>
        <WelcomeBar title={TITLE} />
        <Block flex={1} margin={[0, Theme.sizes.padding * 2]}>
          <Button gradient onPress={() => this.handlePlayPress()}>
            <Text center bold white>
              Play
            </Text>
          </Button>
          <Button gradient startColor={'#0AC4BA'} endColor={'#2BDA8E'}>
            <Text center semibold white>
              Tutorial
            </Text>
          </Button>
        </Block>
      </>
    );
  }
}

export default HomeScreen;

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
});
