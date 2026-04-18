import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { colors, optionStates } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';

type OptionState = 'default' | 'selected' | 'correct' | 'wrong';

interface OptionButtonProps {
  text: string;
  index: number;
  onPress: (index: number) => void;
  state?: OptionState;
  disabled?: boolean;
  showFeedback?: boolean;
}

export default function OptionButton({
  text,
  index,
  onPress,
  state = 'default',
  disabled = false,
  showFeedback = false,
}: OptionButtonProps) {
  const stateStyle = optionStates[state];

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
    <TouchableOpacity
      style={containerStyle}
      onPress={() => onPress(index)}
      disabled={disabled || showFeedback}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}
