import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Animated, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
  image: string;
  farmer: string;
}

const paymentMethods = [
  { id: 'upi', name: 'UPI Payment', icon: 'phone-portrait-outline', description: 'Pay with any UPI app' },
  { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline', description: 'Visa, Mastercard, RuPay' },
  { id: 'wallet', name: 'Digital Wallet', icon: 'wallet-outline', description: 'Paytm, PhonePe, Google Pay' },
  { id: 'cod', name: 'Cash on Delivery', icon: 'cash-outline', description: 'Pay when you receive' },
];

export default function OrderSummaryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const [selectedPayment, setSelectedPayment] = useState('upi');
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

  // @ts-ignore - Route params typing
  const { items, total } = route.params;

  const deliveryFee = 50;
  const finalTotal = total + deliveryFee;

  const handleConfirmOrder = () => {
    // Simulate order confirmation
    console.log('Order confirmed with payment method:', selectedPayment);
    navigation.navigate('Main' as never);
  };

  const renderOrderItem = ({ item, index }: { item: OrderItem; index: number }) => (
    <Animated.View
      style={[
        styles.orderItem,
        {
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
        <Text style={[styles.farmerName, { color: colors.mutedForeground }]}>
          by {item.farmer}
        </Text>
        <Text style={[styles.itemPrice, { color: colors.primary }]}>
          ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
        </Text>
      </View>
    </Animated.View>
  );

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
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Order Summary</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Order Items */}
        <Animated.View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Order Items ({items.length})
          </Text>
          <FlatList
            data={items}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.itemsList}
          />
        </Animated.View>

        {/* Delivery Address */}
        <Animated.View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Delivery Address
            </Text>
            <TouchableOpacity>
              <Text style={[styles.changeText, { color: colors.primary }]}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.addressCard, { backgroundColor: colors.muted }]}>
            <Ionicons name="location-outline" size={20} color={colors.primary} />
            <View style={styles.addressDetails}>
              <Text style={[styles.addressTitle, { color: colors.foreground }]}>Home</Text>
              <Text style={[styles.addressText, { color: colors.mutedForeground }]}>
                123 Green Street, Bangalore, Karnataka 560001
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Payment Method */}
        <Animated.View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Payment Method
          </Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              onPress={() => setSelectedPayment(method.id)}
              style={[
                styles.paymentMethod,
                {
                  borderColor: selectedPayment === method.id ? colors.primary : colors.border,
                  backgroundColor: selectedPayment === method.id ? colors.primary + '0D' : 'transparent',
                }
              ]}
            >
              <View style={styles.paymentLeft}>
                <View style={[styles.paymentIcon, { backgroundColor: colors.primary + '1A' }]}>
                  <Ionicons name={method.icon as any} size={20} color={colors.primary} />
                </View>
                <View style={styles.paymentDetails}>
                  <Text style={[styles.paymentName, { color: colors.foreground }]}>
                    {method.name}
                  </Text>
                  <Text style={[styles.paymentDescription, { color: colors.mutedForeground }]}>
                    {method.description}
                  </Text>
                </View>
              </View>
              <View style={[
                styles.radioButton,
                {
                  borderColor: selectedPayment === method.id ? colors.primary : colors.mutedForeground + '4D',
                  backgroundColor: selectedPayment === method.id ? colors.primary : 'transparent',
                }
              ]}>
                {selectedPayment === method.id && (
                  <Ionicons name="checkmark" size={14} color={colors.primaryForeground} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Order Summary */}
        <Animated.View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Bill Details
          </Text>
          <View style={styles.billDetails}>
            <View style={styles.billRow}>
              <Text style={[styles.billLabel, { color: colors.mutedForeground }]}>
                Item Total
              </Text>
              <Text style={[styles.billValue, { color: colors.foreground }]}>
                ₹{total.toLocaleString()}
              </Text>
            </View>
            <View style={styles.billRow}>
              <Text style={[styles.billLabel, { color: colors.mutedForeground }]}>
                Delivery Fee
              </Text>
              <Text style={[styles.billValue, { color: colors.foreground }]}>
                ₹{deliveryFee}
              </Text>
            </View>
            <View style={[styles.billRow, styles.totalRow, { borderTopColor: colors.border }]}>
              <Text style={[styles.totalLabel, { color: colors.foreground }]}>
                Total Amount
              </Text>
              <Text style={[styles.totalValue, { color: colors.primary }]}>
                ₹{finalTotal.toLocaleString()}
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Section */}
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
        <View style={styles.totalSection}>
          <Text style={[styles.payText, { color: colors.mutedForeground }]}>
            Pay ₹{finalTotal.toLocaleString()}
          </Text>
          <Text style={[styles.paymentMethodText, { color: colors.foreground }]}>
            via {paymentMethods.find(m => m.id === selectedPayment)?.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleConfirmOrder}
          style={[styles.confirmButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.confirmText, { color: colors.primaryForeground }]}>
            Place Order
          </Text>
          <Ionicons name="checkmark-circle" size={20} color={colors.primaryForeground} />
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
  scrollView: {
    flex: 1,
  },
  section: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: 20,
    ...theme.shadows.sm,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  changeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  itemsList: {
    gap: theme.spacing.sm,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: theme.spacing.sm,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    marginBottom: 2,
  },
  farmerName: {
    fontSize: theme.fontSize.sm,
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing.md,
    borderRadius: 12,
    gap: 12,
  },
  addressDetails: {
    flex: 1,
  },
  addressTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    marginBottom: 4,
  },
  addressText: {
    fontSize: theme.fontSize.sm,
    lineHeight: 18,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: theme.spacing.sm,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentDetails: {
    flex: 1,
  },
  paymentName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    marginBottom: 2,
  },
  paymentDescription: {
    fontSize: theme.fontSize.sm,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  billDetails: {
    gap: theme.spacing.sm,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billLabel: {
    fontSize: theme.fontSize.md,
  },
  billValue: {
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
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    gap: 16,
  },
  totalSection: {
    flex: 1,
  },
  payText: {
    fontSize: theme.fontSize.sm,
  },
  paymentMethodText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    ...theme.shadows.md,
  },
  confirmText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
});
