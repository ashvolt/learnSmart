import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors, categoryColors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { HINTS, HintCategory } from '../data/hints';
import { Button, HintCard } from '../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HintsScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<HintCategory>('verbal');

  const categories: { id: HintCategory; label: string; icon: string }[] = [
    { id: 'verbal', label: 'Verbal', icon: '📖' },
    { id: 'math', label: 'Math', icon: '🔢' },
    { id: 'spatial', label: 'Spatial', icon: '🔷' },
    { id: 'general', label: 'General', icon: '💡' },
  ];

  const currentHints = HINTS[selectedCategory] || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Study Tips</Text>
          <Text style={styles.subtitle}>Learn strategies for each question type</Text>
        </View>

        {/* Category Tabs */}
        <View style={styles.categoryTabs}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.id && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.categoryLabelActive,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hints List */}
        <View style={styles.hintsContainer}>
          {currentHints.length > 0 ? (
            currentHints.map((hint, index) => (
              <HintCard
                key={hint.id}
                hint={hint}
                style={index < currentHints.length - 1 ? { marginBottom: spacing.lg } : {}}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No hints available for this category.</Text>
            </View>
          )}
        </View>

        {/* Close Button */}
        <View style={styles.footer}>
          <Button
            label="Close"
            onPress={() => navigation.goBack()}
            variant="secondary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    padding: spacing.containerPadding,
  },
  header: {
    marginBottom: spacing['3xl'],
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 21,
  },
  categoryTabs: {
    flexDirection: 'row',
    marginBottom: spacing['2xl'],
    gap: spacing.sm,
  },
  categoryTab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
  },
  categoryTabActive: {
    backgroundColor: colors.card,
    borderColor: colors.verbal,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  categoryLabelActive: {
    color: colors.verbal,
  },
  hintsContainer: {
    marginBottom: spacing['2xl'],
  },
  emptyState: {
    padding: spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textMuted,
    textAlign: 'center',
  },
  footer: {
    marginBottom: spacing['2xl'],
  },
});
