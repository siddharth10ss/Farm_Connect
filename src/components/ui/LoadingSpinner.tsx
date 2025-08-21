import React from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  overlay?: boolean;
}

export default function LoadingSpinner({
  size = 'large',
  color,
  overlay = false,
}: LoadingSpinnerProps) {
  const { colors } = useTheme();

  const spinner = (
    <Animated.View>
      <ActivityIndicator
        size={size}
        color={color || colors.primary}
      />
    </Animated.View>
  );

  if (overlay) {
    return (
      <View style={[styles.overlay, { backgroundColor: colors.background + 'CC' }]}>
        {spinner}
      </View>
    );
  }

  return <View style={styles.container}>{spinner}</View>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
