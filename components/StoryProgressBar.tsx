import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface StoryProgressBarProps {
  duration: number;
  isPaused: boolean;
  onComplete: () => void;
  progress: number;
}

export function StoryProgressBar({ duration, isPaused, onComplete, progress }: StoryProgressBarProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPaused) {
      progressAnim.stopAnimation();
    } else {
      Animated.timing(progressAnim, {
        toValue: 100,
        duration: duration * 1000 * (1 - progress / 100),
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          onComplete();
        }
      });
    }

    return () => {
      progressAnim.stopAnimation();
    };
  }, [isPaused, progress]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
});