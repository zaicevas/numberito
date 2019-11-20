import React, { useState, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "../../constants/index";
import * as Animatable from "react-native-animatable";
import {
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  View,
  Animated,
  Platform
} from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import { MIDDLE_BUTTON_SIZE } from "../../constants/Navigation";
import { InputState, SCREEN_PLAY } from "../../constants/Screens";
import { Entypo, Ionicons } from "@expo/vector-icons";

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

const SubButton: React.FC = ({ x, y, opacity, disabled, children }) => (
  <Animated.View
    style={[
      {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        left: x,
        bottom: y,
        opacity: opacity
      }
    ]}
  >
    <AnimatedTouchable
      style={{
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: disabled ? Theme.colors.gray : Theme.colors.lightBlue
      }}
      onPress={() => console.log("PAGALIAU!")}
      disabled={disabled}
    >
      <View
        pointerEvents="box-none"
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        {children}
      </View>
    </AnimatedTouchable>
  </Animated.View>
);

const ChiliButton: React.FC = ({ navigation, untoggle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate(SCREEN_PLAY, {
          onKeyboardPress: () => untoggle()
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
          styles.shadow
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
  state = {
    timeout: 0
  };
  private mode = new Animated.Value(0);

  private firstX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -70]
  });
  private firstY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60]
  });
  private secondX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0]
  });
  private secondY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 90]
  });
  private thirdX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 70]
  });
  private thirdY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60]
  });
  private opacity = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });
  private rotation = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"]
  });

  render() {
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
                alignItems: "center",
                justifyContent: "center",
                transform: [{ rotate: this.rotation }]
              },
              {
                width: MIDDLE_BUTTON_SIZE,
                height: MIDDLE_BUTTON_SIZE,
                borderRadius: 100,
                borderColor: "white",
                backgroundColor
              }
            ]}
          >
            <Ionicons
              size={42}
              active
              name="md-more"
              color={Theme.colors.white}
            />
          </Animated.View>
        </AnimatedTouchable>
      </>
    );
  }

  public renderActions = () => {
    return (
      <View style={{ position: "absolute", bottom: 0 }}>
        <SubButton x={this.firstX} y={this.firstY} opacity={this.opacity}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-refresh" : "md-refresh"}
            size={16}
            color={Theme.colors.white}
          />
        </SubButton>
        <SubButton x={this.secondX} y={this.secondY} opacity={this.opacity}>
          <MaterialCommunityIcons
            name="numeric"
            size={16}
            color={Theme.colors.white}
          />
        </SubButton>
        <SubButton x={this.thirdX} y={this.thirdY} opacity={this.opacity}>
          <Entypo name="open-book" size={16} color={Theme.colors.white} />
        </SubButton>
      </View>
    );
  };

  // should be rewritten without flag parameter
  public toggleView = (automatic: boolean) => {
    console.log("YE");
    const { timeout } = this.state;
    const { _value } = this.mode;
    if (_value === 1 || !automatic) {
      Animated.timing(this.mode, {
        toValue: _value === 0 ? 1 : 0,
        duration: 300
      }).start();
      clearTimeout(timeout);
    }
    if (_value === 0) {
      const newTimeout = setTimeout(() => this.toggleView(true), AUTO_CLOSE);
      this.setState({ timeout: newTimeout });
    }
  };
}

class MiddleButton extends React.Component {
  public state = {
    timeout: 0,
    isProvidedAnswer: false
  };

  public untoggleSubButtonsIfToggled = () => {
    const { _value } = this.mode;
    const { timeout } = this.state;
    if (_value === 0) return;
    Animated.timing(this.mode, {
      toValue: 0,
      duration: 300
    }).start();
    clearTimeout(timeout);
  };

  private mode = new Animated.Value(0);

  private firstX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -70]
  });
  private firstY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60]
  });
  private secondX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0]
  });
  private secondY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 90]
  });
  private thirdX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 70]
  });
  private thirdY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60]
  });
  private opacity = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });
  private rotation = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"]
  });

  // should be rewritten without flag parameter
  public toggleView = (automatic: boolean) => {
    console.log("YE");
    const { timeout } = this.state;
    const { _value } = this.mode;
    if (_value === 1 || !automatic) {
      Animated.timing(this.mode, {
        toValue: _value === 0 ? 1 : 0,
        duration: 300
      }).start();
      clearTimeout(timeout);
    }
    if (_value === 0) {
      const newTimeout = setTimeout(() => this.toggleView(true), AUTO_CLOSE);
      this.setState({ timeout: newTimeout });
    }
  };

  public renderActions = () => {
    return (
      <>
        <SubButton x={this.firstX} y={this.firstY} opacity={this.opacity}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-refresh" : "md-refresh"}
            size={16}
            color={Theme.colors.white}
          />
        </SubButton>
        <SubButton x={this.secondX} y={this.secondY} opacity={this.opacity}>
          <MaterialCommunityIcons
            name="numeric"
            size={16}
            color={Theme.colors.white}
          />
        </SubButton>
        <SubButton x={this.thirdX} y={this.thirdY} opacity={this.opacity}>
          <Entypo name="open-book" size={16} color={Theme.colors.white} />
        </SubButton>
      </>
    );
  };

  render() {
    console.log("rerender()");
    const { navigation, isFocused, activeTintColor } = this.props;
    return (
      <View
        pointerEvents="box-none"
        style={{
          flex: 1,
          alignItems: "center",
          height: MIDDLE_BUTTON_SIZE,
          width: MIDDLE_BUTTON_SIZE,
          bottom: 15
        }}
      >
        {isFocused ? (
          <MoreButton backgroundColor={activeTintColor} />
        ) : (
          <ChiliButton
            navigation={navigation}
            untoggle={() => this.untoggleSubButtonsIfToggled()}
          />
        )}
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  icon: ViewStyle;
  shadow: ViewStyle;
  touchableHighlight: ViewStyle;
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
  },
  touchableHighlight: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: MIDDLE_BUTTON_SIZE / 2,
    height: MIDDLE_BUTTON_SIZE / 2,
    borderRadius: MIDDLE_BUTTON_SIZE / 4
  }
});

export default MiddleButton;
