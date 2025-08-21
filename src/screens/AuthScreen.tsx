import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

type LoginMethod = 'email' | 'phone';

export default function AuthScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

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
    ]).start();
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Simulate authentication
    setTimeout(() => {
      navigation.navigate('Main' as never);
    }, 1000);
  };

  const handleBack = () => {
    navigation.navigate('Onboarding' as never);
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
            <View style={styles.logoIcon}>
              <View style={[styles.logoShape, { backgroundColor: colors.primaryForeground }]} />
              <View style={[styles.logoCenter, { backgroundColor: colors.secondary }]} />
            </View>
          </View>
          <Text style={[styles.title, { color: colors.foreground }]}>
            {isLogin ? 'Welcome Back!' : 'Join FarmConnect'}
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {isLogin ? 'Sign in to continue your fresh journey' : 'Create your account to get started'}
          </Text>
        </Animated.View>

        {/* Form Container */}
        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={[styles.formCard, { backgroundColor: colors.card + 'CC' }]}>
            {/* Tab Switcher */}
            <View style={[styles.tabContainer, { backgroundColor: colors.muted + '4D' }]}>
              <TouchableOpacity
                onPress={() => setIsLogin(true)}
                style={[
                  styles.tab,
                  isLogin && { backgroundColor: colors.primary }
                ]}
              >
                <Text style={[
                  styles.tabText,
                  { color: isLogin ? colors.primaryForeground : colors.mutedForeground }
                ]}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsLogin(false)}
                style={[
                  styles.tab,
                  !isLogin && { backgroundColor: colors.primary }
                ]}
              >
                <Text style={[
                  styles.tabText,
                  { color: !isLogin ? colors.primaryForeground : colors.mutedForeground }
                ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Method Switcher (only for login) */}
            {isLogin && (
              <Animated.View
                style={[
                  styles.methodContainer,
                  { opacity: fadeAnim }
                ]}
              >
                <View style={[styles.methodTabs, { backgroundColor: colors.muted + '33' }]}>
                  <TouchableOpacity
                    onPress={() => setLoginMethod('email')}
                    style={[
                      styles.methodTab,
                      loginMethod === 'email' && { backgroundColor: colors.card }
                    ]}
                  >
                    <Ionicons name="mail-outline" size={16} color={colors.foreground} />
                    <Text style={[styles.methodText, { color: colors.foreground }]}>Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setLoginMethod('phone')}
                    style={[
                      styles.methodTab,
                      loginMethod === 'phone' && { backgroundColor: colors.card }
                    ]}
                  >
                    <Ionicons name="call-outline" size={16} color={colors.foreground} />
                    <Text style={[styles.methodText, { color: colors.foreground }]}>Phone</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}

            {/* Form Fields */}
            <View style={styles.formFields}>
              {!isLogin && (
                <Animated.View
                  style={{ opacity: fadeAnim }}
                >
                  <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color={colors.mutedForeground} style={styles.inputIcon} />
                    <TextInput
                      placeholder="Full Name"
                      value={formData.name}
                      onChangeText={(value) => handleInputChange('name', value)}
                      style={[styles.input, { color: colors.foreground, borderColor: colors.border }]}
                      placeholderTextColor={colors.mutedForeground}
                    />
                  </View>
                </Animated.View>
              )}

              {/* Email Input */}
              {(!isLogin || loginMethod === 'email') && (
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color={colors.mutedForeground} style={styles.inputIcon} />
                  <TextInput
                    placeholder="Email Address"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    style={[styles.input, { color: colors.foreground, borderColor: colors.border }]}
                    placeholderTextColor={colors.mutedForeground}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              )}

              {/* Phone Input */}
              {(!isLogin || loginMethod === 'phone') && (
                <Animated.View
                  style={{ opacity: fadeAnim }}
                >
                  <View style={styles.phoneContainer}>
                    <View style={[styles.countryCode, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                      <Text style={[styles.countryCodeText, { color: colors.foreground }]}>+91</Text>
                    </View>
                    <View style={[styles.phoneInputContainer, { flex: 1 }]}>
                      <Ionicons name="call-outline" size={20} color={colors.mutedForeground} style={styles.inputIcon} />
                      <TextInput
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChangeText={(value) => handleInputChange('phone', value)}
                        style={[styles.phoneInput, { color: colors.foreground, borderColor: colors.border }]}
                        placeholderTextColor={colors.mutedForeground}
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>
                </Animated.View>
              )}

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.mutedForeground} style={styles.inputIcon} />
                <TextInput
                  placeholder="Password"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  style={[styles.input, { color: colors.foreground, borderColor: colors.border }]}
                  placeholderTextColor={colors.mutedForeground}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={colors.mutedForeground}
                  />
                </TouchableOpacity>
              </View>

              {!isLogin && (
                <Animated.View
                  style={{ opacity: fadeAnim }}
                >
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color={colors.mutedForeground} style={styles.inputIcon} />
                    <TextInput
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChangeText={(value) => handleInputChange('confirmPassword', value)}
                      style={[styles.input, { color: colors.foreground, borderColor: colors.border }]}
                      placeholderTextColor={colors.mutedForeground}
                      secureTextEntry={!showPassword}
                    />
                  </View>
                </Animated.View>
              )}

              {isLogin && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.submitButton, { backgroundColor: colors.primary }]}
              >
                <Text style={[styles.submitText, { color: colors.primaryForeground }]}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Terms and Privacy (for signup only) */}
            {!isLogin && (
              <Animated.View
                style={[
                  styles.termsContainer,
                  { opacity: fadeAnim }
                ]}
              >
                <Text style={[styles.termsText, { color: colors.mutedForeground }]}>
                  By creating an account, you agree to our{' '}
                  <Text style={{ color: colors.primary }}>Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={{ color: colors.primary }}>Privacy Policy</Text>
                </Text>
              </Animated.View>
            )}
          </View>
        </Animated.View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
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
  logoIcon: {
    width: 32,
    height: 32,
    position: 'relative',
  },
  logoShape: {
    width: 26,
    height: 23,
    borderRadius: 13,
    position: 'absolute',
    top: 0,
    left: 3,
  },
  logoCenter: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    position: 'absolute',
    top: 10,
    left: 9.5,
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
  formContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    zIndex: 10,
  },
  formCard: {
    borderRadius: 24,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 4,
    marginBottom: theme.spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  methodContainer: {
    marginBottom: theme.spacing.lg,
  },
  methodTabs: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
  },
  methodTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: 8,
    gap: 8,
  },
  methodText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  formFields: {
    gap: theme.spacing.md,
  },
  inputContainer: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
  },
  input: {
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 16,
    fontSize: theme.fontSize.md,
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  countryCode: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  phoneInputContainer: {
    position: 'relative',
  },
  phoneInput: {
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 16,
    fontSize: theme.fontSize.md,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: theme.fontSize.sm,
  },
  submitButton: {
    paddingVertical: theme.spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    ...theme.shadows.md,
  },
  submitText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  termsContainer: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  termsText: {
    fontSize: theme.fontSize.xs,
    textAlign: 'center',
    lineHeight: 18,
  },
});
