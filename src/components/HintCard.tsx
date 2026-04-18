import React from 'react';
import { View, Text, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { colors, categoryColors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { Hint } from '../data/hints';
import Card from './Card';

interface HintCardProps {
  hint: Hint;
  style?: ViewStyle;
}

const categoryIcons: Record<string, string> = {
  verbal: '📖',
  math: '🔢',
  spatial: '🔷',
  general: '💡',
};

export default function HintCard({ hint, style }: HintCardProps) {
  const categoryColor = categoryColors[hint.category as keyof typeof categoryColors] || colors.verbal;
  const icon = categoryIcons[hint.category] || '💡';

  return (
    <Card style={[styles.container, style]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.titleContainer}>
          <Text style={[styles.category, { color: categoryColor }]}>
            {hint.category.charAt(0).toUpperCase() + hint.category.slice(1)}
          </Text>
          <Text style={styles.title}>{hint.title}</Text>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.content}>{hint.content}</Text>

      {/* Tips */}
      {hint.tips && hint.tips.length > 0 && (
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsLabel}>Tips:</Text>
          {hint.tips.map((tip, index) => (
            <View key={index} style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: 28,
    marginRight: spacing.md,
    marginTop: 2,
  },
  titleContainer: {
    flex: 1,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 1.3,
  },
  content: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 1.6,
    marginBottom: spacing.lg,
  },
  tipsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTopVertical: spacing.lg,
    paddingTop: spacing.lg,
  },
  tipsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  tipRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  tipBullet: {
    fontSize: 14,
    color: colors.verbal,
    marginRight: spacing.md,
    fontWeight: '700',
  },
  tipText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 1.5,
  },
});
