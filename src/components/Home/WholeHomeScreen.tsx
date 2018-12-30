import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient, LinearGradientProps } from "expo";
import { Omit } from "../../utils/types";
import WelcomeBar from "./WelcomeBar";
import Buttons from "./Buttons";
import Footbar from "./Footbar";

const TITLE = "GUESS THE NUMBER";
const FOOTBAR_TITLE = "ABOUT";

type BackgroundProps = Omit<LinearGradientProps, "colors" | "style">;

const Background: React.SFC<BackgroundProps> = props => (
  <LinearGradient
    colors={["#9e49ff", "#6899e8"]}
    style={styles.gradientBackground}
    {...props}
  />
);

export default class WholeHomeScreen extends React.Component<
  { navigation: { navigate: Function } },
  any
> {
  handlePlayPress() {
    this.props.navigation.navigate("Play");
  }

  handleHistoryPress() {
    console.log("history pressed");
  }

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
          onPlayPress={() => this.handlePlayPress()}
          onHistoryPress={() => this.handleHistoryPress()}
          onTutorialPress={() => this.handleTutorialPress()}
        />
        <Footbar title={FOOTBAR_TITLE} onFootbarPress={this.handleHelpPress} />
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
  gradientBackground: ViewStyle;
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
  }
});
