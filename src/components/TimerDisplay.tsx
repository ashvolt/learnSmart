import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface TimerProps {
  seconds: number;
  totalSeconds: number;
  isActive: boolean;
  onTimeUp?: () => void;
  style?: ViewStyle;
}

export default function TimerDisplay({
  seconds,
  totalSeconds,
  isActive,
  onTimeUp,
  style,
}: TimerProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const percentage = (seconds / totalSeconds) * 100;
  const isUrgent = seconds <= 60; // Red when less than 1 minute
  const isCritical = seconds <= 30; // Extra urgent when less than 30 seconds

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
      <View style={[styles.progressRing, { borderColor: getTimerColor() }]}>
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
              },
            ]}
          >
            {formatTime(seconds)}
          </Text>
          {isUrgent && (
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
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
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
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 56,
    letterSpacing: -1,
  },
  urgentLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
