import Constants from 'expo-constants';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Card, CardAction, CardButton, CardContent, CardImage, CardTitle } from 'react-native-material-cards';
import { NavigationInjectedProps } from 'react-navigation';
import { Layout } from '../constants/index';
import { FOOTBAR_HEIGHT } from '../constants/Navigation';
import { SCREEN_FEEDBACK } from '../constants/Screens';

interface ListItemProps {
  title: string;
}

const PEOPLE = [
  'Sabrina Nestved',
  'Aurimas Simkus',
  'Louise Taylor',
  'Fatih Chelik',
  'Akshay Katira',
  'Faustas Butkus',
  'Joris Medeisis',
  'Gustav Thormann Larsen',
];

const ListItem: React.FC<ListItemProps> = ({ title }) => (
<View style={styles.container}>
  <View style={styles.containerText}>
      <Text style={styles.title}>
          {title}
      </Text>
  </View>
</View>);

const HelpScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: FOOTBAR_HEIGHT }}>
      <Card style={{ paddingTop: Constants.statusBarHeight }}>
        <CardImage
          source={require('../../assets/awesome.jpg')}
          resizeMode="center"
        />
          <CardTitle
            title="Why?"
          />
            <CardContent text="Well, see it as a free time project made for people to enhance their
            logical reasoning skills in a fun way. I highly appreciate every single suggestion,
            so please, leave me a feedback and make my day! :)" />
              <CardAction
                separator={true}
                inColumn={false}>
                <CardButton
                  onPress={() => navigation.navigate(SCREEN_FEEDBACK)}
                  title="FEEDBACK"
                  color="blue"
                />
              </CardAction>
        </Card>
        <Card>
          <CardTitle title="This app would not be possible without these amazing people" />
          <CardContent text="That is perhaps more important than the app itself." />
        </Card>
        <FlatList
          data={PEOPLE}
          keyExtractor={item => item}
          renderItem={({ item }) => (<ListItem title={item} />)} />
    </ScrollView>
  );
};

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  containerText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: Layout.width,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    color: '#000',
  },
  containerText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
});

export default HelpScreen;
