import React from 'react';
import {
  Animated,
  TouchableHighlight,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { MIDDLE_BUTTON_SIZE } from '../../constants/Navigation';
import { Theme } from '../../constants/index';

interface PopupButtonProps {
  x: AnimatedValue;
  y: AnimatedValue;
  opacity: AnimatedValue;
  onPress?: () => void;
  disabled?: boolean;
}

const PopupButton: React.FC<PopupButtonProps> = ({
  x,
  y,
  opacity,
  children,
  onPress,
  disabled,
}) => {
  return (
    <Animated.View
      style={{
        opacity,
        position: 'absolute',
        left: x,
        top: y,
      }}
    >
      <TouchableHighlight
        onPress={onPress}
        underlayColor="#434b61"
        style={[
          styles.touchableHighlight,
          {
            backgroundColor: disabled
              ? Theme.colors.gray
              : Theme.colors.lightBlue,
          },
        ]}
        disabled={disabled}
      >
        {children}
      </TouchableHighlight>
    </Animated.View>
  );
};

interface Style {
  touchableHighlight: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  touchableHighlight: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: MIDDLE_BUTTON_SIZE / 2,
    height: MIDDLE_BUTTON_SIZE / 2,
    borderRadius: MIDDLE_BUTTON_SIZE / 4,
  },
});

export default PopupButton;
