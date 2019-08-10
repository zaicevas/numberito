import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout, Theme } from '../../constants/index';

const ButtonSize = Layout.width * 0.2;
const WIDTH = (13 * 2 + ButtonSize) * 3;

export default class RoundKeyboard extends React.Component {
  public static defaultProps = {
    ForgetText: 'forget',
    ForgetMethod: () => console.log('forget'),
    TextColor: '#4a4b4d',
    BorderColor: 'rgba(0,0,0,0.1)',
    PinColor: 'rgba(0,0,0,0.1)',
    BorderRadius: ButtonSize / 2,
    Size: 4,
    Random: false,
    FontSize: 30,
    ImageSize: { height: 15, width: 20 },
  };

  public getKeyboard = () => {
    const keyboard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const tmp = keyboard[9];
    keyboard[9] = this.props.ForgetText;
    keyboard.push(tmp, 'delete');
    return keyboard;
  }

  public renderTouchable = (Keyboard, props, index) => {
    if (Keyboard == props.ForgetText) {
      return (
        <TouchableOpacity key={index}>
          <View
            style={[
              styles.TouchStyle,
              {
                height: ButtonSize,
                width: ButtonSize,
                backgroundColor: props.KeyboardColor,
              },
            ]}
          >
            <AntDesign
              name="checkcircle"
              size={ButtonSize * 0.45}
              color={Theme.colors.secondary}
              style={{ opacity: 0.9 }}
            />
            <Text
              style={[
                styles.textDeleteButton,
                { color: 'black', opacity: 0.7 },
              ]}
            >
              {'check'}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (Keyboard == 'delete') {
      return (
        <TouchableOpacity key={index}>
          <View
            style={[
              styles.TouchStyle,
              {
                height: ButtonSize,
                width: ButtonSize,
                backgroundColor: props.KeyboardColor,
              },
            ]}
          >
            <MaterialIcons
              name="backspace"
              size={ButtonSize * 0.45}
              color={Theme.colors.primary}
              style={{ opacity: 0.9 }}
            />
            <Text
              style={[
                styles.textDeleteButton,
                { color: 'black', opacity: 0.7 },
              ]}
            >
              {'delete'}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity key={index}>
        <View
          style={[
            styles.TouchStyle,
            {
              height: ButtonSize,
              width: ButtonSize,
              borderRadius: props.BorderRadius,
              borderWidth: 1,
              borderColor: props.BorderColor,
              backgroundColor: props.KeyboardColor,
            },
          ]}
        >
          <Text style={[{ color: props.TextColor, fontSize: props.FontSize }]}>
            {Keyboard}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  public render() {
    return (
      <View style={[styles.KeyboardStyle]}>
        <View style={[styles.container, { width: WIDTH }]}>
          {this.getKeyboard().map((keyboard, index) =>
            this.renderTouchable(keyboard, this.props, index),
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
  TouchStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 13,
    marginVertical: 8,
  },
  KeyboardStyle: {
    paddingTop: 50,
    alignItems: 'center',
  },
  CodeStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 20,
  },
  CercleStyle: {
    height: 17,
    width: 17,
    borderRadius: 17 / 2,
  },
  CercleColor: {
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
    height: 17,
  },
  textDeleteButton: {
    fontWeight: '200',
    marginTop: 5,
  },
});
