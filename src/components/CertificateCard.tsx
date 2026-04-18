import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  ViewStyle,
} from 'react-native';
import * as Sharing from 'expo-sharing';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import Card from './Card';
import Button from './Button';
import {
  Certificate,
  formatCertificateText,
  getCertificateAchievementBadge,
} from '../utils/certificate';

interface CertificateCardProps {
  certificate: Certificate;
  onShare?: () => void;
  style?: ViewStyle;
}

export default function CertificateCard({
  certificate,
  onShare,
  style,
}: CertificateCardProps) {
  const percentage = Math.round((certificate.score / certificate.total) * 100);
  const badge = getCertificateAchievementBadge(percentage);
  const formattedDate = new Date(certificate.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleShare = async () => {
    try {
      const message = formatCertificateText(certificate);

      // Try native share first
      await Share.share({
        message,
        title: 'My CCAT Achievement',
        url: undefined,
      });

      if (onShare) {
        onShare();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Card style={[styles.container, style]} elevation="lg">
      {/* Achievement Badge */}
      <View style={styles.badgeContainer}>
        <Text style={styles.badge}>{badge}</Text>
      </View>

      {/* Certificate Content */}
      <Text style={styles.title}>Achievement Certificate</Text>

      <View style={styles.divider} />

      <Text style={styles.label}>Name</Text>
      <Text style={styles.value}>{certificate.holderName}</Text>

      <View style={styles.spacer} />

      <Text style={styles.label}>Score</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreValue}>{certificate.score}/{certificate.total}</Text>
        <Text style={styles.scorePercentage}>({percentage}%)</Text>
      </View>

      <View style={styles.spacer} />

      <Text style={styles.label}>Level</Text>
      <Text style={[styles.level, { color: getLevelColor(percentage) }]}>
        {certificate.achievementLevel}
      </Text>

      <View style={styles.spacer} />

      <Text style={styles.label}>Date</Text>
      <Text style={styles.value}>{formattedDate}</Text>

      <View style={styles.divider} />

      {/* Share Buttons */}
      <View style={styles.actions}>
        <Button
          label="📋 Copy Certificate"
          onPress={() => {
            // Copy to clipboard functionality
            const text = formatCertificateText(certificate);
            // In real app, use react-native-clipboard
          }}
          variant="secondary"
          size="sm"
          style={styles.button}
        />

        <Button
          label="🔗 Share to LinkedIn"
          onPress={handleShare}
          variant="primary"
          size="sm"
          style={styles.button}
        />
      </View>
    </Card>
  );
}

function getLevelColor(percentage: number): string {
  if (percentage >= 90) return colors.success;
  if (percentage >= 75) return colors.verbal;
  if (percentage >= 60) return colors.warning;
  return colors.error;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  badge: {
    fontSize: 64,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.verbal,
    marginRight: spacing.sm,
  },
  scorePercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  level: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  spacer: {
    height: spacing.md,
  },
  actions: {
    gap: spacing.md,
  },
  button: {
    marginBottom: spacing.sm,
  },
});
