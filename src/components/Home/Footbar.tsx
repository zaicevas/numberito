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

interface FootbarProps {
  onFootbarPress: Function;
  title: string;
}

const Footbar: React.SFC<FootbarProps> = props => (
  <TouchableOpacity
    onPress={() => props.onFootbarPress()}
    style={styles.helpLink}
  >
    <View
      style={
        Platform.OS === "ios"
          ? styles.tabBarInfoContainer
          : styles.tabBarInfoContainerAndroid
      }
    >
      <Text style={styles.helpLinkText}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

interface Style {
  tabBarInfoContainer: ViewStyle;
  tabBarInfoContainerAndroid: ViewStyle;
  helpLink: ViewStyle;
  helpLinkText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
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
  }
});

export default Footbar;
