import { Animated, TouchableOpacity } from 'react-native';

const MIDDLE_BUTTON_SIZE = 70;
const SUB_BUTTON_SIZE = 40;
const AUTO_CLOSE_MORE_BUTTON = 15 * 1000;
const ANIMATION_LENGTH = 1500;
const FOOTBAR_HEIGHT = 50;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export { MIDDLE_BUTTON_SIZE, SUB_BUTTON_SIZE, AUTO_CLOSE_MORE_BUTTON, ANIMATION_LENGTH, FOOTBAR_HEIGHT, AnimatedTouchable };

