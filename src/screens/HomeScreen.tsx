import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import Block from '../components/Block';
import Button from '../components/Button';
import Buttons from '../components/Home/Buttons';
import Footbar from '../components/Home/Footbar';
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
      <View style={styles.container}>
        <WelcomeBar title={TITLE} />
        <Block middle flex={0.5} margin={[0, Theme.sizes.padding * 2]}>
          <Button gradient >
            <Text center bold white>Play</Text>
          </Button>
        </Block>
        <Buttons
          onPlayPress={() => this.handlePlayPress()}
          onHistoryPress={() => this.handleHistoryPress()}
          onTutorialPress={() => this.handleTutorialPress()}
        />
        <Footbar title={FOOTBAR_TITLE} onFootbarPress={this.handleHelpPress} />
      </View>
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
