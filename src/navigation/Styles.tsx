import { StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../constants/index';
import { FOOTBAR_HEIGHT, MIDDLE_BUTTON_SIZE, SUB_BUTTON_SIZE } from '../constants/Navigation';

const TabBarStyles = StyleSheet.create<TabBarStyle>({
  iconsContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.25,
    height: FOOTBAR_HEIGHT,
    borderColor: Theme.colors.gray,
  },
  tabButton: {
    flex: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'flex-end',
    minHeight: 160,
  },
  fakeBackground: {
    position: 'absolute',
    width: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

const ChiliButtonStyles = StyleSheet.create<ChiliButtonStyle>({
  container: {
    height: MIDDLE_BUTTON_SIZE,
    width: MIDDLE_BUTTON_SIZE,
    borderColor: 'lightgrey',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: Theme.colors.primary,
  },
  icon: {
    alignSelf: 'center',
    paddingTop: '5%',
  },
});

const MiddleButtonStyles = StyleSheet.create<MiddleButtonStyle>({
  container: {
    flex: 1,
    alignItems: 'center',
    height: MIDDLE_BUTTON_SIZE,
    width: MIDDLE_BUTTON_SIZE,
    bottom: 15,
  },
});

const SubButtonStyles = StyleSheet.create<SubButtonStyle>({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: SUB_BUTTON_SIZE,
    height: SUB_BUTTON_SIZE,
    borderRadius: 100,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MoreButtonStyles = StyleSheet.create<MoreButtonStyle>({
  container: {
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: MIDDLE_BUTTON_SIZE,
    height: MIDDLE_BUTTON_SIZE,
    borderRadius: 100,
    borderColor: 'white',
  },
});

const Styles = StyleSheet.create<Style>({
  shadow: {
    shadowColor: Theme.colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 2,
  },
});

interface TabBarStyle {
  container: ViewStyle;
  iconsContainer: ViewStyle;
  tabButton: ViewStyle;
  fakeBackground: ViewStyle;
  content: ViewStyle;
}

interface ChiliButtonStyle {
  container: ViewStyle;
  icon: ViewStyle;
}

interface MiddleButtonStyle {
  container: ViewStyle;
}

interface SubButtonStyle {
  container: ViewStyle;
  wrapper: ViewStyle;
  content: ViewStyle;
}

interface MoreButtonStyle {
  container: ViewStyle;
}

interface Style {
  shadow: ViewStyle;
}

export { TabBarStyles, ChiliButtonStyles, MiddleButtonStyles, SubButtonStyles, MoreButtonStyles, Styles };
