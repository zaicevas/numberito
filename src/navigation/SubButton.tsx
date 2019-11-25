import React from 'react';
import { Animated, View } from 'react-native';
import { Theme } from '../constants/index';
import { AnimatedTouchable } from '../constants/Navigation';
import { SubButtonStyles } from './Styles';

const styles = SubButtonStyles;

const SubButton: React.FC<SubButtonProps> = ({
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
                left: x,
                bottom: y,
              },
              styles.container,
            ]}
        >
            <AnimatedTouchable
                style={[{
                  backgroundColor: disabled ? Theme.colors.gray : Theme.colors.lightBlue,
                }, styles.wrapper]}
                onPress={onPress}
                disabled={disabled}
            >
                <View
                    pointerEvents="box-none"
                    style={styles.content}
                >
                    {children}
                </View>
            </AnimatedTouchable>
        </Animated.View>
    );

interface SubButtonProps {
  x: Animated.AnimatedInterpolation;
  y: Animated.AnimatedInterpolation;
  opacity: Animated.AnimatedInterpolation;
  disabled?: boolean;
  onPress: () => void;
}

export default SubButton;
