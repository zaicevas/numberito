import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Theme } from '../constants/index';
import {
  TabScene,
  NavigationRoute,
  NavigationInjectedProps,
} from 'react-navigation';
import { SCREEN_MIDDLE_BUTTON } from '../constants/Screens';
import NavigationButton from '../components/Play/NavigationButton';

const FOOTBAR_HEIGHT = 50;

const TabBar: React.FC<TabBarProps> = ({
  onTabPress,
  onTabLongPress,
  renderIcon,
  navigation,
  activeTintColor,
  inactiveTintColor,
  style,
  showLabel,
  getLabelText,
}) => {
  const { routes, index: activeRouteIndex } = navigation.state;
  return (
    <View style={[styles.container, style]}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
        const isMiddleButtonScreen = route.routeName === SCREEN_MIDDLE_BUTTON;
        if (isMiddleButtonScreen) {
          return (
            <View style={styles.tabButton} key={routeIndex}>
              <NavigationButton
                isFocused={isRouteActive}
                backgroundColor={
                  isRouteActive ? activeTintColor : Theme.colors.primary
                }
                navigation={navigation}
                navigate={() => onTabPress({ route })}
                refreshScreen={() => route.params.refreshScreen()}
              />
            </View>
          );
        }

        return (
          <TouchableOpacity
            activeOpacity={isMiddleButtonScreen ? 0.5 : 1}
            key={routeIndex}
            style={styles.tabButton}
            onPress={() => {
              onTabPress({ route });
            }}
            onLongPress={() => {
              onTabLongPress({ route });
            }}
          >
            {renderIcon({ tintColor, route, focused: isRouteActive })}

            {showLabel ? <Text>{getLabelText({ route })}</Text> : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  tabButton: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    borderTopWidth: 0.25,
    height: FOOTBAR_HEIGHT,
    borderColor: Theme.colors.gray,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface TabBarProps extends NavigationInjectedProps {
  onTabLongPress: ({ route }: { route: NavigationRoute }) => void;
  onTabPress: ({ route }: { route: NavigationRoute }) => void;
  renderIcon: ({
    route,
    focused,
    tintColor,
  }: {
    route: NavigationRoute;
    focused: boolean;
    tintColor?: string;
  }) => React.ReactNode;
  screenProps?: { [key: string]: any };
  showLabel: boolean;
  activeTintColor: string;
  inactiveTintColor: string;
  getAccessibilityLabel?: any;
  getAccessibilityRole?: any;
  getAccessibilityStates?: any;
  getButtonComponent?: any;
  getLabelText: ({ route }: { route: NavigationRoute }) => string;
  getTestID?: (scene: TabScene) => (scene: TabScene) => any;
  jumpTo?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
}

export default TabBar;
