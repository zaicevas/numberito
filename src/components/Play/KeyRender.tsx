import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../constants/index';

export default function () {
    if (this.props.keyType === 'number') {
        return (
            <View style={styles.keyNumber}>
                <TouchableOpacity activeOpacity={0.1} style={styles.button} onPress={() => console.log('y')}>
                    <Text style={styles.textButton}>
                        {this.props.keySymbol}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    } if (this.props.keyType === 'operator') {
        return (
            <View style={styles.keyOperator}>
                <TouchableOpacity activeOpacity={0.1} style={getOperatorStyles(this.props.keyValue)} onPress={this.handleClick}>
                    <Text style={styles.textButtonOperator}>
                        {this.props.keySymbol}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    } if (this.props.keyType === 'action') {
        return (
            <View style={styles.keyAction}>
                <TouchableOpacity style={styles.keyActionButton} onPress={this.handleClick}>
                    <View style={getActionStyles(this.props.keyValue)}>
                        <Text style={getActionButtonStyles(this.props.keyValue)}>
                            {this.props.keySymbol}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const getOperatorStyles = function (classOperation) {
    let buttonOperator = {
        basic: {
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
        },
        add: {
            backgroundColor: Theme.colors.accent,
            paddingBottom: 3,
        },
        substract: {
            backgroundColor: '#fcb064',
            paddingBottom: 3,
        },
        multiply: {
            backgroundColor: '#68cef1',
            paddingBottom: 3,
        },
        divide: {
            backgroundColor: '#cb7dc9',
            paddingBottom: 3,
        },
    };
    return Object.assign(buttonOperator.basic, buttonOperator[classOperation]);
};

const getActionStyles = function (classOperation) {
    let buttonAction = {
        basic: {
            flex: 1,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        back: {
            paddingBottom: 1,
            borderColor: '#d68086',
            borderWidth: 1,
        },
        equal: {
            paddingBottom: 1,
            borderColor: '#9ed8a6',
            borderWidth: 1,
        },
    };
    return Object.assign(buttonAction.basic, buttonAction[classOperation]);
};

const getActionButtonStyles = function (classOperation) {
    let buttonText = {
        basic: {
            fontSize: 25,
            fontWeight: '200',
        },
        back: {
            paddingBottom: 3,
            color: '#d68086',
        },
        equal: {
            paddingBottom: 3,
            color: '#9ed8a6',
        },
    };
    return Object.assign(buttonText.basic, buttonText[classOperation]);
};

const styles = StyleSheet.create({
    keyNumber: {
        flex: 1,
        borderColor: '#f8f8f8',
        borderWidth: 1,
    },
    keyOperator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#f8f8f8',
        borderWidth: 1,
    },
    keyAction: {
        flex: 1,
        padding: 10,
    },
    keyActionButton: {
        flex: 1,
    },
    button: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        color: '#919191',
        fontSize: 20,
        fontWeight: '400',
    },
    textButtonOperator: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
});
