import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { RootStackParamList } from '../types';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { Button, Card } from '../components';
import { getSettings, updateSettings } from '../utils/storage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

interface AppSettings {
  hapticsEnabled: boolean;
  soundEnabled: boolean;
  dailyReminderEnabled: boolean;
}

export default function SettingsScreen({ navigation }: Props) {
  const [settings, setSettings] = useState<AppSettings>({
    hapticsEnabled: true,
    soundEnabled: true,
    dailyReminderEnabled: true,
  });

  const load = useCallback(async () => {
    const saved = await getSettings();
    if (saved) {
      setSettings(saved);
    }
  }, []);

  // useFocusEffect's callback may only return a cleanup function, so the async
  // load is fired from inside a sync wrapper rather than passed directly.
  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleToggle = async (key: keyof AppSettings) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
    await updateSettings(newSettings);

    // Haptic feedback on toggle
    if (newSettings.hapticsEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleReset = async () => {
    const confirmReset = true; // In real app, show confirmation dialog
    if (confirmReset) {
      await updateSettings({
        hapticsEnabled: true,
        soundEnabled: true,
        dailyReminderEnabled: true,
      });
      setSettings({
        hapticsEnabled: true,
        soundEnabled: true,
        dailyReminderEnabled: true,
      });
      if (settings.hapticsEnabled) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Feedback Settings */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Feedback & Haptics</Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Haptic Feedback</Text>
              <Text style={styles.settingDescription}>
                Vibration on button taps and events
              </Text>
            </View>
            <Switch
              value={settings.hapticsEnabled}
              onValueChange={() => handleToggle('hapticsEnabled')}
              trackColor={{ false: colors.disabled, true: colors.verbal }}
              thumbColor={colors.textPrimary}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Sound Effects</Text>
              <Text style={styles.settingDescription}>
                Audio feedback for correct/wrong answers
              </Text>
            </View>
            <Switch
              value={settings.soundEnabled}
              onValueChange={() => handleToggle('soundEnabled')}
              trackColor={{ false: colors.disabled, true: colors.verbal }}
              thumbColor={colors.textPrimary}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Daily Reminders</Text>
              <Text style={styles.settingDescription}>
                Reminder to take today's test
              </Text>
            </View>
            <Switch
              value={settings.dailyReminderEnabled}
              onValueChange={() => handleToggle('dailyReminderEnabled')}
              trackColor={{ false: colors.disabled, true: colors.verbal }}
              thumbColor={colors.textPrimary}
            />
          </View>
        </Card>

        {/* App Info */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>CCAT Questions</Text>
            <Text style={styles.infoValue}>50 (17V, 17M, 16S)</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Target Score</Text>
            <Text style={styles.infoValue}>30+ / 50</Text>
          </View>
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            label="Reset to Defaults"
            onPress={handleReset}
            variant="secondary"
            style={styles.button}
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
  },
  sectionCard: {
    marginBottom: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 17,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.verbal,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  actions: {
    marginBottom: spacing['3xl'],
    gap: spacing.md,
  },
  button: {
    marginBottom: spacing.md,
  },
});
