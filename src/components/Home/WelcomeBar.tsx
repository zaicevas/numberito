import { Title } from 'native-base';
import React from 'react';
import { Image, ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

const STATUS_BAR_HEIGHT = 20;

interface WelcomeBarProps {
  title: string;
}

const WelcomeBar = ({ title }: WelcomeBarProps) => (
  <View style={styles.welcomeContainer}>
    <Image
      resizeMode="contain"
      source={require('../../../assets/icon.png')}
      style={styles.welcomeImage}
    />
    <Title style={styles.title}>{title}</Title>
  </View>
);

interface Style {
  welcomeImage: ImageStyle;
  welcomeContainer: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Style>({
  welcomeImage: {
    height: 120,
    marginBottom: '4%',
    alignSelf: 'center',
  },
  welcomeContainer: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT + 5,
  },
  title: {
    fontSize: 28,
    color: 'black',
  },
});

export default WelcomeBar;
