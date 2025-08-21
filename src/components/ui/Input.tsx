import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { theme } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: any;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  style,
  secureTextEntry,
  ...props
}: InputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleRightIconPress = () => {
    if (secureTextEntry) {
      setIsSecure(!isSecure);
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const getRightIcon = () => {
    if (secureTextEntry) {
      return isSecure ? 'eye-off-outline' : 'eye-outline';
    }
    return rightIcon;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.foreground }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? colors.destructive : isFocused ? colors.primary : colors.border,
            backgroundColor: colors.inputBackground,
          }
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon as any}
            size={20}
            color={colors.mutedForeground}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          {...props}
          style={[
            styles.input,
            { color: colors.foreground },
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
            style,
          ]}
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry={isSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {(rightIcon || secureTextEntry) && (
          <TouchableOpacity
            onPress={handleRightIconPress}
            style={styles.rightIcon}
          >
            <Ionicons
              name={getRightIcon() as any}
              size={20}
              color={colors.mutedForeground}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.destructive }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: theme.fontSize.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  leftIcon: {
    marginLeft: theme.spacing.md,
  },
  rightIcon: {
    padding: theme.spacing.md,
  },
  error: {
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
  },
});
