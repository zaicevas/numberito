import React from 'react';
import { Text, View, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Theme, Layout } from './index';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Slide } from '../types/index';
import Guess from '../components/Guess';
import SvgBull from '../components/SvgBull';

const ICON_SIZE = 128;

interface Styles {
  bullsText: TextStyle;
  cowsText: TextStyle;
  boldText: TextStyle;
  guess: ViewStyle;
  text: TextStyle;
  explanationText: TextStyle;
  headerText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  bullsText: {
    color: Theme.colors.green,
    fontWeight: 'bold'
  },
  cowsText: {
    color: Theme.colors.primary,
    fontWeight: 'bold'
  },
  boldText: {
    fontWeight: 'bold'
  },
  guess: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.sizes.radius,
    padding: Layout.height * 0.007,
    margin: Layout.width * 0.02
  },
  text: {
    color: Theme.colors.white,
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center'
  },
  explanationText: {
    color: Theme.colors.white,
    fontSize: 12
  },
  headerText: {
    color: Theme.colors.white,
    fontSize: 32,
    textAlign: 'center'
  }
});

const SvgBigBull = () => (
  <Svg width={200} height={200} viewBox='0 0 744.094 1052.362'>
    <Path
      d='M36.162 731.753c-6.977-16.594 21.717-28.717 32.858-42.857 7.962-10.106 17.258-19.222 24.285-30 10.236-15.7 16.777-33.527 25.714-50 9.556-27.39 11.968-49.36 34.286-60-14.102-29.254 2.566-61.056 5.714-91.429-7.025-31.694-6.025-60.258 12.858-88.571-4.457-13.422-35.412-16.935-30-30 3.644-8.799 22.65 7.459 28.571 0-49.236-29.383-57.86-92.174-24.286-104.286-16.815 56.32 12.947 60.833 37.143 74.286 8.285-1.737 17.033-22.903 77.143-7.143 18.083 1.647 25.227-13.846 58.572 10 22.828-13.857 58.456 14.647 52.857-74.286 53.477 89.844-31.491 64.635-20 95.715 2.221 6.008 15.189 6.514 14.285 12.857-2.163 15.181-35.86 5.712-41.428 20-11.72 30.072-2.903 66.132 35.714 90 35.897 8.326 49.326 32.976 80 55.714 42.6-.659 85.383 23.525 108.571 32.857 146.07-84.846-56.565-37.376-48.571-94.286 4.155-26.615 41.026-35.558 57.143-57.142 11.346-15.196-25.136-44.046 27.143-50-13.151 26.797 24.149 22.586 14.244 70.101-48.884 24.533-83.433 18.078-71.805 48.817 42.652 7.868 158.073 8.984 42.337 94.01 12.517 17.957 38.863 19.14 53.795 54.214 12.183 14.781 22.525 31.014 32.857 47.143 12.69 7.245 29.988 12.36 38.572 65.715 9.218 16.093 35.63 32.08 27.143 48.571-3.947 7.668-15.481 3.56-25.715 2.857-9.561-6.296-4.44-22.85-10-32.857-21.517-7.214-17.476-25.697-30-34.286-50.025-14.91-48.192-30.902-74.285-27.143.805 59.085-22.501 30.986-32.857 24.286-15.468 27.435-32.732 7.757-38.572-5.714-9.05-.428-18.78-2.06-27.143 1.428-6.533 2.726-15.006 7.242-15.714 14.286-1.77 17.627 36.182 25.791 31.429 42.857-4.983 17.89-33.068 18.641-51.429 21.429-15.131 2.297-11.857 4.54-45.714-4.286-3.526-14.778 39.987-9.158 38.571-24.286-1.574-16.816-33.018-9.31-47.143-18.571-6.195-4.062-15.103-8.332-15.714-15.714-.676-8.165 17.552-12.487 14.286-20-47.394 11.704-62.936.326-87.143-11.429-10.662 2.55-18.21 12.217-27.143 18.571-11.098 7.895-21.899 16.2-32.857 24.286-9.043 6.674-18.727 12.552-27.143 20-8.829 7.814-12.778 23.15-24.286 25.714-16.485 3.675-45.159-1.798-47.143-18.57-2.73-23.09 41.955-22.397 57.143-40 13.912-16.125 35.897-37.147 28.572-57.144-44.628 12.426-55.966-5-60-25.714-7.893 1.863-9.867 12.953-15.715 18.571-21.772 20.923-47.568 26.03-61.428 52.857-4.814 9.317-3.424 27.511-11.429 34.286-12.083 10.226-41.007 8.878-47.143-5.714z'
      fill={Theme.colors.white}
    />
  </Svg>
);

const SLIDE_1 = {
  key: '0',
  icon: (
    <MaterialCommunityIcons
      name='target'
      size={ICON_SIZE}
      color={Theme.colors.white}
    />
  ),
  title: 'The goal',
  text: (
    <Text>
      Your goal is to{' '}
      <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>
        guess the number
      </Text>{' '}
      in as little guesses as possible!
    </Text>
  ),
  backgroundColor: '#C04DEE'
};

const SLIDE_2 = {
  key: '1',
  icon: <SvgBigBull />,
  title: 'Bulls and Cows',
  text: (
    <Text>
      After every guess you get some info:{' '}
      <Text style={styles.bullsText}>bulls</Text> and{' '}
      <Text style={styles.cowsText}>cows</Text>
    </Text>
  ),
  example: (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <SvgBull width={24} height={24} />
      <MaterialCommunityIcons
        name='cow'
        color={Theme.colors.primary}
        size={28}
        style={{ opacity: 0.8 }}
      />
    </View>
  ),
  backgroundColor: '#4AAFEE'
};

const SLIDE_3 = {
  key: '2',
  icon: <SvgBigBull />,
  title: 'Bulls and Cows',
  text: (
    <Text>
      <Text style={styles.bullsText}>Bull</Text>: digit in the{' '}
      <Text style={styles.boldText}>correct</Text> place
      {'\n'}
      <Text style={styles.cowsText}>Cow</Text>: digit in the{' '}
      <Text style={styles.boldText}>wrong</Text> place
    </Text>
  ),
  backgroundColor: '#ffb845'
};

const SLIDE_4 = {
  key: '3',
  icon: (
    <MaterialCommunityIcons
      name='counter'
      size={ICON_SIZE * 1.2}
      color={Theme.colors.white}
    />
  ),
  title: 'Example',
  text: (
    <Text style={styles.headerText}>
      2345{'\n'}
      <Text style={styles.explanationText}>(secret number)</Text>
    </Text>
  ),
  example: (
    <>
      <Guess guess={{ input: '2350', bulls: 2, cows: 1 }} />
      <Text style={styles.explanationText}>(your guess)</Text>
      <Text style={styles.headerText}>
        <Text style={styles.bullsText}>23</Text>
        <Text style={styles.cowsText}>5</Text>0
      </Text>
      <Text style={styles.explanationText}>(2,3 are bulls, 5 is a cow)</Text>
    </>
  ),
  backgroundColor: '#4b4c96'
};

const SLIDE_5 = {
  key: '4',
  icon: (
    <AntDesign
      name='exclamationcircleo'
      size={ICON_SIZE}
      color={Theme.colors.white}
    />
  ),
  title: 'Unique numbers',
  text: <Text>Remember - the same digit can't appear more than once!</Text>,
  backgroundColor: '#FC515B'
};

const SLIDES: Slide[] = [SLIDE_1, SLIDE_2, SLIDE_3, SLIDE_4, SLIDE_5];

export default SLIDES;
