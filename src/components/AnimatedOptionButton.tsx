import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, optionStates } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';

type OptionState = 'default' | 'selected' | 'correct' | 'wrong';

interface AnimatedOptionButtonProps {
  text: string;
  index: number;
  onPress: (index: number) => void;
  state?: OptionState;
  disabled?: boolean;
  showFeedback?: boolean;
  hapticsEnabled?: boolean;
}

export default function AnimatedOptionButton({
  text,
  index,
  onPress,
  state = 'default',
  disabled = false,
  showFeedback = false,
  hapticsEnabled = true,
}: AnimatedOptionButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const stateStyle = optionStates[state];

  const handlePress = async () => {
    if (!disabled && !showFeedback) {
      // Haptic feedback on press
      if (hapticsEnabled) {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }

      // Scale animation
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      onPress(index);
    }

    // Haptic feedback for result
    if (showFeedback && hapticsEnabled) {
      if (state === 'correct') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (state === 'wrong') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };

  const containerStyle: ViewStyle = {
    backgroundColor: stateStyle.background,
    borderWidth: 2,
    borderColor: stateStyle.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    opacity: disabled && state === 'default' ? 0.6 : 1,
  };

  const textStyle: TextStyle = {
    color: stateStyle.text,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 1.4,
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={containerStyle}
        onPress={handlePress}
        disabled={disabled || showFeedback}
        activeOpacity={0.8}
      >
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
