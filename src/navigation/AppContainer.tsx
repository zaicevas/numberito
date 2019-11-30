import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, NavigationBottomTabScreenOptions, NavigationInjectedProps } from 'react-navigation';
import { Theme } from '../constants/index';
import { FOOTBAR_ICON_SIZE, SCREENS_WITH_HIDDEN_TAB_BAR } from '../constants/Navigation';
import { SCREEN_HISTORY, SCREEN_HOME } from '../constants/Screens';
import FeedbackScreen from '../screens/FeedbackScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import TutorialScreen from '../screens/TutorialScreen';
import TabBar from './TabBar';

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Tutorial: {
      screen: TutorialScreen,
    },
  },
  {
    initialRouteName: SCREEN_HOME,
    defaultNavigationOptions: () => ({ header: null }),
  },
);

HomeStackNavigator.navigationOptions = ({
  navigation,
}: NavigationInjectedProps) => ({
  tabBarVisible: !SCREENS_WITH_HIDDEN_TAB_BAR.includes(navigation.state.routes[navigation.state.index].routeName),
});

const HistoryStackNavigator = createStackNavigator(
  {
    History: {
      screen: HistoryScreen,
      navigationOptions: () => ({
        title: SCREEN_HISTORY,
        headerStyle: {
          backgroundColor: Theme.colors.tertiaryShadow,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
  },
);

HistoryStackNavigator.navigationOptions = {
  tabBarIcon: ({ tintColor }: { tintColor: string }) => (
    <SimpleLineIcons name="book-open" size={24} color={tintColor} />
  ),
};

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStackNavigator,
    Play: PlayScreen,
    History: HistoryStackNavigator,
    Feedback: FeedbackScreen,
  },
  {
    initialRouteName: SCREEN_HOME,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Theme.colors.tertiaryShadow,
      inactiveTintColor: Theme.colors.gray,
      style: {
        backgroundColor: Theme.colors.white,
      },
    },
    tabBarComponent: TabBar,

    defaultNavigationOptions: (): NavigationBottomTabScreenOptions => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
          size={FOOTBAR_ICON_SIZE}
          color={tintColor}
        />
      ),
    }),
  },
);

export default createAppContainer(BottomTabNavigator);
