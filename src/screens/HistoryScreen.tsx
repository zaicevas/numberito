import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from 'rn-placeholder';
import SvgBull from '../components/SvgBull';
import { Layout, Theme } from '../constants/index';
import { getHistory } from '../helpers/HistoryRepository';
import { SingleGuess } from '../types/index';

interface Section {
  answer: string;
  history: SingleGuess[];
  timestamp: Date;
}

const LoadingPlaceholder: React.FC = () => {
  return (
    <>
      {Array(20).fill(
        <Placeholder
          tyle={styles.icon}
          Animation={ShineOverlay}
          Left={PlaceholderMedia}
        >
          <PlaceholderLine width={Layout.width * 0.9} />
          <PlaceholderLine width={Layout.width * 0.9} />
        </Placeholder>,
      )}
    </>
  );
};

const renderSingleGuess = (guess: SingleGuess, index: number) => {
  return (
    <View style={[styles.singleGuessContainer, styles.singleGuess]} key={index}>
      <Text style={styles.historyText}>{guess.input}</Text>
      <View style={styles.guessInfo}>
        <Text style={styles.bullsCowsText}>{guess.bulls}</Text>
        <SvgBull />
        <Text style={styles.bullsCowsText}>{guess.cows}</Text>
        <MaterialCommunityIcons
          name="cow"
          color={Theme.colors.primary}
          size={21}
        />
      </View>
    </View>
  );
};

interface HistoryScreenState {
  activeSections: Section[];
  collapsed: boolean;
  guesses: SingleGuess[];
  isLoading: boolean;
}

class HistoryScreen extends React.Component<
  NavigationInjectedProps,
  HistoryScreenState
  > {
  public state = {
    activeSections: [],
    collapsed: true,
    guesses: [],
    isLoading: true,
  };

  public componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('willFocus', async () => {
      this.setState({
        isLoading: true,
      });
      const history = await getHistory();
      const historyJson = JSON.parse(history);
      this.setState({
        guesses: historyJson ? historyJson.reverse() : [],
        isLoading: false,
      });
    });
  }

  public setSections = (sections: Section[]) => {
    this.setState({
      activeSections: sections,
    });
  }

  public renderHeader = (section: Section, _: any, isActive: boolean) => {
    const timestampSplit = section.timestamp.split('T');
    const timestamp = `${timestampSplit[0]} ${timestampSplit[1].split('.')[0]}`;
    return (
      <View style={[styles.header, isActive ? styles.active : styles.inactive]}>
        <View style={styles.horizontalLayout}>
          <View style={styles.icon}>
            {this.getIcon(section.history.length)}
          </View>
          <View>
            <Text style={styles.headerText}>{section.answer}</Text>
            <Text style={styles.dateText}>{timestamp}</Text>
          </View>
        </View>
      </View>
    );
  }

  public renderContent(section: Section, _: any, isActive: boolean) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        {section.history.map((singleGuess, index) =>
          renderSingleGuess(singleGuess, index),
        )}
      </Animatable.View>
    );
  }

  public render() {
    const { activeSections, guesses, isLoading } = this.state;

    return isLoading ? (
      <View style={styles.container}>
        <LoadingPlaceholder />
      </View>
    ) : (
        <View style={styles.container}>
          <ScrollView>
            <Accordion
              activeSections={activeSections}
              sections={guesses}
              touchableComponent={TouchableOpacity}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
              onChange={this.setSections}
            />
          </ScrollView>
        </View>
      );
  }

  private getIcon = (guessCount: number) => {
    if (guessCount < 10) {
      return (
        <MaterialCommunityIcons
          name={`numeric-${guessCount}-box-multiple-outline`}
          size={24}
        />
      );
    }
    if (guessCount < 1 || guessCount > 99) return null;
    return (
      <>
        <MaterialCommunityIcons
          name={`numeric-${Math.floor(guessCount / 10)}-box-multiple-outline`}
          size={24}
        />
        <MaterialCommunityIcons
          name={`numeric-${guessCount % 10}-box-multiple-outline`}
          size={24}
        />
      </>
    );
  }
}

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  header: ViewStyle;
  headerText: TextStyle;
  content: ViewStyle;
  active: ViewStyle;
  inactive: ViewStyle;
  dateText: TextStyle;
  historyText: TextStyle;
  singleGuess: ViewStyle;
  bullsCowsText: TextStyle;
  horizontalLayout: ViewStyle;
  icon: ViewStyle;
  guessInfo: ViewStyle;
  singleGuessContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    paddingTop: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
  },
  header: {
    height: 56,
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '400',
  },
  content: {
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '200',
    color: Theme.colors.gray,
  },
  historyText: {
    fontSize: 18,
    color: 'white',
  },
  singleGuess: {
    backgroundColor: Theme.colors.tertiary,
    borderRadius: Theme.sizes.radius,
    padding: Layout.height * 0.007,
    margin: Layout.width * 0.02,
  },
  bullsCowsText: {
    color: Theme.colors.white,
  },
  horizontalLayout: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme.colors.white,
  },
  icon: {
    flexDirection: 'row',
    paddingLeft: 6,
    marginRight: 16,
  },
  guessInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 4,
  },
  singleGuessContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default withNavigation(HistoryScreen);
