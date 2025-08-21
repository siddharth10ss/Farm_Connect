import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Globe, ArrowLeft } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageSelectionScreenProps {
  onLanguageSelect: (languageCode: string) => void;
  onBack: () => void;
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

export function LanguageSelectionScreen({ onLanguageSelect, onBack }: LanguageSelectionScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleContinue = () => {
    onLanguageSelect(selectedLanguage);
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
          <Globe className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Choose Your Language</h1>
        <p className="text-muted-foreground">Select your preferred language to continue</p>
      </motion.div>

      {/* Language List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 px-6 relative z-10"
      >
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-border/50 max-w-md mx-auto">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {languages.map((language, index) => (
              <motion.button
                key={language.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleLanguageSelect(language.code)}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center space-x-4 ${
                  selectedLanguage === language.code
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/40 hover:bg-muted/30'
                }`}
              >
                <span className="text-2xl">{language.flag}</span>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-foreground">{language.name}</h3>
                  <p className="text-sm text-muted-foreground">{language.nativeName}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedLanguage === language.code
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground/30'
                }`}>
                  {selectedLanguage === language.code && (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Continue Button */}
      <div className="px-6 pb-12 relative z-10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          className="w-full py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-2xl font-medium shadow-lg transition-all duration-200 max-w-md mx-auto block"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}