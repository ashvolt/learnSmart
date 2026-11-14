import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import OptionButton, { OptionState } from './OptionButton';

interface AnimatedOptionButtonProps {
  text: string;
  index: number;
  onPress: (index: number) => void;
  state?: OptionState;
  disabled?: boolean;
  showFeedback?: boolean;
  hapticsEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function AnimatedOptionButton({
  text,
  index,
  onPress,
  state = 'default',
  disabled = false,
  showFeedback = false,
  hapticsEnabled = true,
  style,
}: AnimatedOptionButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevState = useRef<OptionState>(state);

  // Result haptics belong to the state transition, not to the press: the option
  // is marked correct/wrong a render after the tap that caused it.
  useEffect(() => {
    const changed = prevState.current !== state;
    prevState.current = state;
    if (!changed || !hapticsEnabled) return;

    if (state === 'correct') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    } else if (state === 'wrong') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  }, [state, hapticsEnabled]);

  const handlePress = (pressedIndex: number) => {
    // Fire and forget: an unavailable haptics engine must not block answering.
    if (hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }

    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    onPress(pressedIndex);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <OptionButton
        text={text}
        index={index}
        onPress={handlePress}
        state={state}
        disabled={disabled}
        showFeedback={showFeedback}
        style={style}
      />
    </Animated.View>
  );
}
