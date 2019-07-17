import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

class HistoryScreen extends React.PureComponent {
    public static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <SimpleLineIcons name="book-open" size={24} color={tintColor} />
        ),
    };

    public render() {
        return (
            <View style={styles.container}>
            </View>
        );
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
