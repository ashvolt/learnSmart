import React, { useRef, useEffect } from 'react';
import { Dimensions, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

interface ConfettiCelebrationProps {
  trigger?: boolean;
  count?: number;
  /** How long the confetti takes to fall, in milliseconds. */
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

export default function ConfettiCelebration({
  trigger = false,
  count = 200,
  duration = 3000,
  style,
}: ConfettiCelebrationProps) {
  const cannonRef = useRef<ConfettiCannon>(null);

  useEffect(() => {
    if (trigger && cannonRef.current) {
      cannonRef.current.start();
    }
  }, [trigger]);

  return (
    // pointerEvents none: the overlay spans the screen and would otherwise
    // swallow taps meant for the content underneath it.
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, style]}>
      <ConfettiCannon
        ref={cannonRef}
        count={count}
        origin={{ x: Dimensions.get('window').width / 2, y: 0 }}
        explosionSpeed={350}
        fallSpeed={duration}
        autoStart={false}
        fadeOut
      />
    </View>
  );
}
