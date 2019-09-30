import React from 'react';
import {
  Animated,
  TouchableHighlight,
  View,
  Platform,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { Theme } from '../../constants/index';
import { MIDDLE_BUTTON_SIZE } from '../../constants/Navigation';
import PopupButton from './PopupButton';
import * as Animatable from 'react-native-animatable';
import { InputState } from '../../constants/Screens';

const AUTO_CLOSE = 15 * 1000;
const ANIMATION_LENGTH = 1000;

interface AnimatedButtonProps {
  onRefresh: () => void;
  onProvideAnswer: () => void;
  animate: boolean;
  getInputState: () => InputState;
  toggleNotes: () => void;
}

interface AnimatedButtonState {
  timeout: number;
}

class AnimatedButton extends React.Component<
  AnimatedButtonProps,
  AnimatedButtonState
> {
  public state = {
    timeout: 0,
    isProvidedAnswer: false,
  };

  private mode = new Animated.Value(0);

  private firstX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -40],
  });
  private firstY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });
  private secondX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 20],
  });
  private secondY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -55],
  });
  private thirdX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 80],
  });
  private thirdY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });
  private opacity = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  private rotation = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  // should be rewritten without flag parameter
  public toggleView = (automatic: boolean) => {
    const { timeout } = this.state;
    const { _value } = this.mode;
    if (_value === 1 || !automatic) {
      Animated.timing(this.mode, {
        toValue: _value === 0 ? 1 : 0,
        duration: 300,
      }).start();
      clearTimeout(timeout);
    }
    if (_value === 0) {
      const newTimeout = setTimeout(() => this.toggleView(true), AUTO_CLOSE);
      this.setState({ timeout: newTimeout });
    }
  }

  public untogglePopupButtonsIfToggled = () => {
    const { _value } = this.mode;
    const { timeout } = this.state;
    if (_value === 0) return;
    Animated.timing(this.mode, {
      toValue: 0,
      duration: 300,
    }).start();
    clearTimeout(timeout);
  }

  public render() {
    const {
      onRefresh,
      onProvideAnswer,
      animate,
      getInputState,
      toggleNotes,
    } = this.props;
    const inputState = getInputState();
    const isProvidedAnswer = inputState === InputState.PROVIDED_ANSWER;
    const isCorrectAnswer = inputState === InputState.CORRECT_ANSWER;
    return (
      <View style={styles.container}>
        <PopupButton
          x={this.firstX}
          y={this.firstY}
          opacity={this.opacity}
          onPress={() => this.handleRefresh(onRefresh)}
        >
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
            size={16}
            color={Theme.colors.white}
          />
        </PopupButton>
        <PopupButton
          x={this.secondX}
          y={this.secondY}
          opacity={this.opacity}
          onPress={() => this.handleProvideAnswer(onProvideAnswer)}
          disabled={isProvidedAnswer || isCorrectAnswer}
        >
          <MaterialCommunityIcons
            name="numeric"
            size={16}
            color={Theme.colors.white}
          />
        </PopupButton>
        <PopupButton
          x={this.thirdX}
          y={this.thirdY}
          opacity={this.opacity}
          onPress={() => this.wrapOnPress(toggleNotes)}
        >
          <Entypo name="open-book" size={16} color={Theme.colors.white} />
        </PopupButton>
        <TouchableHighlight
          onPress={() => this.toggleView(false)}
          activeOpacity={0.7}
          underlayColor="#434b61"
          style={styles.touchableHighlight}
        >
          <Animatable.View
            easing="ease-out"
            animation={animate ? 'wobble' : ''}
            iterationCount="infinite"
            duration={ANIMATION_LENGTH}
            useNativeDriver={true}
            style={{
              transform: [{ rotate: this.rotation }],
            }}
          >
            <Ionicons
              size={42}
              active
              name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'}
              color={Theme.colors.white}
            />
          </Animatable.View>
        </TouchableHighlight>
      </View>
    );
  }

  private handleProvideAnswer = (onProvideAnswer: () => void) => {
    this.wrapOnPress(onProvideAnswer);
  }

  private handleRefresh = (onRefresh: () => void) => {
    this.wrapOnPress(onRefresh);
  }

  private wrapOnPress = (onPress: () => void) => {
    this.toggleView(false);
    onPress();
  }
}

interface Style {
  container: ViewStyle;
  touchableHighlight: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    position: 'absolute',
    alignItems: 'center',
  },
  touchableHighlight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: MIDDLE_BUTTON_SIZE,
    height: MIDDLE_BUTTON_SIZE,
    borderRadius: MIDDLE_BUTTON_SIZE / 2,
  },
});

export default AnimatedButton;
