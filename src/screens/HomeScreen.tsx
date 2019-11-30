import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import Button from '../components/Button';
import WelcomeBar from '../components/Home/WelcomeBar';
import Text from '../components/Text';
import { Layout } from '../constants/index';
import { SCREEN_FEEDBACK, SCREEN_PLAY, SCREEN_TUTORIAL } from '../constants/Screens';

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

  public handleFeedbackPress() {
    this.props.navigation.navigate(SCREEN_FEEDBACK);
  }

  public handlePlayPress() {
    this.props.navigation.navigate(SCREEN_PLAY);
  }

  public handleTutorialPress() {
    this.props.navigation.navigate(SCREEN_TUTORIAL);
  }

  public render() {
    return (
      <>
        <WelcomeBar title={TITLE} />
        <View style={styles.container}>
          <Button
            gradient
            startColor={'#0AC4BA'}
            endColor={'#2BDA8E'}
            style={styles.button}
            onPress={() => this.handleTutorialPress()}
          >
            <Text center bold white>
              Tutorial
            </Text>
          </Button>
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
            startColor={'#0a80c4'}
            endColor={'#0a5bc4'}
            onPress={() => this.handleFeedbackPress()}
            style={styles.button}
          >
            <Text center bold white>
              Feedback
            </Text>
          </Button>
        </View>
        <TouchableOpacity style={styles.helpIcon}>
          <Ionicons name="ios-help-circle-outline" size={32} />
        </TouchableOpacity>
      </>
    );
  }
}

export default HomeScreen;

interface Style {
  container: ViewStyle;
  button: ViewStyle;
  helpIcon: ViewStyle;
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
  helpIcon: {
    position: 'absolute',
    marginTop: Constants.statusBarHeight,
    left: Layout.width - (32 + 6),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
