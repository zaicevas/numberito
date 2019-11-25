import { light as lightTheme, mapping } from '@eva-design/eva';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { ApplicationProvider } from 'react-native-ui-kitten';
import AppContainer from './navigation/AppContainer';

export default class App extends React.Component {
  public render() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppContainer />
        </View>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
