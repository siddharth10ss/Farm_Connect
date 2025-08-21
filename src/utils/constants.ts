export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

export const PRODUCT_CATEGORIES = [
  { id: 'vegetables', name: 'Vegetables', icon: 'leaf-outline' },
  { id: 'fruits', name: 'Fruits', icon: 'nutrition-outline' },
  { id: 'grains', name: 'Grains', icon: 'flower-outline' },
  { id: 'dairy', name: 'Dairy', icon: 'water-outline' },
  { id: 'herbs', name: 'Herbs', icon: 'medical-outline' },
  { id: 'spices', name: 'Spices', icon: 'flame-outline' },
];

export const USER_ROLES = {
  BUYER: 'buyer',
  FARMER: 'farmer',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_METHODS = {
  UPI: 'upi',
  CARD: 'card',
  WALLET: 'wallet',
  COD: 'cod',
} as const;

export const NOTIFICATION_TYPES = {
  ORDER_UPDATE: 'order_update',
  NEW_MESSAGE: 'new_message',
  PRICE_DROP: 'price_drop',
  NEW_PRODUCT: 'new_product',
  PROMOTION: 'promotion',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/:id',
    SEARCH: '/products/search',
    BY_CATEGORY: '/products/category/:category',
  },
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: '/orders/:id',
    UPDATE: '/orders/:id',
  },
  CHAT: {
    CONVERSATIONS: '/chat/conversations',
    MESSAGES: '/chat/conversations/:id/messages',
    SEND: '/chat/conversations/:id/messages',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/profile',
    ADDRESSES: '/user/addresses',
  },
} as const;

export const SCREEN_NAMES = {
  SPLASH: 'Splash',
  LANGUAGE_SELECTION: 'LanguageSelection',
  ONBOARDING: 'Onboarding',
  AUTH: 'Auth',
  MAIN: 'Main',
  HOME: 'Home',
  PRODUCT_DETAIL: 'ProductDetail',
  CART: 'Cart',
  PROFILE: 'Profile',
  CHAT: 'Chat',
  ORDER_SUMMARY: 'OrderSummary',
} as const;
