import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout, Theme } from '../../constants/index';
import { InputState } from '../../constants/Screens';
import { KeyType } from '../../types/index';

const ButtonSize = Layout.width * 0.2;
const WIDTH = (13 * 2 + ButtonSize) * 3;

interface KeyboardProps {
  onPress: (inputKey: [KeyType, string]) => void;
  disabledKeys: string;
  inputState: InputState;
}

const Keyboard: React.FC<KeyboardProps> = ({
  onPress,
  disabledKeys,
  inputState,
}) => (
    <View style={[styles.keyboardStyle]}>
      <View style={[styles.container, { width: WIDTH }]}>
        {KEYS.map((key, index) => (
          <Touchable
            inputKey={key}
            key={index}
            onPress={onPress}
            numberDisabled={
              disabledKeys.includes(key[1]) ||
              inputState === InputState.PROVIDED_ANSWER ||
              inputState === InputState.CORRECT_ANSWER
            }
            inputState={inputState}
          />
        ))}
      </View>
    </View>
  );

const getIcon = (keyType: KeyType, isDisabled: boolean) => {
  const props = {
    size: ButtonSize * 0.45,
    style: { opacity: 0.9 },
  };
  if (keyType === KeyType.Check) {
    return (
      <AntDesign
        name="checkcircle"
        {...props}
        color={isDisabled ? Theme.colors.gray2 : Theme.colors.secondary}
      />
    );
  }
  return (
    <MaterialIcons
      name="backspace"
      {...props}
      color={isDisabled ? Theme.colors.gray2 : Theme.colors.primary}
    />
  );
};

interface TouchableProps {
  inputKey: [KeyType, string];
  onPress: (inputKey: [KeyType, string]) => void;
  numberDisabled: boolean;
  inputState: InputState;
}

const Touchable: React.FC<TouchableProps> = ({
  inputKey,
  onPress,
  numberDisabled,
  inputState,
}) => {
  const keyType = inputKey[0];
  const text = inputKey[1];
  const nonNumberDisabled =
    inputState === InputState.PROVIDED_ANSWER ||
    inputState === InputState.CORRECT_ANSWER;
  // TODO: move into separate component so you don't pass nonNumberDisabled twice
  if (keyType !== KeyType.Number) {
    return (
      <TouchableOpacity
        onPress={() => onPress(inputKey)}
        disabled={nonNumberDisabled}
      >
        <View style={[styles.touchStyle, styles.iconCircle]}>
          {getIcon(keyType, nonNumberDisabled)}
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => onPress(inputKey)}
      disabled={numberDisabled}
    >
      <View style={[styles.touchStyle, styles.numberCircle]}>
        <Text
          style={{
            color: numberDisabled ? Theme.colors.gray2 : Theme.colors.black,
            fontSize: 30,
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const KEYS: Array<[KeyType, string]> = [
  // why does type have to be explicit?
  [KeyType.Number, '1'],
  [KeyType.Number, '2'],
  [KeyType.Number, '3'],
  [KeyType.Number, '4'],
  [KeyType.Number, '5'],
  [KeyType.Number, '6'],
  [KeyType.Number, '7'],
  [KeyType.Number, '8'],
  [KeyType.Number, '9'],
  [KeyType.Check, 'check'],
  [KeyType.Number, '0'],
  [KeyType.Delete, 'delete'],
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  touchStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 13,
    marginVertical: 8,
    height: ButtonSize,
    width: ButtonSize,
  },
  keyboardStyle: {
    alignItems: 'center',
    marginBottom: '0%',
  },
  buttonText: {
    fontWeight: '200',
    marginTop: 5,
    color: 'black',
    opacity: 0.5,
  },
  numberCircle: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  numberText: {
    color: Theme.colors.black,
    fontSize: 30,
  },
  iconCircle: {
    paddingTop: '45%',
  },
});

export default Keyboard;
