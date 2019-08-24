import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../constants/index';
import { SingleGuess } from '../../types/index';

interface HistoryProps {
  guesses?: SingleGuess[];
}

const renderGuesses = (guesses?: SingleGuess[]) => {
  return (
    guesses &&
    guesses.map((guess, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={getGuessStyles(Theme.colors.white)}
        >
          <Text style={styles.text}>
            {guess.input} {guess.bulls}B {guess.cows}C
          </Text>
        </TouchableOpacity>
      );
    })
  );
};

const History: React.FC<HistoryProps> = ({ guesses }) => {
  return <View style={styles.container}>{renderGuesses(guesses)}</View>;
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

export default History;
