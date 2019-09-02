import React from 'react';
import {
  Animated,
  TouchableHighlight,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { AnimatedValue } from 'react-navigation';
import { MIDDLE_BUTTON_SIZE } from '../../constants/Navigation';

interface PopupButtonProps {
  x: AnimatedValue;
  y: AnimatedValue;
  opacity: AnimatedValue;
}

const PopupButton: React.FC<PopupButtonProps> = ({
  x,
  y,
  opacity,
  children,
}) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
      }}
    >
      <TouchableHighlight
        onPress={() => {}}
        underlayColor="#434b61"
        style={styles.touchableHighlight}
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
    backgroundColor: '#48A2F8',
  },
});

export default PopupButton;
