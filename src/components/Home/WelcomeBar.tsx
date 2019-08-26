import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Layout } from '../../constants/index';
import Text from '../Text';

const STATUS_BAR_HEIGHT = 20;

const photos = [
  require('../../../assets/home/bean_confident.jpg'),
  require('../../../assets/home/bean_confident2.png'),
  require('../../../assets/home/happy-sombrero.jpg'),
  require('../../../assets/home/happy_hispanic.jpeg'),
];

interface WelcomeBarProps {
  title: string;
}

class WelcomeBar extends React.Component<WelcomeBarProps> {
  public state = {
    currentIndex: 0,
  };

  public render() {
    const { currentIndex } = this.state;
    const { title } = this.props;
    return (
      <View style={styles.welcomeContainer}>
        <Text bold center h1 style={{ marginBottom: '10%', marginTop: '5%' }}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 });
          }}
        >
          <Image
            resizeMode="contain"
            source={photos[currentIndex % 4]}
            style={styles.welcomeImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

interface Style {
  welcomeImage: ImageStyle;
  welcomeContainer: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Style>({
  welcomeImage: {
    height: Layout.height * 0.25,
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
