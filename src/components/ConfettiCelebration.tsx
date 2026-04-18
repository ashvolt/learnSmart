import React, { useRef, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

interface ConfettiCelebrationProps {
  trigger?: boolean;
  count?: number;
  duration?: number;
  style?: ViewStyle;
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
    <View style={[{ position: 'absolute', top: 0, left: 0, right: 0 }, style]}>
      <ConfettiCannon
        ref={cannonRef}
        count={count}
        origin={{ x: '50%', y: 0 }}
        explosionSpeed={350}
        fallSpeed={3000}
        autoStart={false}
      />
    </View>
  );
}
