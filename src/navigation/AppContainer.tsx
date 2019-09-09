import React from 'react';
import { Platform, View } from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  NavigationBottomTabScreenOptions,
} from 'react-navigation';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { Theme } from '../constants/index';
import TabBar from './TabBar';
import { SCREEN_HOME } from '../constants/Screens';

const FOOTBAR_ICON_SIZE = 30;

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      navigationOptions: () => ({ header: null }),
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: SCREEN_HOME,
  },
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStackNavigator,
    Play: {
      screen: PlayScreen,
    },
    History: {
      screen: HistoryScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }: { tintColor: string }) => (
          <SimpleLineIcons name="book-open" size={24} color={tintColor} />
        ),
      }),
    },
  },
  {
    initialRouteName: SCREEN_HOME,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Theme.colors.tertiaryShadow,
      inactiveTintColor: Theme.colors.gray,
    },
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom',

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
