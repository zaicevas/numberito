import React, { Component } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../constants/index';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

// class HistoryScreen extends React.PureComponent {
//   public render() {
//     return (
//       <Layout style={styles.container}>
//         <Text style={styles.text} category="h4">
//           Welcome to UI Kitten
//         </Text>
//         <OverflowMenu>
//           <Button>BUTTON</Button>
//         </OverflowMenu>
//       </Layout>
//     );
//   }
// }

const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CONTENT = [
  {
    title: 'First',
    content: <Text>wut</Text>,
    answer: '1523',
  },
  {
    title: 'Second',
    content: BACON_IPSUM,
    answer: '9512',
  },
  {
    title: 'Third',
    content: BACON_IPSUM,
    answer: '1236',
  },
  {
    title: 'Fourth',
    content: BACON_IPSUM,
    answer: '8152',
  },
  {
    title: 'Fifth',
    content: BACON_IPSUM,
    answer: '6170',
  },
];

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
  },
];

class HistoryScreen extends React.Component {
  public state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  public toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  public setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  }

  public renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={200}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: Theme.colors.white,
          }}
        >
          <View style={{ flex: 0.2, flexDirection: 'row', paddingLeft: 6 }}>
            {this.getIcon()}
          </View>
          <View>
            <Text style={styles.headerText}>{section.answer}</Text>
            <Text style={styles.dateText}>2019-09-12</Text>
          </View>
        </View>
      </Animatable.View>
    );
  }

  public renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  public _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  }

  public render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Collapsible collapsed={this.state.collapsed} align="center">
            <View style={styles.content}>
              <Text>
                Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                ribs
              </Text>
            </View>
          </Collapsible>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
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

  private getIcon = () => (
    <>
      <MaterialCommunityIcons name="numeric-6-box-multiple-outline" size={24} />
      <MaterialCommunityIcons name="numeric-2-box-multiple-outline" size={24} />
    </>
  )
}

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  header: ViewStyle;
  headerText: TextStyle;
  content: ViewStyle;
  active: ViewStyle;
  inactive: ViewStyle;
  selectors: ViewStyle;
  selector: ViewStyle;
  activeSelector: TextStyle;
  selectTitle: TextStyle;
  multipleToggle: ViewStyle;
  multipleToggle__title: TextStyle;
  dateText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
  },
  header: {
    backgroundColor: '#F5FCFF',
    height: 64,
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
  selectors: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '200',
    color: Theme.colors.gray,
  },
});

export default HistoryScreen;
