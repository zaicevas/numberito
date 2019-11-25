import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { Theme } from '../constants/index';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const SUB_BUTTON_SIZE = 40;

const SubButton: React.FC = ({
    x,
    y,
    opacity,
    disabled,
    children,
    onPress,
}) => (
        <Animated.View
            style={[
                {
                    opacity,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: x,
                    bottom: y,
                },
            ]}
        >
            <AnimatedTouchable
                style={{
                    width: SUB_BUTTON_SIZE,
                    height: SUB_BUTTON_SIZE,
                    borderRadius: 100,
                    backgroundColor: disabled ? Theme.colors.gray : Theme.colors.lightBlue,
                }}
                onPress={onPress}
                disabled={disabled}
            >
                <View
                    pointerEvents="box-none"
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                    {children}
                </View>
            </AnimatedTouchable>
        </Animated.View>
    );

export default SubButton;
