// https://github.com/xamous/react-native-smooth-pincode-input
import React from 'react';
import { I18nManager, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Theme, Layout } from '../../constants/index';
import { InputState } from '../../constants/Screens';

const styles = StyleSheet.create({
  containerDefault: {},
  cellDefault: {
    borderBottomWidth: 2.5,
    width: Layout.width * 0.18,
    borderColor: Theme.colors.gray,
  },
  cellFocusedDefault: {
    borderColor: Theme.colors.black,
  },
  cellInvalidDefault: {
    borderBottomWidth: 2.5,
    width: Layout.width * 0.18,
    borderColor: Theme.colors.red,
    opacity: 0.5,
  },
  cellInvalidFocused: {
    borderColor: Theme.colors.red,
    opacity: 1,
  },
  textStyleDefault: {
    color: Theme.colors.black,
    fontSize: 32,
  },
  textStyleFocusedDefault: {
    color: Theme.colors.black,
  },
  textStyleCorrectAnswer: {
    color: Theme.colors.green,
  },
});

class Input extends React.Component {
  public static defaultProps = {
    value: '',
    codeLength: 4,
    cellSize: 48,
    cellSpacing: 4,
    placeholder: '',
    password: false,
    mask: '*',
    maskDelay: 200,
    keyboardType: 'numeric',
    autoFocus: false,
    restrictToNumbers: true,
    containerStyle: styles.containerDefault,
    cellStyle: styles.cellDefault,
    cellStyleFocused: styles.cellFocusedDefault,
    textStyle: styles.textStyleDefault,
    textStyleFocused: styles.textStyleFocusedDefault,
    animationFocused: 'pulse',
    editable: true,
    inputProps: {},
  };
  public state = {
    maskDelay: false,
    focused: true,
  };
  public ref = React.createRef();
  public inputRef = React.createRef();

  public shake = () => {
    return this.ref.current.shake(650);
  }

  public focus = () => {
    return this.inputRef.current.focus();
  }

  public blur = () => {
    return this.inputRef.current.blur();
  }

  public _inputCode = code => {
    const { password, codeLength = 4, onTextChange, onFulfill } = this.props;

    if (this.props.restrictToNumbers) {
      code = (code.match(/[0-9]/g) || []).join('');
    }

    if (onTextChange) {
      onTextChange(code);
    }
    if (code.length === codeLength && onFulfill) {
      onFulfill(code);
    }

    // handle password mask
    const maskDelay = password && code.length > this.props.value.length;
    this.setState({ maskDelay });

    if (maskDelay) {
      // mask password after delay
      const maskTimeout = setTimeout(() => {
        this.setState({ maskDelay: false });
        clearTimeout(maskTimeout);
      },                             this.props.maskDelay);
    }
  }

  public _keyPress = event => {
    if (event.nativeEvent.key === 'Backspace') {
      const { value, onBackspace } = this.props;
      if (value === '' && onBackspace) {
        onBackspace();
      }
    }
  }

  public _onFocused = focused => {
    this.setState({ focused });
  }

  public render() {
    const {
      value,
      codeLength,
      cellSize,
      cellSpacing,
      placeholder,
      password,
      mask,
      containerStyle,
      cellStyle,
      cellStyleFocused,
      cellStyleFilled,
      textStyle,
      textStyleFocused,
      animationFocused,
      inputState,
    } = this.props;
    const { maskDelay, focused } = this.state;
    const isValidInput = inputState !== InputState.INVALID;
    const isCorrectAnswer = inputState === InputState.CORRECT_ANSWER;

    return (
      <Animatable.View
        ref={this.ref}
        style={[
          {
            alignItems: 'stretch',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'relative',
            width: cellSize * codeLength + cellSpacing * (codeLength - 1),
            height: cellSize,
          },
          containerStyle,
        ]}
      >
        <View
          style={{
            position: 'absolute',
            margin: 0,
            height: '100%',
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
          }}
        >
          {Array.apply(null, Array(codeLength)).map((_, idx) => {
            const cellFocused = focused && idx === value.length;
            const filled = idx < value.length;
            const last = idx === value.length - 1;
            const showMask = filled && password && (!maskDelay || !last);
            const isPlaceholderText = typeof placeholder === 'string';
            const isMaskText = typeof mask === 'string';
            const pinCodeChar = value.charAt(idx);

            let cellText = null;
            if (filled || placeholder !== null) {
              if (showMask && isMaskText) {
                cellText = mask;
              } else if (!filled && isPlaceholderText) {
                cellText = placeholder;
              } else if (pinCodeChar) {
                cellText = pinCodeChar;
              }
            }

            const placeholderComponent = !isPlaceholderText
              ? placeholder
              : null;
            const maskComponent = showMask && !isMaskText ? mask : null;
            const isCellText = typeof cellText === 'string';

            return (
              <Animatable.View
                key={idx}
                style={[
                  {
                    width: cellSize,
                    height: cellSize,
                    marginLeft: cellSpacing / 2,
                    marginRight: cellSpacing / 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  cellStyle,
                  cellFocused && isValidInput ? cellStyleFocused : {},
                  filled ? cellStyleFilled : {},
                  !isValidInput && !cellFocused
                    ? styles.cellInvalidDefault
                    : {},
                  cellFocused && !isValidInput ? styles.cellInvalidFocused : {},
                ]}
                animation={
                  idx === value.length && focused ? animationFocused : null
                }
                iterationCount="infinite"
                duration={500}
                useNativeDriver={true}
              >
                {isCellText && !maskComponent && (
                  <Text
                    style={[
                      textStyle,
                      cellFocused ? textStyleFocused : {},
                      isCorrectAnswer ? styles.textStyleCorrectAnswer : {},
                    ]}
                  >
                    {cellText}
                  </Text>
                )}

                {!isCellText && !maskComponent && placeholderComponent}
                {isCellText && maskComponent}
              </Animatable.View>
            );
          })}
        </View>
      </Animatable.View>
    );
  }
}

export default Input;
