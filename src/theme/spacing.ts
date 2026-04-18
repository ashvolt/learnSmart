// Spacing scale for consistent padding and margins

export const spacing = {
  // Base unit: 4px
  xs: 4,      // 4px
  sm: 8,      // 8px
  md: 12,     // 12px
  lg: 16,     // 16px
  xl: 20,     // 20px
  '2xl': 24,  // 24px
  '3xl': 32,  // 32px

  // Shortcuts for common usage
  containerPadding: 20,
  cardPadding: 14,
  componentGap: 12,
  buttonHeight: 52,
  optionButtonHeight: 56,
  timerContainerHeight: 60,
} as const;

// Border radius scale
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  round: 50,
} as const;

// Shadow/elevation
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;
