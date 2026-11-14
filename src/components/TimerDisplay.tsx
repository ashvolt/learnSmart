import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';

interface TimerProps {
  seconds: number;
  totalSeconds: number;
  isActive: boolean;
  /** Diameter of the ring. The label only fits from roughly 110 up. */
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export default function TimerDisplay({
  seconds,
  totalSeconds,
  isActive,
  size = 140,
  style,
}: TimerProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const percentage = totalSeconds > 0 ? (seconds / totalSeconds) * 100 : 0;
  const isUrgent = seconds <= 60; // Amber under a minute
  const isCritical = seconds <= 30; // Red and pulsing under thirty seconds
  const showLabel = size >= 110;

  // Pulse animation when critical
  useEffect(() => {
    if (isCritical && isActive) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [isCritical, isActive, pulseAnim]);

  // Scale animation when transitioning to urgent
  useEffect(() => {
    if (isUrgent && !isCritical) {
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (!isUrgent) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isUrgent, isCritical, scaleAnim]);

  // Determine color based on time remaining
  const getTimerColor = () => {
    if (isCritical) return colors.error;
    if (isUrgent) return colors.warning;
    return colors.verbal;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const fontSize = Math.round(size * 0.3);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: isCritical ? pulseAnim : scaleAnim }],
        },
        style,
      ]}
    >
      {/* Outer ring with progress indicator */}
      <View
        style={[
          styles.progressRing,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: size >= 110 ? 3 : 2,
            borderColor: getTimerColor(),
          },
        ]}
      >
        {/* Progress bar arc (simplified with border) */}
        <View
          style={[
            styles.progressArc,
            {
              backgroundColor: getTimerColor(),
              width: `${percentage}%`,
            },
          ]}
        />

        {/* Time display */}
        <View style={styles.timerContent}>
          <Text
            style={[
              styles.timerText,
              {
                color: getTimerColor(),
                fontSize,
                lineHeight: Math.round(fontSize * 1.15),
              },
            ]}
          >
            {formatTime(seconds)}
          </Text>
          {showLabel && isUrgent && (
            <Text style={[styles.urgentLabel, { color: getTimerColor() }]}>
              {isCritical ? '⚠ Hurry!' : 'Last minute'}
            </Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRing: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    overflow: 'hidden',
    position: 'relative',
  },
  progressArc: {
    position: 'absolute',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: colors.verbal,
    opacity: 0.1,
  },
  timerContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  timerText: {
    fontWeight: '700',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  urgentLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
