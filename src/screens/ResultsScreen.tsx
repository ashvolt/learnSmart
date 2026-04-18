import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, QuestionCategory } from '../types';
import { formatTime, scoreLabel } from '../utils/storage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Results'>;
  route: RouteProp<RootStackParamList, 'Results'>;
};

const CAT_META: Record<QuestionCategory, { label: string; icon: string; color: string }> = {
  verbal:  { label: 'Verbal',       icon: '📖', color: '#4A90D9' },
  math:    { label: 'Math & Logic', icon: '🔢', color: '#E67E22' },
  spatial: { label: 'Spatial',      icon: '🔷', color: '#2ECC71' },
};

function scoreColor(pct: number): string {
  if (pct >= 80) return '#2ECC71';
  if (pct >= 60) return '#F1C40F';
  if (pct >= 40) return '#E67E22';
  return '#E74C3C';
}

export default function ResultsScreen({ navigation, route }: Props) {
  const { session } = route.params;
  const pct = Math.round((session.score / session.total) * 100);
  const label = scoreLabel(session.score, session.total);
  const color = scoreColor(pct);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Score Circle */}
        <View style={styles.scoreSection}>
          <View style={[styles.scoreCircle, { borderColor: color }]}>
            <Text style={[styles.scoreNum, { color }]}>{session.score}</Text>
            <Text style={styles.scoreTotal}>/ {session.total}</Text>
          </View>
          <Text style={[styles.scoreLabel, { color }]}>{label}</Text>
          <Text style={styles.scorePct}>{pct}% correct</Text>
          <Text style={styles.timeInfo}>Completed in {formatTime(session.timeTaken)}</Text>
        </View>

        {/* CCAT Benchmark */}
        <View style={styles.benchmarkBox}>
          <Text style={styles.benchmarkTitle}>CCAT Benchmark</Text>
          <Text style={styles.benchmarkText}>
            Crossover target score is typically <Text style={{ color: '#4A90D9', fontWeight: '700' }}>30+/50</Text> (top 30%).{'\n'}
            Keep practicing to exceed 35/50 for best results.
          </Text>
          <View style={styles.benchmarkBar}>
            <View style={[styles.benchmarkFill, { width: `${Math.min(pct, 100)}%`, backgroundColor: color }]} />
            {/* Target marker at 60% (30/50) */}
            <View style={styles.targetMarker} />
          </View>
          <View style={styles.benchmarkLabels}>
            <Text style={styles.benchmarkLabelLeft}>0</Text>
            <Text style={styles.benchmarkLabelMid}>Target: 30</Text>
            <Text style={styles.benchmarkLabelRight}>50</Text>
          </View>
        </View>

        {/* Category Breakdown */}
        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        {(Object.keys(session.categoryBreakdown) as QuestionCategory[]).map((cat) => {
          const bd = session.categoryBreakdown[cat];
          if (bd.total === 0) return null;
          const meta = CAT_META[cat];
          const catPct = Math.round((bd.correct / bd.total) * 100);
          return (
            <View key={cat} style={styles.catRow}>
              <Text style={styles.catIcon}>{meta.icon}</Text>
              <View style={styles.catInfo}>
                <View style={styles.catHeader}>
                  <Text style={styles.catName}>{meta.label}</Text>
                  <Text style={[styles.catScore, { color: meta.color }]}>
                    {bd.correct}/{bd.total}
                  </Text>
                </View>
                <View style={styles.catBarBg}>
                  <View
                    style={[
                      styles.catBarFill,
                      { width: `${catPct}%`, backgroundColor: meta.color },
                    ]}
                  />
                </View>
              </View>
            </View>
          );
        })}

        {/* Advice */}
        <View style={styles.adviceBox}>
          <Text style={styles.adviceTitle}>💡 Focus Area</Text>
          <Text style={styles.adviceText}>{getAdvice(session)}</Text>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('DailyTest')}
        >
          <Text style={styles.primaryBtnText}>Retake Full Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.secondaryBtnText}>← Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function getAdvice(session: ReturnType<typeof getSessionType>): string {
  const bd = session.categoryBreakdown;
  const cats = (Object.keys(bd) as QuestionCategory[]).filter((c) => bd[c].total > 0);
  const worst = cats.sort(
    (a, b) => bd[a].correct / bd[a].total - bd[b].correct / bd[b].total
  )[0];
  const worstPct = Math.round((bd[worst].correct / bd[worst].total) * 100);
  const names: Record<QuestionCategory, string> = {
    verbal: 'Verbal Reasoning — practice analogies and vocabulary.',
    math:   'Math & Logic — work on number series and word problems.',
    spatial:'Spatial Reasoning — practice 3D shapes and pattern recognition.',
  };
  if (worstPct < 60) return `Your weakest area is ${names[worst]}`;
  return 'Great balanced performance! Keep up daily practice to maintain consistency.';
}

type SessionType = import('../types').TestSession;
function getSessionType(s: SessionType) { return s; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F1923' },
  container: { padding: 20, paddingBottom: 40 },

  scoreSection: { alignItems: 'center', paddingVertical: 28 },
  scoreCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreNum: { fontSize: 40, fontWeight: '800' },
  scoreTotal: { fontSize: 16, color: '#8899AA', fontWeight: '500' },
  scoreLabel: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  scorePct: { fontSize: 14, color: '#8899AA' },
  timeInfo: { fontSize: 13, color: '#8899AA', marginTop: 6 },

  benchmarkBox: {
    backgroundColor: '#1C2B3A',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  benchmarkTitle: { fontSize: 13, fontWeight: '700', color: '#8899AA', marginBottom: 6 },
  benchmarkText: { fontSize: 13, color: '#CCDDEE', lineHeight: 19, marginBottom: 14 },
  benchmarkBar: { height: 10, backgroundColor: '#0F1923', borderRadius: 5, overflow: 'hidden', position: 'relative' },
  benchmarkFill: { height: 10, borderRadius: 5 },
  targetMarker: { position: 'absolute', left: '60%', top: 0, bottom: 0, width: 2, backgroundColor: '#4A90D9' },
  benchmarkLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  benchmarkLabelLeft: { fontSize: 11, color: '#8899AA' },
  benchmarkLabelMid: { fontSize: 11, color: '#4A90D9' },
  benchmarkLabelRight: { fontSize: 11, color: '#8899AA' },

  sectionTitle: { fontSize: 13, color: '#8899AA', fontWeight: '600', marginBottom: 12, letterSpacing: 0.5 },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C2B3A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  catIcon: { fontSize: 22 },
  catInfo: { flex: 1 },
  catHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  catName: { fontSize: 14, color: '#FFFFFF', fontWeight: '600' },
  catScore: { fontSize: 14, fontWeight: '700' },
  catBarBg: { height: 6, backgroundColor: '#0F1923', borderRadius: 3, overflow: 'hidden' },
  catBarFill: { height: 6, borderRadius: 3 },

  adviceBox: {
    backgroundColor: '#1A2E45',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    marginBottom: 24,
    borderLeftWidth: 3,
    borderLeftColor: '#4A90D9',
  },
  adviceTitle: { fontSize: 13, fontWeight: '700', color: '#4A90D9', marginBottom: 4 },
  adviceText: { fontSize: 13, color: '#CCDDEE', lineHeight: 19 },

  primaryBtn: {
    backgroundColor: '#4A90D9',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryBtn: {
    backgroundColor: '#1C2B3A',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A3D50',
  },
  secondaryBtnText: { color: '#8899AA', fontSize: 15, fontWeight: '600' },
});
