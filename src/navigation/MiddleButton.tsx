import React, { useRef } from 'react';
import { View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { InputState } from '../constants/Screens';
import ChiliButton from './ChiliButton';
import MoreButton from './MoreButton';
import { MiddleButtonStyles } from './Styles';

const styles = MiddleButtonStyles;

const MiddleButton: React.FC<MiddleButtonProps> = ({
  navigation,
  isFocused,
  activeTintColor,
  refreshScreen,
  provideAnswer,
  getInputState,
  toggleNotes,
}) => {
  const moreButtonRef = useRef();
  return (
    <View
      pointerEvents="box-none"
      style={styles.container}
    >
      {isFocused ? (
        <MoreButton
          ref={moreButtonRef}
          backgroundColor={activeTintColor}
          getInputState={getInputState}
          toggleNotes={toggleNotes}
          refreshScreen={refreshScreen}
          provideAnswer={provideAnswer}
        />
      ) : (
          <ChiliButton
            navigation={navigation}
            untoggle={() => moreButtonRef &&
              moreButtonRef.current &&
              moreButtonRef.current.untoggleSubButtonsIfToggled()}
          />
        )}
    </View>
  );
};

interface MiddleButtonProps extends NavigationInjectedProps {
  isFocused: boolean;
  activeTintColor: string;
  refreshScreen: () => void;
  provideAnswer: () => void;
  getInputState: () => InputState;
  toggleNotes: () => void;
}

export default MiddleButton;
