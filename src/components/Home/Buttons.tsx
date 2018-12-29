import * as React from "react";
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  GestureResponderEvent
} from "react-native";
import { Button, Text } from "native-base";
import Layout from "../../utils/constants/Layout";

// sadly there's native-base but regarding ViewStyle types (https://github.com/GeekyAnts/NativeBase/issues/2346)
// so we'll have to rely on inline styles

type CssStyle = {
  style: ViewStyle | TextStyle | ImageStyle;
  onPress: (e: GestureResponderEvent) => void;
};

const CustomButton: React.SFC<CssStyle> = props => (
  <Button rounded light large {...props} />
);

interface ButtonsProps {
  onPlayPress: Function;
  onHistoryPress: Function;
  onTutorialPress: Function;
}

const Buttons: React.SFC<ButtonsProps> = props => {
  return (
    <>
      <View>
        <CustomButton
          onPress={() => props.onPlayPress()}
          style={{
            alignSelf: "center",
            width: "70%",
            justifyContent: "center"
          }}
        >
          <Text>PLAY</Text>
        </CustomButton>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start"
        }}
      >
        <CustomButton
          onPress={() => props.onHistoryPress()}
          style={{
            backgroundColor: "#444",
            height: "16.5%",
            alignSelf: "center",
            width: "55%",
            justifyContent: "center",
            marginTop: Layout.height * 0.04,
            marginBottom: Layout.height * 0.02
          }}
        >
          <Text style={{ color: "white" }}>History</Text>
        </CustomButton>
        <CustomButton
          onPress={() => props.onTutorialPress()}
          style={{
            backgroundColor: "#444",
            height: "16.5%",
            alignSelf: "center",
            width: "55%",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "white" }}>Tutorial</Text>
        </CustomButton>
      </View>
    </>
  );
};

export default Buttons;
