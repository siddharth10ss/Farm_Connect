import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OnboardingScreensProps {
  currentScreen: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

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

export function OnboardingScreens({ currentScreen, onNext, onBack, onSkip }: OnboardingScreensProps) {
  const currentData = onboardingData[currentScreen];

  return (
    <div className="h-screen bg-gradient-to-b from-background to-muted flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 right-8 w-20 h-20 bg-primary/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-12 w-16 h-16 bg-secondary/30 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-8 relative z-10">
        {/* Back Button or Progress Indicators */}
        <div className="flex items-center space-x-2">
          {currentScreen === 0 ? (
            // Back button to language selection
            <button
              onClick={onBack}
              className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors mr-2"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          ) : (
            // Back button to previous onboarding screen
            <button
              onClick={onBack}
              className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors mr-2"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          )}
          
          {/* Progress Indicators */}
          {onboardingData.map((_, index) => (
            <motion.div
              key={index}
              layoutId={`indicator-${index}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentScreen 
                  ? 'bg-primary w-8' 
                  : 'bg-muted-foreground/30 w-2'
              }`}
            />
          ))}
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onSkip}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 relative z-10">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          {/* Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-80 h-64 mx-auto mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl backdrop-blur-sm border border-border/50"></div>
            <div className="absolute inset-4 rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={currentData.image}
                alt={currentData.title}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center text-2xl shadow-lg"
            >
              {currentData.illustration}
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4 leading-tight">
              {currentData.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
              {currentData.description}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 pb-12 relative z-10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="w-full py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-2xl font-medium shadow-lg transition-all duration-200"
        >
          {currentScreen === 2 ? 'Get Started' : 'Continue'}
        </motion.button>

        {/* Bottom Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {onboardingData.map((_, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                // You could add logic here to jump to specific screens
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentScreen 
                  ? 'bg-primary shadow-lg' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}