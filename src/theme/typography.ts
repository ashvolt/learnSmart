// Typography scale for consistent text styling

export const typography = {
  // Font families (using system fonts for best performance)
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },

  // Font sizes
  fontSize: {
    xs: 12,      // Helper text, badges
    sm: 14,      // Body text, captions
    base: 16,    // Default body text
    lg: 18,      // Subheadings
    xl: 20,      // Section headings
    '2xl': 24,   // Page titles
    '3xl': 28,   // Major headings
    '4xl': 32,   // Score display
  },

  // Font weights
  fontWeight: {
    400: '400',  // Regular
    500: '500',  // Medium
    600: '600',  // SemiBold
    700: '700',  // Bold
  },

  // Line height multipliers. React Native's `lineHeight` style is an absolute
  // pixel value, so multiply these by a fontSize before using them in a style.
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Predefined text styles (for easy reuse)
  styles: {
    // Headings
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 38,
      color: '#FFFFFF',
    },
    h2: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 34,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 31,
      color: '#FFFFFF',
    },

    // Body
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      color: '#CCDDEE',
    },
    bodyBold: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      color: '#CCDDEE',
    },
    bodySm: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 21,
      color: '#CCDDEE',
    },

    // Captions & Helpers
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 17,
      color: '#8899AA',
    },
    captionBold: {
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 17,
      color: '#8899AA',
    },

    // Buttons
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22,
      color: '#FFFFFF',
    },
    buttonSm: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
      color: '#FFFFFF',
    },

    // Scores & Numbers
    number: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 38,
      color: '#4A90D9',
    },
  },
} as const;
