import * as React from "react";
import { StyleSheet, View, StatusBar, Platform } from "react-native";
import HomeScreen from './screens/HomeScreen';

export default class App extends React.Component {

  render():JSX.Element {
    return (
      <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <HomeScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ac63ff",
  }
});
