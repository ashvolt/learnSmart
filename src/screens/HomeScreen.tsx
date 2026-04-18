import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TestSession } from '../types';
import { getSessions, getStreak } from '../utils/storage';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> };

const CATEGORY_META = {
  verbal: { label: 'Verbal', color: '#4A90D9', icon: '📖' },
  math:   { label: 'Math & Logic', color: '#E67E22', icon: '🔢' },
  spatial:{ label: 'Spatial', color: '#2ECC71', icon: '🔷' },
};

export default function HomeScreen({ navigation }: Props) {
  const [streak, setStreak] = useState(0);
  const [lastSession, setLastSession] = useState<TestSession | null>(null);

  const load = useCallback(async () => {
    const [s, sessions] = await Promise.all([getStreak(), getSessions()]);
    setStreak(s);
    setLastSession(sessions[0] ?? null);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>CCAT Trainer</Text>
          <Text style={styles.subtitle}>Crossover Cognitive Aptitude Test</Text>
        </View>

        {/* Streak */}
        <View style={styles.streakCard}>
          <Text style={styles.streakIcon}>🔥</Text>
          <View>
            <Text style={styles.streakNum}>{streak} day{streak !== 1 ? 's' : ''}</Text>
            <Text style={styles.streakLabel}>Current Streak</Text>
          </View>
          {lastSession && (
            <View style={styles.lastScore}>
              <Text style={styles.lastScoreNum}>
                {lastSession.score}/{lastSession.total}
              </Text>
              <Text style={styles.lastScoreLabel}>Last Score</Text>
            </View>
          )}
        </View>

        {/* Daily Test CTA */}
        <TouchableOpacity
          style={styles.dailyBtn}
          onPress={() => navigation.navigate('DailyTest')}
          activeOpacity={0.85}
        >
          <Text style={styles.dailyBtnIcon}>⏱</Text>
          <View>
            <Text style={styles.dailyBtnTitle}>Daily Full Test</Text>
            <Text style={styles.dailyBtnSub}>50 questions · 15 minutes</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Category Practice */}
        <Text style={styles.sectionTitle}>Practice by Category</Text>
        {(Object.keys(CATEGORY_META) as Array<keyof typeof CATEGORY_META>).map((cat) => {
          const m = CATEGORY_META[cat];
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.catCard, { borderLeftColor: m.color }]}
              onPress={() => navigation.navigate('Practice', { category: cat })}
              activeOpacity={0.8}
            >
              <Text style={styles.catIcon}>{m.icon}</Text>
              <View style={styles.catText}>
                <Text style={styles.catLabel}>{m.label}</Text>
                <Text style={styles.catDesc}>Focused practice · unlimited</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          );
        })}

        {/* Progress */}
        <TouchableOpacity
          style={styles.progressBtn}
          onPress={() => navigation.navigate('Progress')}
          activeOpacity={0.8}
        >
          <Text style={styles.progressBtnText}>📊  View Progress & History</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F1923' },
  container: { padding: 20, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 24, marginTop: 8 },
  title: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', letterSpacing: 1 },
  subtitle: { fontSize: 13, color: '#8899AA', marginTop: 4 },

  streakCard: {
    backgroundColor: '#1C2B3A',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  streakIcon: { fontSize: 32 },
  streakNum: { fontSize: 22, fontWeight: '700', color: '#FF6B35' },
  streakLabel: { fontSize: 12, color: '#8899AA' },
  lastScore: { marginLeft: 'auto', alignItems: 'flex-end' },
  lastScoreNum: { fontSize: 18, fontWeight: '700', color: '#4A90D9' },
  lastScoreLabel: { fontSize: 11, color: '#8899AA' },

  dailyBtn: {
    backgroundColor: '#4A90D9',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 14,
    shadowColor: '#4A90D9',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  dailyBtnIcon: { fontSize: 28 },
  dailyBtnTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  dailyBtnSub: { fontSize: 12, color: '#C8E0F8', marginTop: 2 },
  arrow: { fontSize: 24, color: 'rgba(255,255,255,0.6)', marginLeft: 'auto' },

  sectionTitle: { fontSize: 14, color: '#8899AA', fontWeight: '600', marginBottom: 12, letterSpacing: 0.5 },
  catCard: {
    backgroundColor: '#1C2B3A',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderLeftWidth: 4,
    gap: 14,
  },
  catIcon: { fontSize: 24 },
  catText: { flex: 1 },
  catLabel: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  catDesc: { fontSize: 12, color: '#8899AA', marginTop: 2 },

  progressBtn: {
    marginTop: 16,
    backgroundColor: '#1C2B3A',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A3D50',
  },
  progressBtnText: { fontSize: 15, color: '#8899AA', fontWeight: '600' },
});
