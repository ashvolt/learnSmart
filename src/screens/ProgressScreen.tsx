import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TestSession } from '../types';
import { getSessions, getStreak, formatTime, scoreLabel } from '../utils/storage';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Progress'> };

function scoreColor(pct: number) {
  if (pct >= 80) return '#2ECC71';
  if (pct >= 60) return '#F1C40F';
  if (pct >= 40) return '#E67E22';
  return '#E74C3C';
}

export default function ProgressScreen({ navigation }: Props) {
  const [sessions, setSessions] = useState<TestSession[]>([]);
  const [streak, setStreak] = useState(0);

  const load = useCallback(async () => {
    const [s, ss] = await Promise.all([getStreak(), getSessions()]);
    setStreak(s);
    setSessions(ss);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const fullTests = sessions.filter((s) => s.total >= 40);
  const avgScore = fullTests.length > 0
    ? Math.round(fullTests.reduce((a, s) => a + s.score, 0) / fullTests.length)
    : 0;
  const best = fullTests.length > 0
    ? Math.max(...fullTests.map((s) => s.score))
    : 0;

  // Last 10 for mini-chart
  const chartData = fullTests.slice(0, 10).reverse();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Progress</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{streak}</Text>
            <Text style={styles.statLabel}>Day Streak 🔥</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{avgScore}</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{best}</Text>
            <Text style={styles.statLabel}>Best Score</Text>
          </View>
        </View>

        {/* Chart */}
        {chartData.length > 1 && (
          <View style={styles.chartBox}>
            <Text style={styles.sectionTitle}>Score Trend (last {chartData.length} tests)</Text>
            <View style={styles.chartArea}>
              {/* Y-axis labels */}
              <View style={styles.yAxis}>
                {[50, 35, 20, 0].map((v) => (
                  <Text key={v} style={styles.yLabel}>{v}</Text>
                ))}
              </View>
              <View style={styles.chartInner}>
                {/* Grid lines */}
                {[50, 35, 20, 0].map((v) => (
                  <View
                    key={v}
                    style={[styles.gridLine, { bottom: `${(v / 50) * 100}%` as any }]}
                  />
                ))}
                {/* Target line at 30 */}
                <View style={[styles.targetLine, { bottom: '60%' }]} />
                {/* Bars */}
                <View style={styles.barsRow}>
                  {chartData.map((s, i) => {
                    const heightPct = (s.score / 50) * 100;
                    const color = scoreColor((s.score / s.total) * 100);
                    return (
                      <View key={i} style={styles.barWrap}>
                        <View
                          style={[
                            styles.bar,
                            { height: `${heightPct}%` as any, backgroundColor: color },
                          ]}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
            <Text style={styles.chartNote}>
              <Text style={{ color: '#4A90D9' }}>—</Text> Target: 30/50
            </Text>
          </View>
        )}

        {/* Session History */}
        <Text style={styles.sectionTitle}>Test History</Text>
        {sessions.length === 0 && (
          <Text style={styles.emptyText}>No tests completed yet. Start your first daily test!</Text>
        )}
        {sessions.map((s, i) => {
          const pct = Math.round((s.score / s.total) * 100);
          const color = scoreColor(pct);
          const date = new Date(s.date);
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

          return (
            <View key={i} style={styles.sessionCard}>
              <View style={[styles.sessionScoreBadge, { backgroundColor: color + '22', borderColor: color }]}>
                <Text style={[styles.sessionScore, { color }]}>{s.score}</Text>
                <Text style={styles.sessionTotal}>/{s.total}</Text>
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionDate}>{dateStr} · {timeStr}</Text>
                <Text style={styles.sessionLabel}>{scoreLabel(s.score, s.total)} · {pct}%</Text>
                <Text style={styles.sessionTime}>Completed in {formatTime(s.timeTaken)}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F1923' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1C2B3A',
  },
  back: { fontSize: 22, color: '#4A90D9', padding: 4, width: 32 },
  title: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#FFFFFF' },

  container: { padding: 20, paddingBottom: 40 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: {
    flex: 1,
    backgroundColor: '#1C2B3A',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  statVal: { fontSize: 24, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#8899AA', textAlign: 'center' },

  sectionTitle: { fontSize: 13, color: '#8899AA', fontWeight: '600', marginBottom: 12, letterSpacing: 0.5 },

  chartBox: { backgroundColor: '#1C2B3A', borderRadius: 14, padding: 16, marginBottom: 24 },
  chartArea: { flexDirection: 'row', height: 140, marginBottom: 8 },
  yAxis: { justifyContent: 'space-between', paddingRight: 6, paddingBottom: 4 },
  yLabel: { fontSize: 10, color: '#8899AA' },
  chartInner: { flex: 1, position: 'relative', overflow: 'hidden' },
  gridLine: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#2A3D50' },
  targetLine: { position: 'absolute', left: 0, right: 0, height: 1.5, backgroundColor: '#4A90D9', opacity: 0.6 },
  barsRow: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'flex-end', height: '100%' },
  barWrap: { flex: 1, height: '100%', justifyContent: 'flex-end', paddingHorizontal: 2 },
  bar: { borderRadius: 3, minHeight: 4 },
  chartNote: { fontSize: 11, color: '#8899AA', textAlign: 'center' },

  emptyText: { color: '#8899AA', textAlign: 'center', fontSize: 14, marginVertical: 20, lineHeight: 20 },

  sessionCard: {
    backgroundColor: '#1C2B3A',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 14,
  },
  sessionScoreBadge: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionScore: { fontSize: 22, fontWeight: '800' },
  sessionTotal: { fontSize: 12, color: '#8899AA' },
  sessionInfo: { flex: 1 },
  sessionDate: { fontSize: 13, color: '#FFFFFF', fontWeight: '600', marginBottom: 2 },
  sessionLabel: { fontSize: 12, color: '#8899AA', marginBottom: 2 },
  sessionTime: { fontSize: 11, color: '#8899AA' },
});
