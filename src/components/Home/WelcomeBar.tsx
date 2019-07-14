import React from 'react';
import { Image, ImageStyle, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
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
        <TouchableOpacity onPress={() => {
          console.log(this.state.currentIndex);
          this.setState({ currentIndex: this.state.currentIndex + 1 });
        }
        }>
          <Image
            resizeMode="contain"
            source={photos[currentIndex % 4]}
            style={styles.welcomeImage}
          />
        </TouchableOpacity>
        <Text bold center h1>{title}</Text>
      </View>);
  }
}

// const WelcomeBar = ({ title }: WelcomeBarProps) => (
//   <View style={styles.welcomeContainer}>
//     <Image
//       resizeMode="contain"
//       source={photos[0]}
//       style={styles.welcomeImage}
//       onPress = {() => }
//     />
//     <Title style={styles.title}>{title}</Title>
//   </View>
// );

interface Style {
  welcomeImage: ImageStyle;
  welcomeContainer: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Style>({
  welcomeImage: {
    height: 160,
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
