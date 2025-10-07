import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../utils/supabase';
import { Session } from '@supabase/supabase-js';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import OnboardingScreens from '../screens/OnboardingScreens';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';

import EditProfileScreen from '../screens/EditProfileScreen';

import AddProductScreen from '../screens/AddProductScreen';

export type RootStackParamList = {
  Splash: undefined;
  Language: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
  ProductDetail: {
    product: any;
  };
  Chat: {
    farmer: any;
    product?: any;
  };
  OrderSummary: {
    items: any[];
    total: number;
  };
  EditProfile: {
    profile: any;
    user: any;
  };
  AddProduct: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'bag' : 'bag-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { colors } = useTheme();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        key={session ? 'authed' : 'unauthed'}
        initialRouteName={loading ? 'Splash' : (session ? 'Main' : 'Language')}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        {loading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : session && session.user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Language" component={LanguageSelectionScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreens} />
            <Stack.Screen name="Auth" component={AuthScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}