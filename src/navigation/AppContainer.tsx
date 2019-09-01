import React from 'react';
import { Platform, View } from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  NavigationInjectedProps,
  NavigationScreenProp,
  NavigationRoute,
  TabBarBottom,
  NavigationBottomTabScreenOptions,
} from 'react-navigation';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { Theme } from '../constants/index';
import NavigationButton from '../components/Play/NavigationButton';
import { MultiBar } from './Multibar';
import TabBar from './TabBar';

const FOOTBAR_ICON_SIZE = 30;

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      navigationOptions: () => ({ header: null }),
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStackNavigator,
    Play: {
      screen: PlayScreen,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        tabBarIcon: ({
          focused,
          tintColor,
        }: {
          focused: boolean;
          tintColor: string;
        }) => (
          <NavigationButton
            isFocused={focused}
            backgroundColor={focused ? tintColor : Theme.colors.primary}
            navigation={navigation}
          />
        ),
      }),
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
    initialRouteName: 'Home',
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
