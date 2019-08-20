import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../constants/index';

export default () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity key={1} style={getGuessStyles(Theme.colors.white)}>
        <Text style={styles.text}>0164 0B 1C</Text>
      </TouchableOpacity>
    </View>
  );
};

const getGuessStyles = (backgroundColor: string) => {
  return {
    backgroundColor,
    borderRadius: 4,
    padding: '5%',
  };
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
