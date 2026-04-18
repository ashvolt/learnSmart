// Centralized color theme for CCAT Trainer app

export const colors = {
  // Base colors - dark theme
  background: '#0F1923',
  card: '#1C2B3A',
  border: '#2A3D50',

  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#CCDDEE',
  textMuted: '#8899AA',
  textHint: '#6B7D8F',

  // Semantic colors - categories
  verbal: '#4A90D9',    // Blue
  math: '#E67E22',      // Orange
  spatial: '#2ECC71',   // Green

  // Status colors
  success: '#2ECC71',
  warning: '#F1C40F',
  error: '#E74C3C',
  info: '#4A90D9',

  // Special states
  correct: '#2ECC71',
  wrong: '#E74C3C',
  selected: '#4A90D9',
  disabled: '#5A6D7A',

  // Overlay & transparency
  overlay: 'rgba(15, 25, 35, 0.8)',
  overlayLight: 'rgba(15, 25, 35, 0.5)',
} as const;

// Color states for answer options
export const optionStates = {
  default: {
    border: 'transparent',
    background: colors.card,
    text: colors.textSecondary,
  },
  selected: {
    border: colors.verbal,
    background: '#1A2E45',
    text: colors.verbal,
  },
  correct: {
    border: colors.success,
    background: '#0D2E1A',
    text: colors.success,
  },
  wrong: {
    border: colors.error,
    background: '#2E0D0D',
    text: colors.error,
  },
} as const;

// Theme for category-specific styling
export const categoryColors = {
  verbal: colors.verbal,
  math: colors.math,
  spatial: colors.spatial,
} as const;

// Status colors for score display
export function getScoreColor(percentage: number): string {
  if (percentage >= 80) return colors.success;
  if (percentage >= 60) return colors.warning;
  if (percentage >= 40) return colors.math;
  return colors.error;
}
