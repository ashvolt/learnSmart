import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import Card from './Card';
import Button from './Button';
import {
  Certificate,
  formatCertificateText,
  getCertificateAchievementBadge,
  shareToLinkedIn,
} from '../utils/certificate';

interface CertificateCardProps {
  certificate: Certificate;
  onShare?: () => void;
  style?: StyleProp<ViewStyle>;
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

  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await shareToLinkedIn(certificate);
      onShare?.();
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(formatCertificateText(certificate));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          label={copied ? '✓ Copied' : '📋 Copy Certificate'}
          onPress={handleCopy}
          variant="secondary"
          size="sm"
          style={styles.button}
        />

        <Button
          label="🔗 Share Achievement"
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
