import { Button } from "react-native-elements";

const GradientButton = () => (
  <Button
    buttonStyle={{
      alignSelf: "center",
      borderRadius: 50,
      width: "100%",
      height: 65
    }}
    title="PLAY"
    titleStyle={{ color: "black" }}
    linearGradientProps={{
      colors: ["#c9c9c9", "#ffffff", "#c9c9c9"],
      start: [0, 0],
      end: [0.8, 0],
      locations: [0, 0.5, 1]
    }}
  />
);

export default GradientButton;
