import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/index';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import AnimatedButton from './AnimatedButton';
import { NavigationInjectedProps } from 'react-navigation';
import { MIDDLE_BUTTON_SIZE } from '../../constants/Navigation';

interface NavigationButtonProps extends NavigationInjectedProps {
  isFocused: boolean;
  backgroundColor: string;
  navigate: () => void;
  refreshScreen: () => void;
  provideAnswer: () => void;
}

interface NavigationButtonState {
  animate: boolean;
}

class NavigationButton extends React.Component<
  NavigationButtonProps,
  NavigationButtonState
> {
  public state = {
    animate: false,
  };

  public render() {
    const {
      isFocused,
      backgroundColor,
      navigate,
      refreshScreen,
      provideAnswer,
    } = this.props;
    const { animate } = this.state;
    if (!isFocused) {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={this.handlePress}>
          <Animatable.View
            easing="ease-out"
            animation="tada"
            iterationCount="infinite"
            duration={1500}
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
    console.log(`animate: ${animate}`);
    return (
      <Animatable.View
        easing="ease-out"
        animation={animate ? 'tada' : ''}
        iterationCount="infinite"
        duration={1500}
        useNativeDriver={true}
        style={[
          {
            backgroundColor,
          },
          styles.container,
          styles.shadow,
        ]}
      >
        <AnimatedButton
          onRefresh={() => {
            this.stopAnimation();
            refreshScreen();
          }}
          onProvideAnswer={() => {
            this.startAnimation();
            provideAnswer();
          }}
        />
      </Animatable.View>
    );
  }

  private startAnimation = () => this.setState({ animate: true });
  private stopAnimation = () => this.setState({ animate: false });

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
    height: MIDDLE_BUTTON_SIZE,
    width: MIDDLE_BUTTON_SIZE,
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
