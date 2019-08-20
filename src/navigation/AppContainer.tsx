import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Layout } from '../constants/index';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';

const FOOTBAR_HEIGHT = Layout.height * 0.07;
const FOOTBAR_ICON_HEIGHT = Layout.height * 0.05;

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      navigationOptions: () => ({ header: null }),
      screen: HomeScreen,
    },
    Play: {
      navigationOptions: () => ({ headerTintColor: 'black' }),
      screen: PlayScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStackNavigator,
    History: HistoryScreen,
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showLabel: false,
      style: {
        height: FOOTBAR_HEIGHT,
      },
    },
    defaultNavigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
          size={FOOTBAR_ICON_HEIGHT}
          color={tintColor}
        />
      ),
    }),
  },
);

export default createAppContainer(BottomTabNavigator);
