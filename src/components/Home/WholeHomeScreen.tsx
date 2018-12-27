import * as React from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ViewStyle,
  TextStyle
} from "react-native";
import { Text } from "native-base";
import { LinearGradient, LinearGradientProps } from "expo";
import { Omit } from "../../utils/types";
import WelcomeBar from "./WelcomeBar";
import Buttons from "./Buttons";

// sadly there's native-base but regarding ViewStyle types (https://github.com/GeekyAnts/NativeBase/issues/2346)
// so we'll have to rely on inline styles

const TITLE = "GUESS THE NUMBER";
const ABOUT_TITLE = "ABOUT";

type BackgroundProps = Omit<LinearGradientProps, "colors" | "style">;

const Background: React.SFC<BackgroundProps> = props => (
  <LinearGradient
    colors={["#9e49ff", "#6899e8"]}
    style={styles.gradientBackground}
    {...props}
  />
);

export default class WholeHomeScreen extends React.Component {
  handlePlayPress() {
    console.log("play");
  }

  handleHistoryPress() {}

  handleTutorialPress() {
    console.log("tutorial pressed");
  }

  handleHelpPress() {
    console.log("about pressed");
  }

  render() {
    return (
      <View style={styles.container}>
        <Background />
        <WelcomeBar title={TITLE} />
        <Buttons
          onPlayPress={this.handlePlayPress}
          onHistoryPress={this.handleHistoryPress}
          onTutorialPress={this.handleTutorialPress}
        />
        <TouchableOpacity
          onPress={this.handleHelpPress}
          style={styles.helpLink}
        >
          <View
            style={
              Platform.OS === "ios"
                ? styles.tabBarInfoContainer
                : styles.tabBarInfoContainerAndroid
            }
          >
            <Text style={styles.helpLinkText}>{ABOUT_TITLE}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  gradientBackground: ViewStyle;
  tabBarInfoContainer: ViewStyle;
  tabBarInfoContainerAndroid: ViewStyle;
  helpLink: ViewStyle;
  helpLinkText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1
  },
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "black",
    shadowOffset: { height: -5, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 12
  },
  tabBarInfoContainerAndroid: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 12,
    elevation: 20
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
