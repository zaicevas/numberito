import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/index';
import * as Animatable from 'react-native-animatable';

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
        animation="pulse"
        iterationCount="infinite"
        duration={isFocused ? 1 : 750}
        useNativeDriver={true}
        style={{
          height: 70,
          width: 70,
          borderColor: 'lightgrey',
          borderRadius: 100,
          justifyContent: 'center',
          marginBottom: 50,
          backgroundColor,
        }}
      >
        <MaterialCommunityIcons
          size={48}
          style={{ alignSelf: 'center', paddingTop: '5%' }}
          active
          name="chili-mild"
          color={Theme.colors.white}
        />
      </Animatable.View>
    );
  }
}

export default NavigationButton;
