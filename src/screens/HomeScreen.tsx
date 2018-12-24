import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Touchable,
  ImageStyle
} from "react-native";
import { Button, Text, Title, Icon, Left, Right } from "native-base";
import { LinearGradient, LinearGradientProps } from "expo";
import { Omit } from "../utils/types";
import Layout from "../constants/Layout";

type BackgroundProps = Omit<LinearGradientProps, "colors" | "style">;

const TITLE = "GUESS THE NUMBER";
const ABOUT_TITLE = "ABOUT";

// sadly there's native-base but regarding ViewStyle types (https://github.com/GeekyAnts/NativeBase/issues/2346)
// so we'll have to rely on inline styles

const ButtonNative = ({
  title,
  icon,
  onPress
}: {
  title: string;
  icon: string;
  onPress: Touchable["onTouchEnd"];
}): JSX.Element => (
  <View>
    <Button
      rounded
      style={{
        marginVertical: 10,
        backgroundColor: "#444",
        zIndex: -1000,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 30
      }}
      onPress={onPress}
    >
      {" "}
      <Left>
        {" "}
        <Icon name={icon} style={styles.roleIcon} />{" "}
      </Left>{" "}
      <Text>{title}</Text> <Right />{" "}
    </Button>
  </View>
);

const Background: React.SFC<BackgroundProps> = props => (
  <LinearGradient
    colors={["#9e49ff", "#6899e8"]}
    style={styles.gradientBackground}
    {...props}
  />
);

class HomeScreen extends React.Component {
  handleHelpPress() {
    console.log("about pressed");
  }

  render() {
    return (
      <View style={styles.container}>
        <Background />
        <View style={styles.welcomeContainer}>
          <Image
            resizeMode="contain"
            source={require("../../assets/icon.png")}
            style={styles.welcomeImage}
          />
          <Title style={{ fontSize: 28, color: "white" }}>{TITLE}</Title>
        </View>
        <View style={styles.allScreenContainer}>
          <Button
            rounded
            light
            large
            style={{
              alignSelf: "center",
              width: "70%",
              justifyContent: "center"
            }}
          >
            <Text>PLAY</Text>
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start"
          }}
        >
          <Button
            rounded
            light
            large
            style={{
              height: "15%",
              alignSelf: "center",
              width: "55%",
              justifyContent: "center",
              marginTop: Layout.height * 0.07,
              marginBottom: Layout.height * 0.02
            }}
          >
            <Text>Tutorial</Text>
          </Button>
          <Button
            rounded
            light
            large
            style={{
              height: "15%",
              alignSelf: "center",
              width: "45%",
              justifyContent: "center"
            }}
          >
            <Text>History</Text>
          </Button>
        </View>
        <TouchableOpacity
          onPress={this.handleHelpPress}
          style={styles.helpLink}
        >
          <View style={styles.tabBarInfoContainer}>
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
  welcomeImage: ImageStyle;
  welcomeContainer: ViewStyle;
  allScreenContainer: ViewStyle;
  tabBarInfoContainer: ViewStyle;
  tabBarInfoText: TextStyle;
  helpLink: ViewStyle;
  helpLinkText: TextStyle;
  roleIcon: ViewStyle;
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
  welcomeImage: {
    height: 120,
    marginBottom: "4%",
    alignSelf: "center"
  },
  welcomeContainer: {
    backgroundColor: "red",
    flex: 1,
    marginTop: 25
  },
  allScreenContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
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
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  roleIcon: {}
});

export default HomeScreen;
