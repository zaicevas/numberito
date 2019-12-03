import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppContainer from './navigation/AppContainer';

const App: React.FC = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  if (isLoadingComplete) {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppContainer />
      </View>
    );
  }
  return (
    <AppLoading
      startAsync={loadResourcesAsync}
      onFinish={() => handleFinishLoading(setLoadingComplete)}
    />
  );
};

const loadResourcesAsync = async () => {
  await Promise.all([
    Asset.loadAsync([
      require('../assets/home/bean_confident.jpg'),
      require('../assets/home/bean_confident2.png'),
      require('../assets/home/happy-sombrero.jpg'),
      require('../assets/home/happy_hispanic.jpeg'),
      require('../assets/bull-cow.png'),
      require('../assets/flame.png'),
      require('../assets/awesome.jpg'),
    ]),
  ]);
};

const handleFinishLoading = (setLoadingComplete: (arg: boolean) => void) => {
  setLoadingComplete(true);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
