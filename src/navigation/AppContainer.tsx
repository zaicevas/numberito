import React from 'react';
import { Platform, View } from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  NavigationInjectedProps,
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  NavigationScreenProps,
  NavigationBottomTabScreenOptions,
  NavigationRoute,
} from 'react-navigation';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { Theme } from '../constants/index';
import NavigationButton from '../components/Play/NavigationButton';

const FOOTBAR_HEIGHT = 50;
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
        tabBarOnPress: ({
          navigation,
          defaultHandler,
        }: {
          navigation: NavigationScreenProp<NavigationRoute>;
          defaultHandler: () => void;
        }) => {
          if (navigation.isFocused()) navigation.state.params.onFocus();
          else defaultHandler();
        },
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
      style: {
        height: FOOTBAR_HEIGHT,
      },
    },
    defaultNavigationOptions: () => ({
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
