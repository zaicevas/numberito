import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../constants/index';
import { NavigationInjectedProps } from 'react-navigation';

interface Slide {
  key: string;
  title: string;
  text: string;
  backgroundColor: string;
}

const slides: Slide[] = [
  {
    key: '0',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    backgroundColor: '#C04DEE',
  },
  {
    key: '1',
    title: 'Title 2',
    text: 'Other cool stuff',
    backgroundColor: '#4AAFEE',
  },
  {
    key: '2',
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    backgroundColor: '#FC515B',
  },
];

const renderItem = ({ item }: { item: Slide }) => (
  <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
    <Ionicons name="ios-nutrition" size={100} color={Theme.colors.white} />
    <Text style={styles.header}>{item.title}</Text>
    <Text style={styles.text}>{item.text}</Text>
  </View>
);

const TutorialScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  return (
    <AppIntroSlider
      renderItem={renderItem}
      slides={slides}
      onDone={() => navigation.goBack()}
      onSkip={() => navigation.goBack()}
      showSkipButton
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});

export default TutorialScreen;
