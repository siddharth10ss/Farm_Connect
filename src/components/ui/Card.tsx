import React from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { theme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
  animated?: boolean;
  delay?: number;
}

export default function Card({
  children,
  style,
  padding = 'lg',
  animated = false,
  delay = 0,
}: CardProps) {
  const { colors } = useTheme();

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.card,
      padding: theme.spacing[padding],
    },
    style,
  ];

  if (animated) {
    return (
      <Animated.View
        style={cardStyle}
      >
        {children}
      </Animated.View>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    ...theme.shadows.sm,
  },
});
