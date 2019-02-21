import * as React from 'react';
import {Text, StyleSheet, ViewStyle, TouchableOpacity} from 'react-native';

class CalculatorButton extends React.Component {
    render() {
        const {operator, handleButtonPress} = this.props;

        return (
            <TouchableOpacity
                style={styles.container}>
                <Text style={styles.item}>
                    {operator}
                </Text>
            </TouchableOpacity>
        );
    }
}

interface Style {
  container: ViewStyle;
  items: ViewStyle;
}

const styles = StyleSheet.create<Style> ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        margin: 1
    },

    item: {
        color: '#fff',
        fontSize: 26
    }
});

export default CalculatorButton;
