import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { Layout, Theme } from '../constants/index';

const HelpScreen: React.FC = () => {
  return (<View>
    <ImageBackground source={require('../../assets/awesome.jpg')} style={{ width: '100%', height: Layout.height * 0.25 }}>
      <Text style={{ position: 'relative', color: Theme.colors.white, fontWeight: '800', top: Layout.height * 0.21, paddingLeft: 8 }}>What is this app?</Text>
    </ImageBackground>
  </View>);
};

export default HelpScreen;
