import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { NavigationInjectedProps } from 'react-navigation';
import SLIDES from '../constants/TutorialSlides';
import { Slide } from '../types/index';

const renderItem = ({ item }: { item: Slide }) => (
  <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
    {item.icon}
    <Text style={styles.header}>{item.title}</Text>
    <Text style={styles.text}>{item.text}</Text>
    {item.example}
  </View>
);

const TutorialScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  return (
    <AppIntroSlider
      renderItem={renderItem}
      slides={SLIDES}
      onDone={() => navigation.goBack()}
      onSkip={() => navigation.goBack()}
      showSkipButton
    />
  );
};

interface Styles {
  slide: ViewStyle;
  header: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});

export default TutorialScreen;
