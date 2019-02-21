import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import PlayScreen from "../screens/PlayScreen";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({ header: null })
    },
    Play: {
      screen: PlayScreen,
      navigationOptions: () => ({    headerTintColor: 'black'})
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
