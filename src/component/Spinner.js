import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DOTS = 8;
const DOT_SIZE = 18; // or any size you prefer
const DOT_COLORS = [
  ['#43e97b', '#38f9d7'],
  ['#38f9d7', '#43e97b'],
  ['#43e97b', '#3f5efb'],
  ['#3f5efb', '#6a82fb'],
  ['#6a82fb', '#fc5c7d'],
  ['#fc5c7d', '#6a82fb'],
  ['#6a82fb', '#43e97b'],
  ['#43e97b', '#38f9d7'],
];

export default function Spinner({ size = 100 }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const dots = [];
  for (let i = 0; i < DOTS; i++) {
    const angle = (i * 2 * Math.PI) / DOTS;
    const radius = size / 2 - 24;
    const x = Math.cos(angle) * radius + size / 2 - DOT_SIZE / 2;
    const y = Math.sin(angle) * radius + size / 2 - DOT_SIZE / 2;

    dots.push(
      <LinearGradient
        key={i}
        colors={DOT_COLORS[i]}
        style={[
          styles.dot,
          {
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: DOT_SIZE / 2,
            position: 'absolute',
            left: x,
            top: y,
          },
        ]}
      />
    );
  }

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={{ width: size, height: size, transform: [{ rotate: spin }] }}>
        {dots}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
  },
  square: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#3fa9f5',
    borderRadius: 4,
  },
}); 