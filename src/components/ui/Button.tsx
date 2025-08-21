import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { theme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      ...styles.button,
      ...styles[`${size}Button`],
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.muted : colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.muted : colors.secondary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? colors.muted : colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = {
      ...styles.text,
      ...styles[`${size}Text`],
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          color: disabled ? colors.mutedForeground : colors.primaryForeground,
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: disabled ? colors.mutedForeground : colors.secondaryForeground,
        };
      case 'outline':
        return {
          ...baseStyle,
          color: disabled ? colors.mutedForeground : colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          color: disabled ? colors.mutedForeground : colors.foreground,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <Animated.View
      style={{
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[getButtonStyle(), style]}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.primaryForeground}
          />
        ) : (
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  smButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 32,
  },
  mdButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  lgButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 52,
  },
  text: {
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
  },
  smText: {
    fontSize: theme.fontSize.sm,
  },
  mdText: {
    fontSize: theme.fontSize.md,
  },
  lgText: {
    fontSize: theme.fontSize.lg,
  },
});
