import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

function useLoop(duration: number, start: number, end: number) {
  const val = useRef(new Animated.Value(start)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(val, { toValue: end, duration, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(val, { toValue: start, duration, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [val, duration, start, end]);
  return val;
}

export default function AnimatedBackground() {
  const tx1 = useLoop(18000, -20, 20);
  const ty1 = useLoop(21000, -15, 15);
  const s1 = useLoop(18000, 0.95, 1.05);
  const r1 = useLoop(20000, 0, 1);

  const tx2 = useLoop(22000, -25, 25);
  const ty2 = useLoop(16000, -18, 18);
  const s2 = useLoop(22000, 0.9, 1.1);
  const r2 = useLoop(24000, 0, 1);

  const tx3 = useLoop(25000, -30, 30);
  const ty3 = useLoop(19000, -20, 20);
  const s3 = useLoop(25000, 0.92, 1.08);
  const r3 = useLoop(23000, 0, 1);

  const rotate1 = r1.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const rotate2 = r2.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const rotate3 = r3.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[
          styles.shape,
          {
            backgroundColor: 'rgba(255,255,255,0.10)',
            width: width * 0.6,
            height: width * 0.6,
            borderRadius: width * 0.3,
            transform: [{ translateX: tx1 }, { translateY: ty1 }, { scale: s1 }, { rotate: rotate1 }],
            top: height * 0.15,
            left: -width * 0.1,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.shape,
          {
            backgroundColor: 'rgba(245,245,245,0.12)',
            width: width * 0.5,
            height: width * 0.5,
            borderRadius: width * 0.25,
            transform: [{ translateX: tx2 }, { translateY: ty2 }, { scale: s2 }, { rotate: rotate2 }],
            top: height * 0.55,
            left: width * 0.55,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.shape,
          {
            backgroundColor: 'rgba(230,230,230,0.08)',
            width: width * 0.45,
            height: width * 0.45,
            borderRadius: width * 0.225,
            transform: [{ translateX: tx3 }, { translateY: ty3 }, { scale: s3 }, { rotate: rotate3 }],
            top: -height * 0.05,
            left: width * 0.4,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shape: {
    position: 'absolute',
  },
});

