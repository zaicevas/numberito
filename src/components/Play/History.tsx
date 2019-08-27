import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  FlatList,
  View,
  Image,
} from 'react-native';
import { Theme } from '../../constants/index';
import { SingleGuess } from '../../types/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

const img = require('../../../assets/bull.svg');

const renderGuess = (guess: SingleGuess) => {
  return (
    <TouchableOpacity style={getGuessStyles(Theme.colors.white)}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={styles.text}>{guess.input}</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text>{guess.bulls}</Text>
          <Image
            source={img}
            style={{ width: 30, height: 30, borderWidth: 5 }}
          />
          <Text>{guess.cows}</Text>
          <MaterialCommunityIcons
            name="cow"
            color={Theme.colors.secondaryShadow}
            size={18}
          />
        </View>
      </View>
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
      keyExtractor={(_, index) => `${index}`}
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
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default History;
