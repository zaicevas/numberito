import { Animated, TouchableOpacity } from 'react-native';

const MIDDLE_BUTTON_SIZE = 70;
const SUB_BUTTON_SIZE = 40;
const ANIMATION_LENGTH = 1500;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export { MIDDLE_BUTTON_SIZE, ANIMATION_LENGTH, AnimatedTouchable, SUB_BUTTON_SIZE };

