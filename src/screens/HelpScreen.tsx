import Constants from 'expo-constants';
import React from 'react';
import { ScrollView } from 'react-native';
import { Card, CardAction, CardButton, CardContent, CardImage, CardTitle } from 'react-native-material-cards';
import { NavigationInjectedProps } from 'react-navigation';
import { SCREEN_FEEDBACK } from '../constants/Screens';

const HelpScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', marginBottom: Constants.statusBarHeight }}>
        <Card style={{ paddingTop: Constants.statusBarHeight }}>
  <CardImage
    source={require('../../assets/awesome.jpg')}
    resizeMode="center"
  />
  <CardTitle
    title="Why?"
   />
  <CardContent text="Well, see it as a free time project made for people to enhance their
  logical reasoning skills in a fun way. I highly appreciate every single suggestion, so please,
  leave me a feedback and make my day! :)" />
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
      </ScrollView>
  );
};

export default HelpScreen;
