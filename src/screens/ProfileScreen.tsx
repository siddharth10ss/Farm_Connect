import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Switch, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
}

const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+91 98765 43210',
  address: '123 Green Street, Bangalore, Karnataka 560001',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  memberSince: '2023-06-15',
  totalOrders: 24,
  totalSpent: 38540
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { colors, isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
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
  const [user] = useState<User>(mockUser);

  const menuItems = [
    {
      id: 'orders',
      title: 'My Orders',
      subtitle: `${user.totalOrders} orders completed`,
      icon: 'bag-outline',
      onPress: () => console.log('Orders pressed'),
    },
    {
      id: 'addresses',
      title: 'Delivery Addresses',
      subtitle: 'Manage your delivery locations',
      icon: 'location-outline',
      onPress: () => console.log('Addresses pressed'),
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      subtitle: 'Cards, UPI, and more',
      icon: 'card-outline',
      onPress: () => console.log('Payment pressed'),
    },
    {
      id: 'favorites',
      title: 'Favorite Products',
      subtitle: 'Your saved items',
      icon: 'heart-outline',
      onPress: () => console.log('Favorites pressed'),
    },
    {
      id: 'support',
      title: 'Help & Support',
      subtitle: 'Get help when you need it',
      icon: 'help-circle-outline',
      onPress: () => console.log('Support pressed'),
    },
    {
      id: 'about',
      title: 'About FarmConnect',
      subtitle: 'Learn more about us',
      icon: 'information-circle-outline',
      onPress: () => console.log('About pressed'),
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { backgroundColor: colors.primary + '1A' }]}
        >
          <Ionicons name="arrow-back" size={20} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Profile</Text>
        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary + '1A' }]}>
          <Ionicons name="create-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <Animated.View
          style={[
            styles.profileSection,
            {
              backgroundColor: colors.card,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.foreground }]}>
              {user.name}
            </Text>
            <Text style={[styles.userEmail, { color: colors.mutedForeground }]}>
              {user.email}
            </Text>
            <Text style={[styles.memberSince, { color: colors.mutedForeground }]}>
              Member since {formatDate(user.memberSince)}
            </Text>
          </View>
        </Animated.View>

        {/* Stats */}
        <Animated.View
          style={[
            styles.statsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {user.totalOrders}
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
              Total Orders
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              ₹{user.totalSpent.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
              Total Spent
            </Text>
          </View>
        </Animated.View>

        {/* Settings */}
        <Animated.View
          style={[
            styles.settingsSection,
            {
              backgroundColor: colors.card,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Settings
          </Text>
          
          {/* Dark Mode Toggle */}
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={20} color={colors.foreground} />
              <Text style={[styles.settingTitle, { color: colors.foreground }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.muted, true: colors.primary + '4D' }}
              thumbColor={isDark ? colors.primary : colors.mutedForeground}
            />
          </View>

          {/* Notifications Toggle */}
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={20} color={colors.foreground} />
              <Text style={[styles.settingTitle, { color: colors.foreground }]}>
                Push Notifications
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.muted, true: colors.primary + '4D' }}
              thumbColor={notifications ? colors.primary : colors.mutedForeground}
            />
          </View>
        </Animated.View>

        {/* Menu Items */}
        <Animated.View
          style={[
            styles.menuSection,
            {
              backgroundColor: colors.card,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              style={[
                styles.menuItem,
                index < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
              ]}
            >
              <View style={styles.menuLeft}>
                <View style={[styles.menuIcon, { backgroundColor: colors.primary + '1A' }]}>
                  <Ionicons name={item.icon as any} size={20} color={colors.primary} />
                </View>
                <View style={styles.menuText}>
                  <Text style={[styles.menuTitle, { color: colors.foreground }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.menuSubtitle, { color: colors.mutedForeground }]}>
                    {item.subtitle}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Logout */}
        <Animated.View
          style={[
            styles.logoutSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.destructive + '1A' }]}
            onPress={() => navigation.navigate('Auth' as never)}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.destructive} />
            <Text style={[styles.logoutText, { color: colors.destructive }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: 20,
    ...theme.shadows.sm,
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: theme.fontSize.md,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: theme.fontSize.sm,
  },
  statsSection: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderRadius: 16,
    ...theme.shadows.sm,
  },
  statValue: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
  },
  settingsSection: {
    margin: theme.spacing.lg,
    borderRadius: 20,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  menuSection: {
    margin: theme.spacing.lg,
    borderRadius: 20,
    ...theme.shadows.sm,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: theme.fontSize.sm,
  },
  logoutSection: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    borderRadius: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
});
