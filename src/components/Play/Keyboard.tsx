import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout, Theme } from '../../constants/index';
import { KeyType } from '../../types/index';

const ButtonSize = Layout.width * 0.2;
const WIDTH = (13 * 2 + ButtonSize) * 3;

const getIcon = (keyType: KeyType) => {
  const props = {
    size: ButtonSize * 0.45,
    style: { opacity: 0.9 },
  };
  if (keyType === KeyType.Check) {
    return (
      <AntDesign name="checkcircle" {...props} color={Theme.colors.secondary} />
    );
  }
  return (
    <MaterialIcons name="backspace" {...props} color={Theme.colors.primary} />
  );
};

const keys: Array<[KeyType, string]> = [
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

interface TouchableProps {
  inputKey: [KeyType, string];
  onPress: (inputKey: [KeyType, string]) => void;
  disabled: boolean;
}

const Touchable: React.FC<TouchableProps> = ({
  inputKey,
  onPress,
  disabled,
}) => {
  const keyType = inputKey[0];
  const text = inputKey[1];
  if (keyType !== KeyType.Number) {
    return (
      <TouchableOpacity onPress={() => onPress(inputKey)}>
        <View style={[styles.touchStyle, styles.iconCircle]}>
          {getIcon(keyType)}
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={() => onPress(inputKey)}>
      <View style={[styles.touchStyle, styles.numberCircle]}>
        <Text
          style={{
            color: disabled ? Theme.colors.gray2 : Theme.colors.black,
            fontSize: 30,
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface KeyboardProps {
  onPress: (inputKey: [KeyType, string]) => void;
  disabledKeys: string;
}

export default class Keyboard extends React.Component<KeyboardProps, {}> {
  public render() {
    const { onPress, disabledKeys } = this.props;
    return (
      <View style={[styles.keyboardStyle]}>
        <View style={[styles.container, { width: WIDTH }]}>
          {keys.map((key, index) => (
            <Touchable
              inputKey={key}
              key={index}
              onPress={onPress}
              disabled={disabledKeys.includes(key[1])}
            />
          ))}
        </View>
      </View>
    );
  }
}

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
