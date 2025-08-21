# FarmConnect Mobile (Expo + React Native)

FarmConnect connects farmers with buyers. This is the Expo React Native app, converted from the original web app. It features browsing products, cart and checkout, chat with farmers, profiles, and multi-language support.

## Features
- Product browsing by categories
- Cart with persistent storage (AsyncStorage)
- Order summary and checkout flow
- Profiles (farmer/buyer)
- Chat with farmers
- Theme (light/dark) via context
- Language selection and onboarding

## Tech Stack
- React Native + Expo SDK 51
- TypeScript
- React Navigation (stack + bottom tabs)
- AsyncStorage for cart persistence
- Animated API for animations

## Project Structure
```
.
├─ App.tsx
├─ src/
│  ├─ navigation/
│  │  └─ AppNavigator.tsx
│  ├─ contexts/
│  │  ├─ ThemeContext.tsx
│  │  └─ CartContext.tsx
│  ├─ screens/
│  │  ├─ SplashScreen.tsx
│  │  ├─ LanguageSelectionScreen.tsx
│  │  ├─ OnboardingScreens.tsx
│  │  ├─ AuthScreen.tsx
│  │  ├─ HomeScreen.tsx
│  │  ├─ ProductDetailScreen.tsx
│  │  ├─ CartScreen.tsx
│  │  ├─ ProfileScreen.tsx
│  │  ├─ ChatScreen.tsx
│  │  └─ OrderSummaryScreen.tsx
│  └─ hooks/ & components/
├─ styles/globals.css (if used for reference)
├─ package.json
├─ tsconfig.json
└─ .gitignore
```

## Getting Started
1. Install dependencies
```bash
npm install
```

2. Start the dev server
```bash
npm start
```
Use Expo Go on your device or an emulator to open the project.

## Scripts
- `npm start` - start Metro bundler
- `npm run android` - open on Android
- `npm run ios` - open on iOS (on macOS)
- `npm run web` - web preview

## Environment
- No secrets are committed. Add any keys to a local `.env` (ignored by `.gitignore`).

## Notes
- Animations use React Native Animated API.
- Cart state lives in `src/contexts/CartContext.tsx` and is accessible via `useCart()`.
- Navigation params are typed in `src/navigation/AppNavigator.tsx`.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
