import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/index';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, ViewStyle } from 'react-native';

interface NavigationButtonProps {
  isFocused?: boolean;
  backgroundColor: string;
}

class NavigationButton extends React.Component<NavigationButtonProps, {}> {
  public render() {
    const { backgroundColor, isFocused } = this.props;
    return (
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
        ]}
      >
        <MaterialCommunityIcons
          size={48}
          style={styles.icon}
          active
          name="chili-mild"
          color={Theme.colors.white}
        />
      </Animatable.View>
    );
  }
}

interface Style {
  container: ViewStyle;
  icon: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    height: 70,
    width: 70,
    borderColor: 'lightgrey',
    borderRadius: 100,
    justifyContent: 'center',
    marginBottom: 50,
  },
  icon: { alignSelf: 'center', paddingTop: '5%' },
});

export default NavigationButton;
