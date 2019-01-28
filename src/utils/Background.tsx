import * as React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { LinearGradient, LinearGradientProps } from "expo";
import { Omit } from "./types";

type BackgroundProps = Omit<LinearGradientProps, "colors" | "style">;

const Background: React.SFC<BackgroundProps> = props => (
  <LinearGradient
    colors={["#9e49ff", "#6899e8"]}
    style={styles.gradientBackground}
    {...props}
  />
);

interface Style {
  gradientBackground: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  }
});

export default Background;
