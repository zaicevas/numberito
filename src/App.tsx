import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppContainer from './navigation/AppContainer';

export default class App extends React.Component {
  public render(): JSX.Element {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
