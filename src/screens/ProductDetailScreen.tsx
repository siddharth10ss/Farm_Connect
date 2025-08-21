import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
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
  const { product } = route.params;

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', product.name, 'Quantity:', quantity);
    navigation.goBack();
  };

  const handleChatWithFarmer = () => {
    navigation.navigate('Chat' as never, { 
      farmer: product.farmer, 
      product: product 
    } as never);
  };

  const increaseQuantity = () => {
    if (quantity < product.availableQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card + 'CC' }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { backgroundColor: colors.primary + '1A' }]}
        >
          <Ionicons name="arrow-back" size={20} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Product Details</Text>
        <TouchableOpacity style={[styles.favoriteButton, { backgroundColor: colors.primary + '1A' }]}>
          <Ionicons name="heart-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Animated.View
          style={[
            styles.imageSection,
            {
              opacity: fadeAnim,
              transform: [{ scale: fadeAnim }]
            }
          ]}
        >
          <View style={[styles.imageContainer, { backgroundColor: colors.card }]}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={[styles.categoryBadge, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.categoryText, { color: colors.secondaryForeground }]}>
                {product.category}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Product Info */}
        <Animated.View
          style={[
            styles.infoSection,
            {
              backgroundColor: colors.card,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.productHeader}>
            <View style={styles.productTitleSection}>
              <Text style={[styles.productName, { color: colors.foreground }]}>
                {product.name}
              </Text>
              <Text style={[styles.productPrice, { color: colors.primary }]}>
                ₹{product.price}/{product.unit}
              </Text>
            </View>
            <View style={styles.availabilitySection}>
              <Text style={[styles.availabilityText, { color: colors.mutedForeground }]}>
                Available: {product.availableQuantity} {product.unit}
              </Text>
            </View>
          </View>

          <Text style={[styles.description, { color: colors.mutedForeground }]}>
            {product.description}
          </Text>

          {/* Nutrition Info */}
          {product.nutritionInfo && (
            <View style={styles.nutritionSection}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Nutrition Benefits
              </Text>
              <View style={styles.nutritionTags}>
                {product.nutritionInfo.map((info, index) => (
                  <View key={index} style={[styles.nutritionTag, { backgroundColor: colors.primary + '1A' }]}>
                    <Text style={[styles.nutritionTagText, { color: colors.primary }]}>
                      {info}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Farmer Info */}
          <View style={styles.farmerSection}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              From the Farmer
            </Text>
            <View style={[styles.farmerCard, { backgroundColor: colors.muted }]}>
              <Image
                source={{ uri: product.farmer.avatar }}
                style={styles.farmerAvatar}
              />
              <View style={styles.farmerInfo}>
                <Text style={[styles.farmerName, { color: colors.foreground }]}>
                  {product.farmer.name}
                </Text>
                <View style={styles.farmerLocation}>
                  <Ionicons name="location-outline" size={14} color={colors.mutedForeground} />
                  <Text style={[styles.farmerLocationText, { color: colors.mutedForeground }]}>
                    {product.farmer.location}
                  </Text>
                </View>
                <View style={styles.farmerStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="star" size={14} color={colors.secondary} />
                    <Text style={[styles.statText, { color: colors.mutedForeground }]}>
                      {product.farmer.rating}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="bag-outline" size={14} color={colors.mutedForeground} />
                    <Text style={[styles.statText, { color: colors.mutedForeground }]}>
                      {product.farmer.totalSales} sales
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleChatWithFarmer}
                style={[styles.chatButton, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="chatbubble-outline" size={16} color={colors.primaryForeground} />
              </TouchableOpacity>
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
        {/* Quantity Selector */}
        <View style={styles.quantitySection}>
          <Text style={[styles.quantityLabel, { color: colors.foreground }]}>Quantity</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={[
                styles.quantityButton,
                { 
                  backgroundColor: quantity > 1 ? colors.primary + '1A' : colors.muted,
                  borderColor: colors.border 
                }
              ]}
              disabled={quantity <= 1}
            >
              <Ionicons 
                name="remove" 
                size={20} 
                color={quantity > 1 ? colors.primary : colors.mutedForeground} 
              />
            </TouchableOpacity>
            <Text style={[styles.quantityText, { color: colors.foreground }]}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={increaseQuantity}
              style={[
                styles.quantityButton,
                { 
                  backgroundColor: quantity < product.availableQuantity ? colors.primary + '1A' : colors.muted,
                  borderColor: colors.border 
                }
              ]}
              disabled={quantity >= product.availableQuantity}
            >
              <Ionicons 
                name="add" 
                size={20} 
                color={quantity < product.availableQuantity ? colors.primary : colors.mutedForeground} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Add to Cart Button */}
        <View style={styles.actionSection}>
          <View style={styles.totalSection}>
            <Text style={[styles.totalLabel, { color: colors.mutedForeground }]}>Total</Text>
            <Text style={[styles.totalAmount, { color: colors.foreground }]}>
              ₹{(product.price * quantity).toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleAddToCart}
            style={[styles.addToCartButton, { backgroundColor: colors.primary }]}
          >
            <Ionicons name="bag-add-outline" size={20} color={colors.primaryForeground} />
            <Text style={[styles.addToCartText, { color: colors.primaryForeground }]}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
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
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    ...theme.shadows.md,
  },
  productImage: {
    width: '100%',
    height: height * 0.3,
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    textTransform: 'capitalize',
  },
  infoSection: {
    margin: theme.spacing.lg,
    borderRadius: 20,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  productHeader: {
    marginBottom: theme.spacing.md,
  },
  productTitleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  productName: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  productPrice: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
  },
  availabilitySection: {
    marginBottom: theme.spacing.md,
  },
  availabilityText: {
    fontSize: theme.fontSize.sm,
  },
  description: {
    fontSize: theme.fontSize.md,
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  nutritionSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.md,
  },
  nutritionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  nutritionTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  nutritionTagText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  farmerSection: {
    marginBottom: theme.spacing.lg,
  },
  farmerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: 16,
    gap: 12,
  },
  farmerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  farmerInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    marginBottom: 4,
  },
  farmerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  farmerLocationText: {
    fontSize: theme.fontSize.sm,
  },
  farmerStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: theme.fontSize.sm,
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  quantityLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  quantityText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    minWidth: 30,
    textAlign: 'center',
  },
  actionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  totalSection: {
    flex: 1,
  },
  totalLabel: {
    fontSize: theme.fontSize.sm,
  },
  totalAmount: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    ...theme.shadows.md,
  },
  addToCartText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
});
