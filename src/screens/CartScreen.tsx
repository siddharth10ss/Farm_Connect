import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, MainTabParamList } from '../navigation/AppNavigator';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { theme } from '../theme';

interface CartItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  farmer: string;
  location: string;
}


export default function CartScreen() {
  const navigation = useNavigation<
    CompositeNavigationProp<
      BottomTabNavigationProp<MainTabParamList, 'Cart'>,
      StackNavigationProp<RootStackParamList>
    >
  >();
  const { colors } = useTheme();
  const { cartItems, updateCartItemQuantity, removeFromCart, getCartTotal } = useCart();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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

  const updateQuantity = (itemId: string, newQuantity: number) => {
    updateCartItemQuantity(itemId, newQuantity);
  };

  const removeItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const calculateTotal = () => {
    return getCartTotal();
  };

  const handleCheckout = () => {
    const total = calculateTotal();
    navigation.navigate('OrderSummary', {
      items: cartItems,
      total: total,
    });
  };

  const renderCartItem = ({ item, index }: { item: CartItem; index: number }) => (
    <Animated.View
      style={[
        styles.cartItem,
        {
          backgroundColor: colors.card,
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }]
        }
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: colors.foreground }]} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.farmerInfo}>
          <Ionicons name="person-outline" size={12} color={colors.mutedForeground} />
          <Text style={[styles.farmerName, { color: colors.mutedForeground }]} numberOfLines={1}>
            {item.farmer}
          </Text>
        </View>
        <Text style={[styles.itemPrice, { color: colors.primary }]}>
          ₹{item.price}/{item.unit}
        </Text>
      </View>

      <View style={styles.quantitySection}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            style={[styles.quantityButton, { backgroundColor: colors.primary + '1A' }]}
          >
            <Ionicons name="remove" size={16} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.quantityText, { color: colors.foreground }]}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={[styles.quantityButton, { backgroundColor: colors.primary + '1A' }]}
          >
            <Ionicons name="add" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          onPress={() => removeItem(item.id)}
          style={[styles.removeButton, { backgroundColor: colors.destructive + '1A' }]}
        >
          <Ionicons name="trash-outline" size={16} color={colors.destructive} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  if (cartItems.length === 0) {
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
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Shopping Cart</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Empty Cart */}
        <View style={styles.emptyCart}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ scale: fadeAnim }]
            }}
          >
            <View style={[styles.emptyIcon, { backgroundColor: colors.primary + '1A' }]}>
              <Ionicons name="bag-outline" size={48} color={colors.mutedForeground} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              Your cart is empty
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.mutedForeground }]}>
              Add some fresh produce to get started
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={[styles.shopButton, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.shopButtonText, { color: colors.primaryForeground }]}>
                Start Shopping
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>
          Shopping Cart ({cartItems.length})
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Cart Items */}
      <View style={styles.cartContent}>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cartList}
        />
      </View>

      {/* Bottom Summary */}
      <Animated.View
        style={[
          styles.bottomSection,
          {
            backgroundColor: colors.card,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Order Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
              Subtotal
            </Text>
            <Text style={[styles.summaryValue, { color: colors.foreground }]}>
              ₹{calculateTotal().toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
              Delivery Fee
            </Text>
            <Text style={[styles.summaryValue, { color: colors.foreground }]}>
              ₹50
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={[styles.totalLabel, { color: colors.foreground }]}>
              Total
            </Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>
              ₹{(calculateTotal() + 50).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          onPress={handleCheckout}
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.checkoutText, { color: colors.primaryForeground }]}>
            Proceed to Checkout
          </Text>
          <Ionicons name="arrow-forward" size={20} color={colors.primaryForeground} />
        </TouchableOpacity>
      </Animated.View>
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
  placeholder: {
    width: 40,
  },
  cartContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  cartList: {
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: 16,
    ...theme.shadows.sm,
    gap: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    marginBottom: 4,
  },
  farmerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  farmerName: {
    fontSize: theme.fontSize.sm,
    flex: 1,
  },
  itemPrice: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
  },
  quantitySection: {
    alignItems: 'center',
    gap: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
  },
  summarySection: {
    marginBottom: theme.spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: theme.fontSize.md,
  },
  summaryValue: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  totalRow: {
    borderTopWidth: 1,
    paddingTop: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  totalLabel: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
  totalValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    borderRadius: 16,
    gap: 8,
    ...theme.shadows.md,
  },
  checkoutText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: theme.fontSize.md,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  shopButton: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: 16,
    ...theme.shadows.md,
  },
  shopButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
});
