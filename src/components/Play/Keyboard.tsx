import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout, Theme } from '../../constants/index';

const ButtonSize = Layout.width * 0.2;
const WIDTH = (13 * 2 + ButtonSize) * 3;

enum KeyType {
  Number,
  Check,
  Delete,
}

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

export default class Keyboard extends React.Component {
  public static defaultProps = {
    TextColor: '#4a4b4d',
    PinColor: 'rgba(0,0,0,0.1)',
    Size: 4,
    Random: false,
    FontSize: 30,
    ImageSize: { height: 15, width: 20 },
  };

  public getKeyboard = () => {
    return [
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
  }

  public renderTouchable = (key: [KeyType, string], index: number) => {
    const keyType = key[0];
    const text = key[1];
    if (keyType !== KeyType.Number) {
      return (
        <TouchableOpacity key={index}>
          <View style={[styles.touchStyle]}>
            {getIcon(key[0])}
            <Text style={[styles.buttonText]}>{text}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity key={index}>
        <View style={[styles.touchStyle, styles.numberCircle]}>
          <Text style={[styles.numberText]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  public render() {
    return (
      <View style={[styles.keyboardStyle]}>
        <View style={[styles.container, { width: WIDTH }]}>
          {this.getKeyboard().map((key, index) =>
            this.renderTouchable(key, index),
          )}
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
    marginHorizontal: Layout.width * 0.04,
    marginVertical: 8,
    height: ButtonSize,
    width: ButtonSize,
  },
  keyboardStyle: {
    paddingTop: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '200',
    marginTop: 5,
    color: 'black',
    opacity: 0.7,
  },
  numberCircle: {
    borderRadius: ButtonSize / 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  numberText: {
    color: '#4a4b4d',
    fontSize: 30,
  },
});
