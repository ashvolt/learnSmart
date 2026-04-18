import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Animated,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Question, QuestionCategory, RootStackParamList, TestSession } from '../types';
import { buildDailyTest, sampleQuestions } from '../data/questions';
import { saveSesssion, formatTime } from '../utils/storage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DailyTest' | 'Practice'>;
  route: RouteProp<RootStackParamList, 'DailyTest'> | RouteProp<RootStackParamList, 'Practice'>;
};

const FULL_TEST_TIME = 15 * 60; // 15 minutes in seconds
const PRACTICE_TIME = 10 * 60;  // 10 minutes for practice

const CAT_COLOR: Record<QuestionCategory, string> = {
  verbal: '#4A90D9',
  math: '#E67E22',
  spatial: '#2ECC71',
};

export default function TestScreen({ navigation, route }: Props) {
  const isDailyTest = route.name === 'DailyTest';
  const category = (route as RouteProp<RootStackParamList, 'Practice'>).params?.category;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(isDailyTest ? FULL_TEST_TIME : PRACTICE_TIME);
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const qs = isDailyTest ? buildDailyTest() : sampleQuestions(20, category);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
  }, [isDailyTest, category]);

  useEffect(() => {
    if (questions.length > 0) {
      Animated.timing(progressAnim, {
        toValue: (current + 1) / questions.length,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [current, questions.length]);

  const startTest = useCallback(() => {
    setStarted(true);
    setStartTime(Date.now());
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          finishTest();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const finishTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setAnswers((ans) => {
      const finalAnswers = ans;
      const elapsed = Math.round((Date.now() - startTime) / 1000);

      const breakdown: Record<QuestionCategory, { correct: number; total: number }> = {
        verbal: { correct: 0, total: 0 },
        math:   { correct: 0, total: 0 },
        spatial:{ correct: 0, total: 0 },
      };

      let score = 0;
      questions.forEach((q, i) => {
        breakdown[q.category].total++;
        if (finalAnswers[i] === q.correctIndex) {
          score++;
          breakdown[q.category].correct++;
        }
      });

      const session: TestSession = {
        date: new Date().toISOString(),
        score,
        total: questions.length,
        timeTaken: elapsed,
        categoryBreakdown: breakdown,
      };

      if (isDailyTest) saveSesssion(session);

      // Navigate to results
      setTimeout(() => {
        navigation.replace('Results', { session });
      }, 100);

      return finalAnswers;
    });
  }, [questions, startTime, isDailyTest, navigation]);

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    if (!isDailyTest) {
      // Practice mode: show answer immediately
      setShowAnswer(true);
      const newAnswers = [...answers];
      newAnswers[current] = idx;
      setAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (selected === null && !showAnswer) return;
    // In full test mode, record answer on Next
    if (isDailyTest && selected !== null) {
      const newAnswers = [...answers];
      newAnswers[current] = selected;
      setAnswers(newAnswers);
    }
    setSelected(null);
    setShowAnswer(false);

    if (current + 1 >= questions.length) {
      finishTest();
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const handleSkip = () => {
    if (isDailyTest) {
      const newAnswers = [...answers];
      newAnswers[current] = null;
      setAnswers(newAnswers);
    }
    setSelected(null);
    setShowAnswer(false);
    if (current + 1 >= questions.length) {
      finishTest();
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const confirmQuit = () => {
    Alert.alert('Quit Test', 'Are you sure you want to quit?', [
      { text: 'Continue', style: 'cancel' },
      { text: 'Quit', style: 'destructive', onPress: () => { clearInterval(timerRef.current!); navigation.goBack(); } },
    ]);
  };

  if (questions.length === 0) {
    return <SafeAreaView style={styles.safe}><Text style={styles.loading}>Loading questions…</Text></SafeAreaView>;
  }

  // Pre-start screen
  if (!started) {
    const totalQ = questions.length;
    const timeStr = isDailyTest ? '15 minutes' : '10 minutes';
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.introContainer}>
          <Text style={styles.introIcon}>{isDailyTest ? '⏱' : '🎯'}</Text>
          <Text style={styles.introTitle}>{isDailyTest ? 'Daily CCAT Test' : `${category?.charAt(0).toUpperCase()}${category?.slice(1)} Practice`}</Text>
          <Text style={styles.introDesc}>{totalQ} questions · {timeStr}</Text>
          {isDailyTest && (
            <Text style={styles.introNote}>Answer as many questions as possible. No penalty for wrong answers.</Text>
          )}
          {!isDailyTest && (
            <Text style={styles.introNote}>Practice mode: See the correct answer after each question.</Text>
          )}
          <TouchableOpacity style={styles.startBtn} onPress={startTest}>
            <Text style={styles.startBtnText}>Start Test</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
            <Text style={{ color: '#8899AA', fontSize: 14 }}>← Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const q = questions[current];
  const catColor = CAT_COLOR[q.category];
  const timeWarning = timeLeft < 120;
  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={confirmQuit}>
          <Text style={styles.quit}>✕</Text>
        </TouchableOpacity>
        <View style={styles.timerWrap}>
          <Text style={[styles.timer, timeWarning && styles.timerWarn]}>
            {formatTime(timeLeft)}
          </Text>
        </View>
        <Text style={styles.counter}>{current + 1}/{questions.length}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBg}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: catColor,
            },
          ]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Category badge */}
        <View style={[styles.catBadge, { backgroundColor: catColor + '22', borderColor: catColor }]}>
          <Text style={[styles.catBadgeText, { color: catColor }]}>
            {q.category.toUpperCase()}
          </Text>
        </View>

        {/* Question */}
        <Text style={styles.questionText}>{q.text}</Text>

        {/* Options */}
        {q.options.map((opt, idx) => {
          let optStyle = styles.optionCard;
          let optTextStyle = styles.optionText;

          if (showAnswer) {
            if (idx === q.correctIndex) {
              optStyle = { ...styles.optionCard, ...styles.optCorrect };
              optTextStyle = { ...styles.optionText, color: '#2ECC71' };
            } else if (idx === selected && selected !== q.correctIndex) {
              optStyle = { ...styles.optionCard, ...styles.optWrong };
              optTextStyle = { ...styles.optionText, color: '#E74C3C' };
            }
          } else if (idx === selected) {
            optStyle = { ...styles.optionCard, ...styles.optSelected };
            optTextStyle = { ...styles.optionText, color: '#4A90D9' };
          }

          return (
            <TouchableOpacity
              key={idx}
              style={optStyle}
              onPress={() => handleSelect(idx)}
              activeOpacity={showAnswer ? 1 : 0.7}
            >
              <View style={styles.optLetter}>
                <Text style={styles.optLetterText}>{String.fromCharCode(65 + idx)}</Text>
              </View>
              <Text style={optTextStyle}>{opt}</Text>
            </TouchableOpacity>
          );
        })}

        {/* Explanation (practice mode) */}
        {showAnswer && q.explanation && (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>Explanation</Text>
            <Text style={styles.explanationText}>{q.explanation}</Text>
          </View>
        )}

        {/* Answered count info */}
        {isDailyTest && (
          <Text style={styles.answeredInfo}>{answeredCount} answered so far</Text>
        )}
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        {!isDailyTest && (
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>
        )}
        {isDailyTest && (
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextBtn, (selected === null && !showAnswer) && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={selected === null && !showAnswer}
        >
          <Text style={styles.nextBtnText}>
            {current + 1 >= questions.length ? 'Finish' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F1923' },
  loading: { color: '#fff', textAlign: 'center', marginTop: 100, fontSize: 16 },

  introContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  introIcon: { fontSize: 60, marginBottom: 20 },
  introTitle: { fontSize: 26, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 8 },
  introDesc: { fontSize: 15, color: '#4A90D9', marginBottom: 16 },
  introNote: { fontSize: 13, color: '#8899AA', textAlign: 'center', lineHeight: 20, marginBottom: 32, maxWidth: 280 },
  startBtn: { backgroundColor: '#4A90D9', paddingVertical: 16, paddingHorizontal: 48, borderRadius: 14 },
  startBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },

  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  quit: { fontSize: 20, color: '#8899AA', padding: 4 },
  timerWrap: { flex: 1, alignItems: 'center' },
  timer: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', fontVariant: ['tabular-nums'] },
  timerWarn: { color: '#E74C3C' },
  counter: { fontSize: 14, color: '#8899AA', fontWeight: '600' },

  progressBg: { height: 4, backgroundColor: '#1C2B3A' },
  progressFill: { height: 4, borderRadius: 2 },

  content: { padding: 20, paddingBottom: 30 },
  catBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  catBadgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  questionText: { fontSize: 17, color: '#FFFFFF', lineHeight: 26, marginBottom: 24, fontWeight: '500' },

  optionCard: {
    backgroundColor: '#1C2B3A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optSelected: { borderColor: '#4A90D9', backgroundColor: '#1A2E45' },
  optCorrect: { borderColor: '#2ECC71', backgroundColor: '#0D2E1A' },
  optWrong: { borderColor: '#E74C3C', backgroundColor: '#2E0D0D' },
  optLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F1923',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optLetterText: { fontSize: 13, fontWeight: '700', color: '#8899AA' },
  optionText: { fontSize: 15, color: '#CCDDEE', flex: 1, lineHeight: 21 },

  explanationBox: {
    backgroundColor: '#1C2B3A',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4A90D9',
  },
  explanationTitle: { fontSize: 12, fontWeight: '700', color: '#4A90D9', marginBottom: 4 },
  explanationText: { fontSize: 13, color: '#8899AA', lineHeight: 19 },

  answeredInfo: { textAlign: 'center', color: '#8899AA', fontSize: 12, marginTop: 12 },

  bottomNav: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#1C2B3A',
  },
  skipBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#1C2B3A',
    borderWidth: 1,
    borderColor: '#2A3D50',
  },
  skipBtnText: { color: '#8899AA', fontSize: 15, fontWeight: '600' },
  nextBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
    shadowColor: '#4A90D9',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnDisabled: { backgroundColor: '#2A3D50', shadowOpacity: 0 },
  nextBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
