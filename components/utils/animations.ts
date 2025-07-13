// src/utils/animations.ts
import { Animated } from 'react-native';

export const createScale = () => new Animated.Value(1);

export const animateIn = (anim: Animated.Value) => {
  Animated.spring(anim, {
    toValue: 0.96,
    useNativeDriver: true,
  }).start();
};

export const animateOut = (anim: Animated.Value) => {
  Animated.spring(anim, {
    toValue: 1,
    friction: 3,
    tension: 40,
    useNativeDriver: true,
  }).start();
};

export const bounce = (anim: Animated.Value) => {
  Animated.spring(anim, {
    toValue: 1,
    useNativeDriver: true,
  }).start();
};
