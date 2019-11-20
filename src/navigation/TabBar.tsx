import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  SafeAreaView
} from "react-native";
import { Theme } from "../constants/index";
import {
  TabScene,
  NavigationRoute,
  NavigationInjectedProps
} from "react-navigation";
import { SCREEN_MIDDLE_BUTTON, InputState } from "../constants/Screens";
import NavigationButton from "../components/Play/NavigationButton";
import MiddleButton from "./MiddleButton";
import { MultiBarToggle } from "react-native-multibar";
import { Entypo } from "@expo/vector-icons";

const FOOTBAR_HEIGHT = 50;

const TabBar: React.FC<TabBarProps> = ({
  onTabPress,
  onTabLongPress,
  renderIcon,
  navigation,
  activeTintColor,
  inactiveTintColor,
  showLabel,
  getLabelText,
  style
}) => {
  const { routes, index: activeRouteIndex } = navigation.state;
  return (
    <SafeAreaView
      pointerEvents="box-none"
      style={styles.container}
      forceInset={{
        top: "never",
        bottom: "always"
      }}
    >
      <SafeAreaView
        style={[styles.fakeBackground, style]}
        forceInset={{
          top: "never",
          bottom: "always"
        }}
      >
        <View style={styles.iconsContainer} />
      </SafeAreaView>
      <View pointerEvents="box-none" style={styles.content}>
        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
          const isMiddleButtonScreen = route.routeName === SCREEN_MIDDLE_BUTTON;
          if (isMiddleButtonScreen) {
            return (
              <MultiBarToggle
                navigation={navigation}
                actionSize={30}
                routes={[
                  {
                    routeName: "History",
                    color: "red",
                    icon: (
                      <Entypo
                        name="open-book"
                        size={16}
                        color={Theme.colors.white}
                      />
                    )
                  }
                ]}
                icon={
                  <Entypo
                    name="open-book"
                    size={16}
                    color={Theme.colors.white}
                  />
                }
              />
            );
            return (
              <View style={styles.tabButton} key={routeIndex}>
                <NavigationButton
                  isFocused={isRouteActive}
                  backgroundColor={
                    isRouteActive ? activeTintColor : Theme.colors.primary
                  }
                  navigation={navigation}
                  navigate={() => onTabPress({ route })}
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
    </SafeAreaView>
  );
};

interface Styles {
  iconsContainer: ViewStyle;
  tabButton: ViewStyle;
  container: ViewStyle;
  fakeBackground: ViewStyle;
  content: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  iconsContainer: {
    flexDirection: "row",
    borderTopWidth: 0.25,
    height: FOOTBAR_HEIGHT,
    borderColor: Theme.colors.gray
  },
  tabButton: {
    flex: 1,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "flex-end",
    minHeight: 160
  },
  fakeBackground: {
    position: "absolute",
    width: "100%"
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end"
  }
});

interface TabBarProps extends NavigationInjectedProps {
  onTabLongPress: ({ route }: { route: NavigationRoute }) => void;
  onTabPress: ({ route }: { route: NavigationRoute }) => void;
  renderIcon: ({
    route,
    focused,
    tintColor
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
