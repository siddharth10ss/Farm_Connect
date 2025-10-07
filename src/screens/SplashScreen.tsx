import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const { colors } = useTheme();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={[colors.background, colors.muted, colors.background]}
      style={styles.container}
    >
      {/* Background Pattern */}
      <Animated.View
        style={[styles.backgroundPattern, { opacity: fadeAnim }]}
      >
        <View style={[styles.circle1, { backgroundColor: colors.primary + '33' }]} />
        <View style={[styles.circle2, { backgroundColor: colors.secondary + '33' }]} />
        <View style={[styles.circle3, { backgroundColor: colors.accent + '1A' }]} />
      </Animated.View>

      <View style={styles.content}>
        {/* Logo Animation */}
        <Animated.View
          style={[
            styles.logoContainer, 
            { backgroundColor: colors.primary, transform: [{ scale: scaleAnim }] }
          ]}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.logoIcon}>
              <View style={[styles.logoShape, { backgroundColor: colors.primaryForeground }]} />
              <View style={[styles.logoCenter, { backgroundColor: colors.secondary }]} />
            </View>
          </Animated.View>
        </Animated.View>

        {/* App Name */}
        <Animated.View
          style={[styles.titleContainer, { opacity: fadeAnim }]}
        >
          <Text style={[styles.title, { color: colors.foreground }]}>
            Farm<Text style={{ color: colors.primary }}>Connect</Text>
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Fresh from farm to your table
          </Text>
        </Animated.View>

        {/* Loading Animation */}
        <Animated.View
          style={[styles.loadingContainer, { opacity: fadeAnim }]}
        >
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[styles.loadingDot, { backgroundColor: colors.primary }]}
            />
          ))}
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle1: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.1,
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  circle2: {
    position: 'absolute',
    bottom: height * 0.25,
    right: width * 0.15,
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  circle3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -128,
    marginLeft: -128,
    width: 256,
    height: 256,
    borderRadius: 128,
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    ...theme.shadows.lg,
  },
  logoIcon: {
    width: 48,
    height: 48,
    position: 'relative',
  },
  logoShape: {
    width: 40,
    height: 35,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    left: 4,
  },
  logoCenter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 15,
    left: 14,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 32,
  },
  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});