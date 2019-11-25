import { StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../constants/index';
import { MIDDLE_BUTTON_SIZE } from '../constants/Navigation';

interface ChiliButtonStyle {
  container: ViewStyle;
  icon: ViewStyle;
}

interface Style {
  shadow: ViewStyle;
}

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

const Styles = StyleSheet.create<Style>({
  shadow: {
    shadowColor: Theme.colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});

export { ChiliButtonStyles, Styles };

