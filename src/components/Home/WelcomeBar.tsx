import React from 'react';
import { Image, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Layout } from '../../constants/index';

const STATUS_BAR_HEIGHT = 20;

const photos = [
  require('../../../assets/home/bean_confident.jpg'),
  require('../../../assets/home/bean_confident2.png'),
  require('../../../assets/home/happy-sombrero.jpg'),
  require('../../../assets/home/happy_hispanic.jpeg'),
  require('../../../assets/home/borat.jpeg'),
];

class WelcomeBar extends React.Component<WelcomeBarProps, WelcomeBarState> {
  public state = {
    currentIndex: 0,
  };

  public render() {
    const { currentIndex } = this.state;
    const { title } = this.props;
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() => this.setState({ currentIndex: this.state.currentIndex + 1 })}
        >
          <Image
            resizeMode="contain"
            source={photos[currentIndex % photos.length]}
            style={styles.welcomeImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

interface WelcomeBarProps {
  title: string;
}

interface WelcomeBarState {
  currentIndex: number;
}

interface Style {
  welcomeImage: ImageStyle;
  welcomeContainer: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Style>({
  welcomeImage: {
    height: Layout.height * 0.25,
    alignSelf: 'center',
  },
  welcomeContainer: {
    paddingTop: STATUS_BAR_HEIGHT + 5,
    minHeight: Layout.height * 0.5,
  },
  title: {
    marginBottom: '10%',
    marginTop: '5%',
    alignSelf: 'center',
    fontSize: 36,
    fontWeight: '600',
  },
});

export default WelcomeBar;
