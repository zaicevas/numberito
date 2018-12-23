import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Text, Title } from "native-base";
import { LinearGradient, LinearGradientProps } from "expo";
import { Omit } from "../utils/types";
import Layout from "../constants/Layout";

type BackgroundProps = Omit<LinearGradientProps, "colors" | "style">;

const TITLE = "GUESS THE NUMBER";

const Background: React.SFC<BackgroundProps> = props => (
  <LinearGradient
    colors={["#9e49ff", "#6899e8"]}
    style={styles.gradientBackground}
    {...props}
  />
);

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Background />
        <View style={styles.welcomeContainer}>
          <Image
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    resizeMode: "contain",
    marginBottom: "4%",
    alignSelf: "center"
  },
  welcomeContainer: {
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
  }
});

export default HomeScreen;
