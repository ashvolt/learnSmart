import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const variantStyles: Record<ButtonVariant, { bg: string; text: string }> = {
  primary: { bg: colors.verbal, text: colors.textPrimary },
  secondary: { bg: colors.card, text: colors.textSecondary },
  danger: { bg: colors.error, text: colors.textPrimary },
  ghost: { bg: 'transparent', text: colors.verbal },
};

const sizeStyles: Record<ButtonSize, { height: number; fontSize: number }> = {
  sm: { height: 40, fontSize: 14 },
  md: { height: 52, fontSize: 16 },
  lg: { height: 60, fontSize: 18 },
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const containerStyle: ViewStyle = {
    backgroundColor: disabled ? colors.disabled : variantStyle.bg,
    borderRadius: borderRadius.md,
    height: sizeStyle.height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    borderWidth: variant === 'ghost' ? 1 : 0,
    borderColor: colors.verbal,
    opacity: disabled ? 0.5 : 1,
  };

  const textStyle: TextStyle = {
    color: disabled ? colors.textMuted : variantStyle.text,
    fontSize: sizeStyle.fontSize,
    fontWeight: '600',
  };

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
