import React from 'react';
import { StyleSheet, ViewStyle, FlatList, ImageBackground } from 'react-native';
import { Theme, Layout } from '../../constants/index';
import { SingleGuess } from '../../types/index';
import Guess from '../Guess';

interface HistoryProps {
  guesses: SingleGuess[];
}

const bullBackground = require('../../../assets/bull-cow.png');

const History: React.FC<HistoryProps> = ({ guesses }) => {
  const flatList = React.useRef();
  return (
    <ImageBackground
      resizeMode="cover"
      source={bullBackground}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <FlatList
        ref={flatList}
        horizontal={true}
        scrollEnabled
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.container}
        data={guesses}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => <Guess guess={item} />}
        onContentSizeChange={() => flatList.current.scrollToEnd()}
      />
    </ImageBackground>
  );
};

interface Style {
  container: ViewStyle;
  guessStyle: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  guessStyle: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.sizes.radius,
    padding: Layout.height * 0.007,
    margin: Layout.width * 0.02,
  },
});

export default History;
