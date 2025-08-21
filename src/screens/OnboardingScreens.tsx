import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: "Connect with Local Farmers",
    description: "Discover fresh, organic produce directly from farmers in your area. Support local agriculture while getting the best quality ingredients.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop",
    illustration: "🌾"
  },
  {
    id: 2,
    title: "Fresh & Organic Produce",
    description: "Get access to pesticide-free, naturally grown fruits and vegetables. Know exactly where your food comes from and how it's grown.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
    illustration: "🥬"
  },
  {
    id: 3,
    title: "Direct Farm to Table",
    description: "Skip the middleman and buy directly from farmers. Enjoy better prices, fresher produce, and support sustainable farming practices.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop",
    illustration: "🚚"
  }
];

export default function OnboardingScreens() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [currentScreen, setCurrentScreen] = useState(0);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentScreen]);

  const handleNext = () => {
    if (currentScreen < 2) {
      setCurrentScreen(currentScreen + 1);
    } else {
      navigation.navigate('Auth' as never);
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    } else {
      navigation.navigate('Language' as never);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Auth' as never);
  };

  const currentData = onboardingData[currentScreen];

  return (
    <LinearGradient
      colors={[colors.background, colors.muted]}
      style={styles.container}
    >
      {/* Background Elements */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.circle1, { backgroundColor: colors.primary + '4D' }]} />
        <View style={[styles.circle2, { backgroundColor: colors.secondary + '4D' }]} />
        <View style={[styles.circle3, { backgroundColor: colors.accent + '33' }]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={handleBack}
            style={[styles.backButton, { backgroundColor: colors.primary + '1A' }]}
          >
            <Ionicons name="arrow-back" size={20} color={colors.primary} />
          </TouchableOpacity>
          
          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            {onboardingData.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.progressDot,
                  {
                    width: index === currentScreen ? 32 : 8,
                    backgroundColor: index === currentScreen ? colors.primary : colors.mutedForeground + '4D'
                  }
                ]}
              />
            ))}
          </View>
        </View>
        
        <TouchableOpacity onPress={handleSkip}>
          <Text style={[styles.skipText, { color: colors.mutedForeground }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Animated.View
          key={currentScreen}
          style={[
            styles.slideContent,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          {/* Illustration */}
          <Animated.View
            style={[
              styles.imageContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <View style={[styles.imageCard, { backgroundColor: colors.card + 'CC' }]}>
              <Image
                source={{ uri: currentData.image }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Animated.View
              style={[
                styles.illustrationBadge,
                {
                  backgroundColor: colors.secondary,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <Text style={styles.illustration}>{currentData.illustration}</Text>
            </Animated.View>
          </Animated.View>

          {/* Text Content */}
          <Animated.View
            style={[
              styles.textContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={[styles.title, { color: colors.foreground }]}>
              {currentData.title}
            </Text>
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              {currentData.description}
            </Text>
          </Animated.View>
        </Animated.View>
      </View>

      {/* Bottom Section */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.nextButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.nextText, { color: colors.primaryForeground }]}>
            {currentScreen === 2 ? 'Get Started' : 'Continue'}
          </Text>
        </TouchableOpacity>

        {/* Bottom Navigation Dots */}
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentScreen ? colors.primary : colors.mutedForeground + '4D',
                }
              ]}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
  },
  circle1: {
    position: 'absolute',
    top: height * 0.2,
    right: width * 0.08,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  circle2: {
    position: 'absolute',
    bottom: height * 0.3,
    left: width * 0.12,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  circle3: {
    position: 'absolute',
    top: '50%',
    right: '25%',
    marginTop: -48,
    marginRight: -48,
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60,
    paddingBottom: theme.spacing.lg,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
  },
  skipText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    zIndex: 10,
  },
  slideContent: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.32,
    marginBottom: theme.spacing.xl,
    position: 'relative',
  },
  imageCard: {
    flex: 1,
    borderRadius: 24,
    padding: 16,
    ...theme.shadows.md,
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
  illustrationBadge: {
    position: 'absolute',
    bottom: -16,
    right: -16,
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  illustration: {
    fontSize: 24,
  },
  textContent: {
    alignItems: 'center',
    maxWidth: width * 0.85,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    lineHeight: 28,
  },
  description: {
    fontSize: theme.fontSize.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 48,
    zIndex: 10,
  },
  nextButton: {
    paddingVertical: theme.spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  nextText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
