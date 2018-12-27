import * as React from "react";
import { View, StyleSheet, Image, ViewStyle, ImageStyle } from "react-native";
import { Title } from "native-base";

const STATUS_BAR_HEIGHT = 20;

interface WelcomeBarProps {
  title: string;
}

const WelcomeBar: React.SFC<WelcomeBarProps> = (props: any) => (
  <View style={styles.welcomeContainer}>
    <Image
      resizeMode="contain"
      source={require("../../../assets/icon.png")}
      style={styles.welcomeImage}
    />
    <Title style={{ fontSize: 28, color: "black" }}>{props.title}</Title>
  </View>
);

interface Style {
  welcomeImage: ImageStyle;
  welcomeContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  welcomeImage: {
    height: 120,
    marginBottom: "4%",
    alignSelf: "center"
  },
  welcomeContainer: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT + 5
  }
});

export default WelcomeBar;
