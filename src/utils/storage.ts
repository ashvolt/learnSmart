import AsyncStorage from '@react-native-async-storage/async-storage';
import { TestSession } from '../types';

const SESSIONS_KEY = 'ccat_sessions';
const STREAK_KEY = 'ccat_streak';
const SETTINGS_KEY = 'ccat_settings';

export async function saveSesssion(session: TestSession): Promise<void> {
  const existing = await getSessions();
  const updated = [session, ...existing].slice(0, 60); // keep last 60
  await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
  await updateStreak();
}

export async function getSessions(): Promise<TestSession[]> {
  const raw = await AsyncStorage.getItem(SESSIONS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function getStreak(): Promise<number> {
  const raw = await AsyncStorage.getItem(STREAK_KEY);
  if (!raw) return 0;
  const data = JSON.parse(raw);
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (data.lastDate === today) return data.count;
  if (data.lastDate === yesterday) return data.count;
  return 0;
}

async function updateStreak(): Promise<void> {
  const raw = await AsyncStorage.getItem(STREAK_KEY);
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let count = 1;
  if (raw) {
    const data = JSON.parse(raw);
    if (data.lastDate === today) return; // already counted today
    if (data.lastDate === yesterday) count = data.count + 1;
  }
  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify({ lastDate: today, count }));
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function scoreLabel(score: number, total: number): string {
  const pct = (score / total) * 100;
  if (pct >= 80) return 'Excellent';
  if (pct >= 60) return 'Good';
  if (pct >= 40) return 'Fair';
  return 'Needs Work';
}

// Settings management
export interface AppSettings {
  hapticsEnabled: boolean;
  soundEnabled: boolean;
  dailyReminderEnabled: boolean;
}

export async function getSettings(): Promise<AppSettings | null> {
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function updateSettings(settings: AppSettings): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
