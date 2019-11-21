import React, { useState, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "../constants/index";
import * as Animatable from "react-native-animatable";
import {
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  View,
  Animated
} from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import { MIDDLE_BUTTON_SIZE } from "../constants/Navigation";
import { InputState, SCREEN_PLAY } from "../constants/Screens";
import { Ionicons } from "@expo/vector-icons";

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
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const DEFAULT_TOGGLE_SIZE = 80;
const DEFAULT_ACTION_SIZE = 40;
const DEFAULT_TOGGLE_ANIMATION_DURATION = 300;
const DEFAULT_ACTION_STAGING_DURATION = 100;
const DEFAULT_ACTION_ANIMATION_DURATION = 200;
const DEFAULT_NAVIGATION_DELAY = 500;
const DEFAULT_EXPANDING_ANGLE = 135;
const DEFAULT_OVERLAY_ACTIVE = false;

class MiddleButton extends React.Component {
  renderActions = () => {
    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            justifyContent: "center",
            alignItems: "center"
          },
          {
            marginLeft: -DEFAULT_ACTION_SIZE / 2,
            left: 50,
            bottom: 20
          }
        ]}
      >
        <AnimatedTouchable
          style={{
            width: DEFAULT_ACTION_SIZE,
            height: DEFAULT_ACTION_SIZE,
            borderRadius: DEFAULT_ACTION_SIZE / 2,
            backgroundColor: "red"
          }}
          onPress={() => console.log("action pressed")}
        >
          <View
            pointerEvents="box-none"
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons
              size={20}
              active
              name="md-more"
              color={Theme.colors.green}
            />
          </View>
        </AnimatedTouchable>
      </Animated.View>
    );
  };

  render() {
    return (
      <View pointerEvents="box-none">
        <View style={{ position: "absolute", bottom: 0 }}>
          {this.renderActions()}
        </View>
        <View
          style={[
            {
              backgroundColor: "red"
            },
            styles.container,
            styles.shadow
          ]}
        >
          <Ionicons
            size={42}
            active
            name="md-more"
            color={Theme.colors.white}
          />
        </View>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  icon: ViewStyle;
  shadow: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    height: MIDDLE_BUTTON_SIZE,
    width: MIDDLE_BUTTON_SIZE,
    borderColor: "lightgrey",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50
  },
  icon: {
    alignSelf: "center",
    paddingTop: "5%"
  },
  shadow: {
    shadowColor: Theme.colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1
    }
  }
});

export default MiddleButton;
