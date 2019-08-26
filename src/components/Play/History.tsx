import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  FlatList,
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

const renderGuess = (guess: SingleGuess) => {
  return (
    <TouchableOpacity style={getGuessStyles(Theme.colors.white)}>
      <Text style={styles.text}>
        {guess.input} {guess.bulls}B {guess.cows}C
      </Text>
    </TouchableOpacity>
  );
};

const History: React.FC<HistoryProps> = ({ guesses }) => {
  return (
    // <ScrollView
    //   pagingEnabled
    //   horizontal={true}
    //   decelerationRate={0}
    //   snapToAlignment={'center'}
    //   contentInset={{
    //     top: 0,
    //     left: 30,
    //     bottom: 0,
    //     right: 30,
    //   }}
    //   contentContainerStyle={styles.container}
    // >
    //   {renderGuesses(guesses)}
    // </ScrollView>
    <FlatList
      horizontal={true}
      scrollEnabled
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={styles.container}
      data={guesses}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item }) => renderGuess(item)}
    />
  );
};

const getGuessStyles = (backgroundColor: string): ViewStyle => {
  return {
    backgroundColor,
    borderRadius: Theme.sizes.radius,
    padding: '2%',
    margin: 10,
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: '5%',
  },
  text: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
  },
});

export default History;
