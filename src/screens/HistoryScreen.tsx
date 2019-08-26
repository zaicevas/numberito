import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

class HistoryScreen extends React.PureComponent {
  public render() {
    return <View style={styles.container} />;
  }
}

interface Style {
  container: ViewStyle;
}
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
});

export default HistoryScreen;
