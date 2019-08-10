import React from 'react';
import { StyleSheet, View } from 'react-native';
import Key from './Key';

export default function () {
    return (
        <View style={styles.keyboard}>
            <View style={styles.row}>
                <Key keyType="number" keyValue="1" keySymbol="1" />
                <Key keyType="number" keyValue="2" keySymbol="2" />
                <Key keyType="number" keyValue="3" keySymbol="3" />
            </View>
            <View style={styles.row}>
                <Key keyType="number" keyValue="4" keySymbol="4" />
                <Key keyType="number" keyValue="5" keySymbol="5" />
                <Key keyType="number" keyValue="6" keySymbol="6" />
            </View>
            <View style={styles.row}>
                <Key keyType="number" keyValue="7" keySymbol="7" />
                <Key keyType="number" keyValue="8" keySymbol="8" />
                <Key keyType="number" keyValue="9" keySymbol="9" />
            </View>
            <View style={styles.row}>
                <Key keyType="operator" keyValue="add" keySymbol="+" />
                <Key keyType="number" keyValue="0" keySymbol="0" />
                <Key keyType="number" keyValue="." keySymbol="." />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    keyboard: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
});
