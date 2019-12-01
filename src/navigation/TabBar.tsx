import React from 'react';
import { SafeAreaView, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { NavigationInjectedProps, NavigationRoute, TabScene } from 'react-navigation';
import { HIDDEN_SCREENS_IN_TAB_BAR } from '../constants/Navigation';
import { InputState, SCREEN_MIDDLE_BUTTON } from '../constants/Screens';
import MiddleButton from './MiddleButton';
import { TabBarStyles } from './Styles';

const styles = TabBarStyles;

const TabBar: React.FC<TabBarProps> = ({
  onTabPress,
  onTabLongPress,
  renderIcon,
  navigation,
  activeTintColor,
  inactiveTintColor,
  showLabel,
  getLabelText,
  style,
}) => {
  const { routes, index: activeRouteIndex } = navigation.state;
  return (
    <SafeAreaView
      pointerEvents="box-none"
      style={styles.container}
      forceInset={{
        top: 'never',
        bottom: 'always',
      }}
    >
      <SafeAreaView
        style={[styles.fakeBackground, style]}
        forceInset={{
          top: 'never',
          bottom: 'always',
        }}
      >
        <View style={styles.iconsContainer} />
      </SafeAreaView>
      <View pointerEvents="box-none" style={styles.content}>
        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
          const isMiddleButtonScreen = route.routeName === SCREEN_MIDDLE_BUTTON;
          if (HIDDEN_SCREENS_IN_TAB_BAR.includes(route.routeName)) {
            return null;
          }
          if (isMiddleButtonScreen) {
            return (
              <MiddleButton
                key={routeIndex}
                isFocused={isRouteActive}
                navigation={navigation}
                activeTintColor={activeTintColor}
                refreshScreen={() =>
                  route.params && route.params.refreshScreen()
                }
                provideAnswer={() =>
                  route.params && route.params.provideAnswer()
                }
                getInputState={() =>
                  route.params && route.params.getInputState
                    ? route.params.getInputState()
                    : InputState.VALID
                }
                toggleNotes={() => route.params && route.params.toggleNotes()}
              />
            );
          }

          return (
            <TouchableOpacity
              activeOpacity={0.7}
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
              {showLabel && <Text>{getLabelText({ route })}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

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
