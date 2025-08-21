import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
];

export default function LanguageSelectionScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleContinue = () => {
    navigation.navigate('Onboarding' as never);
  };

  const handleBack = () => {
    navigation.navigate('Splash' as never);
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.muted, colors.background]}
      style={styles.container}
    >
      {/* Background Elements */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.circle1, { backgroundColor: colors.primary + '33' }]} />
        <View style={[styles.circle2, { backgroundColor: colors.secondary + '33' }]} />
        <View style={[styles.circle3, { backgroundColor: colors.accent + '26' }]} />
      </View>

      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.backButton, { backgroundColor: colors.primary + '1A' }]}
        >
          <Ionicons name="arrow-back" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Header */}
      <Animated.View
        style={[
          styles.titleSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
          <Ionicons name="globe-outline" size={32} color={colors.primaryForeground} />
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>Choose Your Language</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Select your preferred language to continue
        </Text>
      </Animated.View>

      {/* Language List */}
      <Animated.View
        style={[
          styles.listContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={[styles.listCard, { backgroundColor: colors.card + 'CC' }]}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {languages.map((language, index) => (
              <Animated.View
                key={language.code}
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateX: slideAnim }]
                }}
              >
                <TouchableOpacity
                  onPress={() => handleLanguageSelect(language.code)}
                  style={[
                    styles.languageItem,
                    {
                      borderColor: selectedLanguage === language.code ? colors.primary : colors.border,
                      backgroundColor: selectedLanguage === language.code ? colors.primary + '0D' : 'transparent',
                    }
                  ]}
                >
                  <Text style={styles.flag}>{language.flag}</Text>
                  <View style={styles.languageInfo}>
                    <Text style={[styles.languageName, { color: colors.foreground }]}>
                      {language.name}
                    </Text>
                    <Text style={[styles.nativeName, { color: colors.mutedForeground }]}>
                      {language.nativeName}
                    </Text>
                  </View>
                  <View style={[
                    styles.radioButton,
                    {
                      borderColor: selectedLanguage === language.code ? colors.primary : colors.mutedForeground + '4D',
                      backgroundColor: selectedLanguage === language.code ? colors.primary : 'transparent',
                    }
                  ]}>
                    {selectedLanguage === language.code && (
                      <Ionicons name="checkmark" size={16} color={colors.primaryForeground} />
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleContinue}
          style={[styles.continueButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.continueText, { color: colors.primaryForeground }]}>
            Continue
          </Text>
        </TouchableOpacity>
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
    top: height * 0.15,
    left: width * 0.08,
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  circle2: {
    position: 'absolute',
    bottom: height * 0.25,
    right: width * 0.08,
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  circle3: {
    position: 'absolute',
    top: '50%',
    left: '33%',
    marginTop: -48,
    marginLeft: -48,
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60,
    paddingBottom: theme.spacing.md,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    zIndex: 10,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    zIndex: 10,
  },
  listCard: {
    borderRadius: 24,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
    maxHeight: height * 0.5,
  },
  scrollView: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: theme.spacing.sm,
  },
  flag: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
  nativeName: {
    fontSize: theme.fontSize.sm,
    marginTop: 2,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 48,
    zIndex: 10,
  },
  continueButton: {
    paddingVertical: theme.spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  continueText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
});
