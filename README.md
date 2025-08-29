# FarmConnect Mobile 🌾

A modern mobile marketplace connecting farmers directly with consumers, eliminating middlemen and ensuring fresh, organic produce at fair prices.

## 📱 Overview

FarmConnect Mobile is a React Native application built with Expo that creates a seamless bridge between local farmers and consumers. The app features a clean, intuitive interface for browsing fresh produce, direct farmer communication, and secure ordering capabilities.

## ✨ Features

### 🛒 **Shopping Experience**
- **Product Discovery**: Browse fresh produce with high-quality images and detailed descriptions
- **Smart Filtering**: Filter by category, location, price range, and availability
- **Search Functionality**: Find specific products or farmers quickly
- **Product Details**: Comprehensive information including nutrition facts, farming methods, and farmer profiles

### 👨‍🌾 **Farmer Connection**
- **Direct Communication**: Chat with farmers for questions and custom orders
- **Farmer Profiles**: Detailed information about farming practices, certifications, and ratings
- **Location-Based**: Find local farmers in your area
- **Real-time Updates**: Get notified about new products and availability

### 🛍️ **Order Management**
- **Shopping Cart**: Easy-to-use cart with quantity management
- **Secure Checkout**: Multiple payment options with order tracking
- **Order History**: Track past orders and reorder favorites
- **Delivery/Pickup**: Choose between delivery or farm pickup

### 🎨 **User Experience**
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Multi-language Support**: Available in multiple languages
- **Responsive Design**: Optimized for all screen sizes
- **Offline Capability**: Browse previously viewed products offline

## 🚀 Tech Stack

### **Frontend**
- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for smooth navigation
- **React Native Reanimated** for fluid animations

### **UI/UX**
- **NativeWind** for styling
- **Custom Design System** with consistent components
- **Vector Icons** from Expo
- **Gesture Handler** for intuitive interactions

### **State Management**
- **React Context** for theme and cart management
- **Async Storage** for offline data persistence

### **Development Tools**
- **Metro Bundler** for fast development
- **TypeScript** for type checking
- **ESLint** for code quality

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/siddharth10ss/Farm_Connect.git
   cd Farm_Connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on your device**
   - Scan the QR code with the Expo Go app
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

## 🏗️ Project Structure

```
FarmConnect-Mobile/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── navigation/         # Navigation configuration
│   ├── screens/           # Screen components
│   ├── theme/             # Design tokens and themes
│   └── utils/             # Utility functions
├── components/            # Additional components
├── guidelines/          # Development guidelines
├── styles/              # Global styles
├── app.json             # Expo configuration
├── App.tsx              # Main app component
└── package.json         # Dependencies and scripts
```

## 🎯 Key Screens

1. **Splash Screen** - App loading and initialization
2. **Language Selection** - Multi-language onboarding
3. **Onboarding** - Feature introduction
4. **Authentication** - Login and registration
5. **Home Screen** - Product browsing and search
6. **Product Detail** - Detailed product information
7. **Cart Screen** - Shopping cart management
8. **Profile Screen** - User account management
9. **Chat Screen** - Farmer communication
10. **Order Summary** - Checkout and order review

## 🌟 Getting Started

### For Developers
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### For Farmers
1. Download the app from app stores
2. Create a farmer profile with verification
3. List your products with photos and descriptions
4. Set prices and availability
5. Connect with customers directly

### For Consumers
1. Download the app from app stores
2. Browse local farmers and fresh produce
3. Add items to cart and checkout securely
4. Track your orders
5. Rate and review farmers

## 🔧 Development

### Available Scripts
- `npm start` - Start the development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web browser

### Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
```

## 🧪 Testing
- Unit tests: `npm test`
- E2E tests: `npm run test:e2e`
- Linting: `npm run lint`

## 📱 Deployment

### Expo Go (Development)
```bash
expo publish
```

### Production Build
```bash
eas build
```

### App Store Submission
```bash
eas submit
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Ways to Contribute
- 🐛 Report bugs
- 💡 Suggest features
- 📖 Improve documentation
- 🔧 Submit pull requests
- 🌍 Add translations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Expo team** for the amazing development platform
- **React Native community** for continuous support
- **Farmers** who inspire this project
- **Open source contributors** who made this possible

## 📞 Support

- **Documentation**: [Wiki](https://github.com/siddharth10ss/Farm_Connect/wiki)
- **Issues**: [GitHub Issues](https://github.com/siddharth10ss/Farm_Connect/issues)
- **Discussions**: [GitHub Discussions](https://github.com/siddharth10ss/Farm_Connect/discussions)
- **Email**: support@farmconnect.com

## 🔗 Links

- **Website**: [https://farmconnect.com](https://farmconnect.com)
- **Privacy Policy**: [Privacy Policy](PRIVACY.md)
- **Terms of Service**: [Terms](TERMS.md)

---

<div align="center">
  <p>Made with ❤️ for farmers and consumers</p>
  <p><strong>FarmConnect Mobile</strong> - Connecting farms to families</p>
</div>
