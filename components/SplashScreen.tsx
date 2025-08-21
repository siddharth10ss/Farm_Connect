import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-secondary/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
        >
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            width="48"
            height="48"
            viewBox="0 0 40 40"
            fill="none"
            className="text-primary-foreground"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
              d="M20 35C20 35 32 25 32 15C32 8.5 26.5 5 20 5C13.5 5 8 8.5 8 15C8 25 20 35 20 35Z"
              fill="currentColor"
            />
            <motion.path
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
              d="M20 25C22.7614 25 25 22.7614 25 20C25 17.2386 22.7614 15 20 15C17.2386 15 15 17.2386 15 20C15 22.7614 17.2386 25 20 25Z"
              fill="#FFD54F"
            />
          </motion.svg>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-4"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Farm<span className="text-primary">Connect</span>
          </h1>
          <p className="text-muted-foreground">Fresh from farm to your table</p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex items-center justify-center space-x-2 mt-8"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="w-3 h-3 bg-primary rounded-full"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-3 h-3 bg-primary rounded-full"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-3 h-3 bg-primary rounded-full"
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
}