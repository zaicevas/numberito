import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Theme } from '../constants/index';
import { MIDDLE_BUTTON_SIZE } from '../constants/Navigation';
import { SCREEN_PLAY } from '../constants/Screens';

const ANIMATION_LENGTH = 1500;

const ChiliButton: React.FC = ({ navigation, untoggle }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate(SCREEN_PLAY, {
          onKeyboardPress: () => untoggle(),
        })
      }
    >
      <Animatable.View
        easing="ease-out"
        animation="tada"
        iterationCount="infinite"
        duration={ANIMATION_LENGTH}
        useNativeDriver={true}
        style={[
          { backgroundColor: Theme.colors.primary },
          styles.container,
          styles.shadow,
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
    </TouchableOpacity>
  );
};

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

export default ChiliButton;
