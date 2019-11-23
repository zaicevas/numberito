import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, Platform, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationInjectedProps } from 'react-navigation';
import { Layout, Theme } from '../constants/index';
import { MIDDLE_BUTTON_SIZE } from '../constants/Navigation';
import { InputState, SCREEN_PLAY } from '../constants/Screens';
import SubButton from './SubButton';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AUTO_CLOSE = 15 * 1000;

interface NavigationButtonProps extends NavigationInjectedProps {
  isFocused: boolean;
  backgroundColor: string;
  navigate: () => void;
  refreshScreen: () => void;
  provideAnswer: () => void;
  getInputState: () => InputState;
  toggleNotes: () => void;
}

const ANIMATION_LENGTH = 1500;
const SUB_BUTTON_SIZE = 40;

const ChiliButton: React.FC = ({ navigation, untoggle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate(SCREEN_PLAY, {
          onKeyboardPress: () => untoggle(),
        })
      }
    >
      <Animatable.View
        easing="ease-out"
        animation="tada"
        iterationCount="infinite"
        duration={ANIMATION_LENGTH}
        useNativeDriver={true}
        style={[
          { backgroundColor: Theme.colors.primary },
          styles.container,
          styles.shadow,
        ]}
      >
        <MaterialCommunityIcons
          size={48}
          style={styles.icon}
          active
          name="chili-mild"
          color={Theme.colors.white}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

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

const MiddleButton: React.FC = ({
  navigation,
  isFocused,
  activeTintColor,
  refreshScreen,
  provideAnswer,
  getInputState,
  toggleNotes,
}) => {
  const moreButtonRef = useRef();
  return (
    <View
      pointerEvents="box-none"
      style={{
        flex: 1,
        alignItems: 'center',
        height: MIDDLE_BUTTON_SIZE,
        width: MIDDLE_BUTTON_SIZE,
        bottom: 15,
      }}
    >
      {isFocused ? (
        <MoreButton
          ref={moreButtonRef}
          backgroundColor={activeTintColor}
          getInputState={getInputState}
          toggleNotes={toggleNotes}
          refreshScreen={refreshScreen}
          provideAnswer={provideAnswer}
        />
      ) : (
          <ChiliButton
            navigation={navigation}
            untoggle={() => moreButtonRef.current.untoggleSubButtonsIfToggled()}
          />
        )}
    </View>
  );
};

interface Style {
  container: ViewStyle;
  icon: ViewStyle;
  shadow: ViewStyle;
  touchableHighlight: ViewStyle;
  overlayActive: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    height: MIDDLE_BUTTON_SIZE,
    width: MIDDLE_BUTTON_SIZE,
    borderColor: 'lightgrey',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  icon: {
    alignSelf: 'center',
    paddingTop: '5%',
  },
  shadow: {
    shadowColor: Theme.colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  touchableHighlight: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: MIDDLE_BUTTON_SIZE / 2,
    height: MIDDLE_BUTTON_SIZE / 2,
    borderRadius: MIDDLE_BUTTON_SIZE / 4,
  },
  overlayActive: {
    position: 'absolute',
    height: Layout.height * 2,
    width: Layout.width * 2,
    backgroundColor: 'transparent',
    bottom: '-150%',
  },
});

export default MiddleButton;
