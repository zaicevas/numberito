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
import AnimatedButton from "./AnimatedButton";
import { NavigationInjectedProps } from "react-navigation";
import { MIDDLE_BUTTON_SIZE } from "../../constants/Navigation";
import { InputState, SCREEN_PLAY } from "../../constants/Screens";
import { Entypo, Ionicons } from "@expo/vector-icons";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AUTO_CLOSE = 15 * 1000;

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
          <Ionicons
            name={Platform.OS === "ios" ? "ios-refresh" : "md-refresh"}
            size={16}
            color={Theme.colors.white}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

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

const NavigationButtonFC: React.FC<NavigationButtonProps> = ({
  isFocused,
  backgroundColor,
  refreshScreen,
  provideAnswer,
  getInputState,
  navigation,
  toggleNotes
}) => {
  const [animate, setAnimate] = useState();
  const animatedButtonRef = useRef();
  if (!isFocused) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate(SCREEN_PLAY, {
            onKeyboardPress: () =>
              animatedButtonRef.current.untogglePopupButtonsIfToggled()
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
            {
              backgroundColor
            },
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
  }

  return (
    <View
      pointerEvents="box-none"
      style={[
        {
          backgroundColor
        },
        styles.container,
        styles.shadow
      ]}
    >
      <AnimatedButton
        ref={animatedButtonRef}
        onRefresh={() => {
          setAnimate(false);
          refreshScreen();
        }}
        onProvideAnswer={() => {
          setAnimate(true);
          provideAnswer();
        }}
        animate={animate}
        getInputState={getInputState}
        toggleNotes={toggleNotes}
      />
    </View>
  );
};
class SubButton extends React.Component {
  render() {
    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            justifyContent: "center",
            alignItems: "center"
          },
          {
            marginLeft: -15,
            left: this.props.x,
            bottom: this.props.y
          }
        ]}
      >
        <AnimatedTouchable
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: "black"
          }}
          onPress={() => console.log("PAGALIAU BLT")}
        >
          <View
            pointerEvents="box-none"
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {this.props.children}
          </View>
        </AnimatedTouchable>
      </Animated.View>
    );
  }
}

const ChiliButton: React.FC = ({ navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate(SCREEN_PLAY, {
          onKeyboardPress: () =>
            animatedButtonRef.current.untogglePopupButtonsIfToggled()
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
class MiddleButton extends React.Component {
  public state = {
    timeout: 0,
    isProvidedAnswer: false
  };

  private mode = new Animated.Value(0);

  private firstX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -40]
  });
  private firstY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100]
  });
  private secondX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 20]
  });
  private secondY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -55]
  });
  private thirdX = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 80]
  });
  private thirdY = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30]
  });
  private opacity = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });
  private rotation = this.mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"]
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
      <SubButton x={this.firstX} y={this.firstY}>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-refresh" : "md-refresh"}
          size={16}
          color={Theme.colors.white}
        />
      </SubButton>
    );
  };

  public renderActionMy = (x, y) => {
    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            justifyContent: "center",
            alignItems: "center"
          },
          {
            marginLeft: -15,
            left: x,
            bottom: y
          }
        ]}
      >
        <TouchableOpacity
          onPress={() => console.log("QEWQEVQWVEQWEVWQEWQEQW")}
          style={[
            styles.touchableHighlight,
            {
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: "black"
            }
          ]}
        >
          <View
            pointerEvents="box-none"
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons
              name={Platform.OS === "ios" ? "ios-refresh" : "md-refresh"}
              size={16}
              color={Theme.colors.white}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  render() {
    const { navigation, isFocused } = this.props;
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
          <View style={{ position: "absolute", bottom: 0 }}>
            {this.renderActions()}
          </View>
        ) : null}
        {!isFocused ? (
          <ChiliButton navigation={navigation} />
        ) : (
          <AnimatedTouchable
            activeOpacity={1}
            onPress={() => this.toggleView(false)}
          >
            <Animated.View
              style={[
                {
                  top: 15,
                  left: 0,
                  alignItems: "center",
                  justifyContent: "center"
                },
                {
                  width: 75,
                  height: 75,
                  borderRadius: 100,
                  borderColor: "white",
                  backgroundColor: "red"
                }
              ]}
            >
              <Entypo name="open-book" size={40} color={Theme.colors.white} />
            </Animated.View>
          </AnimatedTouchable>
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
