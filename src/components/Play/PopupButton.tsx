import React from "react";
import {
  Animated,
  TouchableHighlight,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  View
} from "react-native";
import { AnimatedValue } from "react-navigation";
import { MIDDLE_BUTTON_SIZE } from "../../constants/Navigation";
import { Theme } from "../../constants/index";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

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
  disabled
}) => {
  return (
    <Animated.View
      style={{
        opacity,
        position: "absolute",
        left: x,
        top: y
      }}
    >
      <TouchableOpacity
        onPressIn={onPress}
        style={[
          styles.touchableHighlight,
          {
            backgroundColor: disabled
              ? Theme.colors.gray
              : Theme.colors.lightBlue
          }
        ]}
        disabled={disabled}
      >
        <View
          pointerEvents="box-none"
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {children}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

interface Style {
  touchableHighlight: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  touchableHighlight: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: MIDDLE_BUTTON_SIZE / 2,
    height: MIDDLE_BUTTON_SIZE / 2,
    borderRadius: MIDDLE_BUTTON_SIZE / 4
  }
});

export default PopupButton;
