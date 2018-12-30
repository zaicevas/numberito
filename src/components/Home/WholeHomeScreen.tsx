import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import WelcomeBar from "./WelcomeBar";
import Buttons from "./Buttons";
import Footbar from "./Footbar";
import { SCREEN_PLAY } from "../../utils/constants/screens";
import Background from "../../utils/background";

const TITLE = "GUESS THE NUMBER";
const FOOTBAR_TITLE = "ABOUT";

export default class WholeHomeScreen extends React.Component<
  WholeHomeScreenProps,
  {}
> {
  handlePlayPress() {
    this.props.navigation.navigate(SCREEN_PLAY);
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
}

interface WholeHomeScreenProps {
  navigation: {
    navigate: Function;
  };
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1
  }
});
