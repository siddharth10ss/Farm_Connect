import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { theme } from '../../theme';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline';
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
}: BadgeProps) {
  const { colors } = useTheme();

  const getBadgeStyle = () => {
    const baseStyle = {
      ...styles.badge,
      ...styles[`${size}Badge`],
    };

    switch (variant) {
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: colors.primary + '1A',
        };
      case 'warning':
        return {
          ...baseStyle,
          backgroundColor: '#FEF3C7',
        };
      case 'destructive':
        return {
          ...baseStyle,
          backgroundColor: colors.destructive + '1A',
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: colors.muted,
        };
    }
  };

  const getTextStyle = () => {
    const baseStyle = {
      ...styles.text,
      ...styles[`${size}Text`],
    };

    switch (variant) {
      case 'success':
        return {
          ...baseStyle,
          color: colors.primary,
        };
      case 'warning':
        return {
          ...baseStyle,
          color: '#92400E',
        };
      case 'destructive':
        return {
          ...baseStyle,
          color: colors.destructive,
        };
      case 'outline':
        return {
          ...baseStyle,
          color: colors.foreground,
        };
      default:
        return {
          ...baseStyle,
          color: colors.mutedForeground,
        };
    }
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      <Text style={[getTextStyle(), textStyle]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    minHeight: 18,
  },
  mdBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    minHeight: 22,
  },
  text: {
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
  },
  smText: {
    fontSize: theme.fontSize.xs,
  },
  mdText: {
    fontSize: theme.fontSize.sm,
  },
});
