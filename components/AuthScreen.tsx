import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';

interface AuthScreenProps {
  onLogin: () => void;
  onBack: () => void;
}

type LoginMethod = 'email' | 'phone';

export function AuthScreen({ onLogin, onBack }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-muted to-background flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-8 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-8 w-40 h-40 bg-secondary/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/15 rounded-full blur-lg"></div>
      </div>

      {/* Back Button */}
      <div className="px-6 py-4 relative z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 pb-8 text-center relative z-10"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg
            width="32"
            height="32"
            viewBox="0 0 40 40"
            fill="none"
            className="text-primary-foreground"
          >
            <path
              d="M20 35C20 35 32 25 32 15C32 8.5 26.5 5 20 5C13.5 5 8 8.5 8 15C8 25 20 35 20 35Z"
              fill="currentColor"
            />
            <path
              d="M20 25C22.7614 25 25 22.7614 25 20C25 17.2386 22.7614 15 20 15C17.2386 15 15 17.2386 15 20C15 22.7614 17.2386 25 20 25Z"
              fill="#FFD54F"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          {isLogin ? 'Welcome Back!' : 'Join FarmConnect'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isLogin ? 'Sign in to continue your fresh journey' : 'Create your account to get started'}
        </p>
      </motion.div>

      {/* Form Container */}
      <div className="flex-1 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-border/50 max-w-md mx-auto"
        >
          {/* Tab Switcher */}
          <div className="flex bg-muted/30 rounded-2xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                isLogin
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                !isLogin
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Method Switcher (only for login) */}
          {isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="flex bg-muted/20 rounded-xl p-1">
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center space-x-2 ${
                    loginMethod === 'email'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
                <button
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center space-x-2 ${
                    loginMethod === 'phone'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Phone</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-2xl focus:border-primary focus:outline-none text-foreground placeholder-muted-foreground transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {/* Email Input (always shown for signup, conditionally for login) */}
            {(!isLogin || loginMethod === 'email') && (
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-2xl focus:border-primary focus:outline-none text-foreground placeholder-muted-foreground transition-colors"
                />
              </div>
            )}

            {/* Phone Input (conditionally shown) */}
            {(!isLogin || loginMethod === 'phone') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <div className="flex">
                    <div className="flex items-center bg-input border border-border border-r-0 rounded-l-2xl px-3">
                      <span className="text-foreground font-medium">+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 pl-4 pr-4 py-4 bg-input border border-border rounded-r-2xl focus:border-primary focus:outline-none text-foreground placeholder-muted-foreground transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-input border border-border rounded-2xl focus:border-primary focus:outline-none text-foreground placeholder-muted-foreground transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-2xl focus:border-primary focus:outline-none text-foreground placeholder-muted-foreground transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-2xl font-medium shadow-lg transition-all duration-200 mt-6"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>
          </form>

          {/* Terms and Privacy (for signup only) */}
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-4 text-center"
            >
              <p className="text-xs text-muted-foreground leading-relaxed">
                By creating an account, you agree to our{' '}
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8"></div>
    </div>
  );
}