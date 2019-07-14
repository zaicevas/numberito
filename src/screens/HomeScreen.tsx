import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import Block from '../components/Block';
import Button from '../components/Button';
import WelcomeBar from '../components/Home/WelcomeBar';
import Text from '../components/Text';
import { Theme } from '../constants/index';
import { SCREEN_PLAY } from '../constants/Screens';

const TITLE = 'NUMBERITO';
const FOOTBAR_TITLE = 'ABOUT';

class HomeScreen extends React.PureComponent<NavigationInjectedProps> {
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
          <Button gradient >
            <Text center bold white>Play</Text>
          </Button>
          <Button shadow >
            <Text center semibold>History</Text>
          </Button>
          <Button gradient startColor={'#0AC4BA'} endColor={'#2BDA8E'}>
            <Text center semibold white>Tutorial</Text>
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
