import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius, shadows } from '../theme/spacing';

type CardElevation = 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  elevation?: CardElevation;
  padded?: boolean;
  style?: ViewStyle;
}

export default function Card({
  children,
  elevation = 'sm',
  padded = true,
  style,
}: CardProps) {
  const elevationStyle = shadows[elevation];

  const containerStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: padded ? spacing.cardPadding : 0,
    ...elevationStyle,
  };

  return <View style={[containerStyle, style]}>{children}</View>;
}
