import React, { useRef } from 'react';
import { View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { MIDDLE_BUTTON_SIZE } from '../constants/Navigation';
import { InputState } from '../constants/Screens';
import ChiliButton from './ChiliButton';
import MoreButton from './MoreButton';

interface NavigationButtonProps extends NavigationInjectedProps {
  isFocused: boolean;
  backgroundColor: string;
  navigate: () => void;
  refreshScreen: () => void;
  provideAnswer: () => void;
  getInputState: () => InputState;
  toggleNotes: () => void;
}

const MiddleButton: React.FC = ({
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
      style={{
        flex: 1,
        alignItems: 'center',
        height: MIDDLE_BUTTON_SIZE,
        width: MIDDLE_BUTTON_SIZE,
        bottom: 15,
      }}
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
            untoggle={() => moreButtonRef.current.untoggleSubButtonsIfToggled()}
          />
        )}
    </View>
  );
};

export default MiddleButton;
