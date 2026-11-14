import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, optionStates } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';

export type OptionState = 'default' | 'selected' | 'correct' | 'wrong';

interface OptionButtonProps {
  text: string;
  index: number;
  onPress: (index: number) => void;
  state?: OptionState;
  disabled?: boolean;
  showFeedback?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function OptionButton({
  text,
  index,
  onPress,
  state = 'default',
  disabled = false,
  showFeedback = false,
  style,
}: OptionButtonProps) {
  const stateStyle = optionStates[state];

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
    color: stateStyle.text,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  };

  // The default state has a transparent border, which would leave the letter
  // badge invisible against the card, so fall back to the card border colour.
  const letterBorder =
    stateStyle.border === 'transparent' ? colors.border : stateStyle.border;

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={() => onPress(index)}
      disabled={disabled || showFeedback}
      activeOpacity={0.8}
    >
      <View style={[styles.letter, { borderColor: letterBorder }]}>
        <Text style={[styles.letterText, { color: stateStyle.text }]}>
          {String.fromCharCode(65 + index)}
        </Text>
      </View>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  letter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  letterText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
