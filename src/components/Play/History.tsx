import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../constants/index';

export default () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity key={1} style={getGuessStyles(Theme.colors.white)}>
        <Text style={styles.text}>0164 0B 1C</Text>
      </TouchableOpacity>
      <TouchableOpacity key={2} style={getGuessStyles(Theme.colors.white)}>
        <Text style={styles.text}>0164 0B 1C</Text>
      </TouchableOpacity>
      <TouchableOpacity key={3} style={getGuessStyles(Theme.colors.white)}>
        <Text style={styles.text}>0164 0B 1C</Text>
      </TouchableOpacity>
      <TouchableOpacity key={4} style={getGuessStyles(Theme.colors.white)}>
        <Text style={styles.text}>0164 0B 1C</Text>
      </TouchableOpacity>
      <TouchableOpacity key={5} style={getGuessStyles(Theme.colors.white)}>
        <Text style={styles.text}>0164 0B 1C</Text>
      </TouchableOpacity>
    </View>
  );
};

const getGuessStyles = (backgroundColor: string): ViewStyle => {
  return {
    backgroundColor,
    borderRadius: 4,
    padding: '2%',
    margin: '2%',
  };
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '1%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
