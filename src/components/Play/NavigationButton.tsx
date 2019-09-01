import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/index';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import AddButton from './AddButton';
import { NavigationInjectedProps } from 'react-navigation';

interface NavigationButtonProps extends NavigationInjectedProps {
  isFocused: boolean;
  backgroundColor: string;
  navigate: () => void;
  refreshScreen: () => void;
}

class NavigationButton extends React.Component<NavigationButtonProps, any> {
  public render() {
    const { isFocused, backgroundColor, navigate } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.handlePress}
        onLongPress={() => {
          navigate();
        }}
      >
        <Animatable.View
          easing="ease-out"
          animation="tada"
          iterationCount="infinite"
          duration={isFocused ? 1 : 1500}
          useNativeDriver={true}
          style={[
            {
              backgroundColor,
            },
            styles.container,
            styles.shadow,
          ]}
        >
          {getIcon(isFocused)}
        </Animatable.View>
      </TouchableOpacity>
    );
  }

  private handlePress = () => {
    const { navigate, isFocused, refreshScreen } = this.props;
    if (isFocused) {
      refreshScreen();
    } else navigate();
  }
}

const getIcon = (isFocused?: boolean) => (
  <MaterialCommunityIcons
    size={isFocused ? 36 : 48}
    style={styles.icon}
    active
    name={isFocused ? 'restart' : 'chili-mild'}
    color={Theme.colors.white}
  />
);

interface Style {
  container: ViewStyle;
  icon: ViewStyle;
  shadow: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    height: 70,
    width: 70,
    borderColor: 'lightgrey',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  icon: {
    alignSelf: 'center',
    paddingTop: '5%',
  },
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

export default NavigationButton;
