import React from 'react';
import {
  Animated,
  TouchableHighlight,
  View,
  Platform,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from '@expo/vector-icons';
import { Theme } from '../../constants/index';
import { MIDDLE_BUTTON_SIZE } from '../../constants/Navigation';
import PopupButton from './PopupButton';

const AUTO_CLOSE = 15 * 1000;

interface AnimatedButtonState {
  timeout: number;
}

class AnimatedButton extends React.Component<never, AnimatedButtonState> {
  public state = {
    timeout: 0,
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
  public render() {
    return (
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
        }}
      >
        <PopupButton x={this.firstX} y={this.firstY} opacity={this.opacity}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
            size={16}
            color="#F8F8F8"
          />
        </PopupButton>
        <PopupButton x={this.secondX} y={this.secondY} opacity={this.opacity}>
          <Icon name="home" size={16} color="#F8F8F8" />
        </PopupButton>
        <PopupButton x={this.thirdX} y={this.thirdY} opacity={this.opacity}>
          <Icon name="archive" size={16} color="#F8F8F8" />
        </PopupButton>
        <TouchableHighlight
          onPress={() => this.toggleView(false)}
          activeOpacity={0.7}
          underlayColor="#434b61"
          style={styles.touchableHighlight}
        >
          <Animated.View
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
          </Animated.View>
        </TouchableHighlight>
      </View>
    );
  }
}

interface Style {
  touchableHighlight: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  touchableHighlight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: MIDDLE_BUTTON_SIZE,
    height: MIDDLE_BUTTON_SIZE,
    borderRadius: MIDDLE_BUTTON_SIZE / 2,
  },
});

export default AnimatedButton;
