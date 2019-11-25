import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Platform, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Theme } from '../constants/index';
import { AnimatedTouchable, ANIMATION_LENGTH, MIDDLE_BUTTON_SIZE } from '../constants/Navigation';
import { InputState } from '../constants/Screens';
import { Styles } from './Styles';
import SubButton from './SubButton';

const AUTO_CLOSE = 15 * 1000;
const SUB_BUTTON_SIZE = 40;
const styles = Styles;

class MoreButton extends React.Component {
  public state = {
    timeout: 0,
    animateButton: false,
  };
  private mode = new Animated.Value(0);

  private firstX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-SUB_BUTTON_SIZE / 2, -SUB_BUTTON_SIZE / 2 - 60],
  });
  private firstY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60],
  });
  private secondX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-SUB_BUTTON_SIZE / 2, -SUB_BUTTON_SIZE / 2],
  });
  private secondY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 90],
  });
  private thirdX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-SUB_BUTTON_SIZE / 2, -SUB_BUTTON_SIZE / 2 + 60],
  });
  private thirdY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60],
  });
  private opacity = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  private rotation = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  public render() {
    const { animateButton } = this.state;
    const { backgroundColor } = this.props;
    return (
      <>
        {this.renderActions()}
        <AnimatedTouchable
          activeOpacity={0.7}
          onPress={() => this.toggleView(false)}
        >
          <Animated.View
            style={[
              {
                left: 0,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ rotate: this.rotation }],
              },
              {
                width: MIDDLE_BUTTON_SIZE,
                height: MIDDLE_BUTTON_SIZE,
                borderRadius: 100,
                borderColor: 'white',
                backgroundColor,
              },
              styles.shadow,
            ]}
          >
            <Animatable.View
              easing="ease-out"
              animation={animateButton ? 'wobble' : ''}
              iterationCount="infinite"
              duration={ANIMATION_LENGTH}
              useNativeDriver={true}
            >
              <Ionicons
                size={42}
                active
                name="md-more"
                color={Theme.colors.white}
              />
            </Animatable.View>
          </Animated.View>
        </AnimatedTouchable>
      </>
    );
  }

  public renderActions = () => {
    const { getInputState } = this.props;
    const inputState = getInputState();
    const isProvidedAnswer = inputState === InputState.PROVIDED_ANSWER;
    const isCorrectAnswer = inputState === InputState.CORRECT_ANSWER;
    return (
      <View style={{ position: 'absolute', bottom: 0 }}>
        <SubButton
          x={this.firstX}
          y={this.firstY}
          opacity={this.opacity}
          onPress={() => this.handleRefresh()}
        >
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
            size={16}
            color={Theme.colors.white}
          />
        </SubButton>
        <SubButton
          x={this.secondX}
          y={this.secondY}
          opacity={this.opacity}
          onPress={() => this.handleProvideAnswer()}
          disabled={isProvidedAnswer || isCorrectAnswer}
        >
          <MaterialCommunityIcons
            name="numeric"
            size={16}
            color={Theme.colors.white}
          />
        </SubButton>
        <SubButton
          x={this.thirdX}
          y={this.thirdY}
          opacity={this.opacity}
          onPress={() => this.handleNotes()}
        >
          <Entypo name="open-book" size={16} color={Theme.colors.white} />
        </SubButton>
      </View>
    );
  }

  public untoggleSubButtonsIfToggled = () => {
    const { _value } = this.mode;
    const { timeout } = this.state;
    if (_value === 0) return;
    Animated.timing(this.mode, {
      toValue: 0,
      duration: 300,
    }).start();
    clearTimeout(timeout);
  }
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

  private handleProvideAnswer = () => {
    const { provideAnswer } = this.props;
    this.setState({ animateButton: true });
    this.wrapOnPress(provideAnswer);
  }

  private handleRefresh = () => {
    const { refreshScreen } = this.props;
    this.setState({ animateButton: false });
    this.wrapOnPress(refreshScreen);
  }

  private handleNotes = () => {
    const { toggleNotes } = this.props;
    this.wrapOnPress(toggleNotes);
  }

  private wrapOnPress = (onPress: () => void) => {
    this.toggleView(false);
    onPress();
  }
}

export default MoreButton;
