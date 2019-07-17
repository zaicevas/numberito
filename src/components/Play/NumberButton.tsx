import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  operator: Number;
  handleButtonPress: Function;
}

const NumberButton: React.SFC<ButtonProps> = props => {
  const { operator, handleButtonPress } = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.item}>{operator}</Text>
    </TouchableOpacity>
  );
};

interface Style {
  container: ViewStyle;
  item: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 1,
  },

  item: {
    color: '#fff',
    fontSize: 26,
  },
});

export default NumberButton;
