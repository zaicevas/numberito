import React from "react";
import { Platform } from "react-native";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  NavigationBottomTabScreenOptions,
  NavigationInjectedProps
} from "react-navigation";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import PlayScreen from "../screens/PlayScreen";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { Theme } from "../constants/index";
import TabBar from "./TabBar";
import { SCREEN_HOME, SCREEN_HISTORY } from "../constants/Screens";
import TutorialScreen from "../screens/TutorialScreen";

const FOOTBAR_ICON_SIZE = 30;

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Tutorial: {
      screen: TutorialScreen
    }
  },
  {
    initialRouteName: SCREEN_HOME,
    defaultNavigationOptions: () => ({ header: null })
  }
);

HomeStackNavigator.navigationOptions = ({
  navigation
}: NavigationInjectedProps) => ({
  tabBarVisible: navigation.state.index === 0
});

const HistoryStackNavigator = createStackNavigator(
  {
    History: {
      screen: HistoryScreen,
      navigationOptions: () => ({
        title: SCREEN_HISTORY,
        headerStyle: {
          backgroundColor: Theme.colors.tertiaryShadow
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      })
    }
  },
  {
    initialRouteName: SCREEN_HISTORY
  }
);

HistoryStackNavigator.navigationOptions = {
  tabBarIcon: ({ tintColor }: { tintColor: string }) => (
    <SimpleLineIcons name="book-open" size={24} color={tintColor} />
  )
};

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStackNavigator,
    Play: PlayScreen,
    History: HistoryStackNavigator
  },
  {
    initialRouteName: SCREEN_HOME,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Theme.colors.tertiaryShadow,
      inactiveTintColor: Theme.colors.gray,
      style: {
        backgroundColor: Theme.colors.white
      }
    },
    tabBarComponent: TabBar,
    tabBarPosition: "bottom",

    defaultNavigationOptions: (): NavigationBottomTabScreenOptions => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          size={FOOTBAR_ICON_SIZE}
          color={tintColor}
        />
      )
    })
  }
);

export default createAppContainer(BottomTabNavigator);
