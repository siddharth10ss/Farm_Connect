import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, Dimensions, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  location: string;
  category: string;
  image: string;
  farmer: {
    name: string;
    avatar: string;
    location: string;
    rating: number;
    totalSales: number;
  };
  description: string;
  availableQuantity: number;
  nutritionInfo?: string[];
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 350,
    unit: 'kg',
    location: 'Green Valley Farm',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1546470427-e5e4b8b53b06?w=400&h=300&fit=crop',
    farmer: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      location: 'Green Valley, CA',
      rating: 4.8,
      totalSales: 156
    },
    description: 'Fresh, juicy tomatoes grown using organic farming methods. Perfect for salads, cooking, or snacking. Rich in vitamins and antioxidants.',
    availableQuantity: 25,
    nutritionInfo: ['High in Vitamin C', 'Rich in Lycopene', 'Low Calories', 'High Water Content']
  },
  {
    id: '2',
    name: 'Organic Bananas',
    price: 280,
    unit: 'kg',
    location: 'Sunny Orchards',
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=300&fit=crop',
    farmer: {
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=400&h=400&fit=crop',
      location: 'Sunny Valley, FL',
      rating: 4.9,
      totalSales: 203
    },
    description: 'Sweet, naturally ripened organic bananas. Great source of potassium and perfect for smoothies, baking, or eating fresh.',
    availableQuantity: 40,
    nutritionInfo: ['High in Potassium', 'Natural Sugars', 'Vitamin B6', 'Dietary Fiber']
  },
  {
    id: '3',
    name: 'Fresh Spinach',
    price: 220,
    unit: 'kg',
    location: 'Riverside Farm',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
    farmer: {
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      location: 'Riverside, OR',
      rating: 4.7,
      totalSales: 89
    },
    description: 'Crisp, fresh spinach leaves harvested this morning. Perfect for salads, smoothies, or cooking. Packed with iron and vitamins.',
    availableQuantity: 15,
    nutritionInfo: ['High in Iron', 'Vitamin K', 'Folate', 'Antioxidants']
  },
  {
    id: '4',
    name: 'Red Apples',
    price: 420,
    unit: 'kg',
    location: 'Mountain View Orchard',
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop',
    farmer: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      location: 'Mountain View, WA',
      rating: 4.9,
      totalSales: 267
    },
    description: 'Crisp, sweet red apples from our mountain orchard. Perfect for snacking, baking, or making fresh juice. Grown without pesticides.',
    availableQuantity: 50,
    nutritionInfo: ['High Fiber', 'Vitamin C', 'Antioxidants', 'Natural Sugars']
  },
  {
    id: '5',
    name: 'Organic Rice',
    price: 580,
    unit: 'kg',
    location: 'Golden Fields',
    category: 'grains',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
    farmer: {
      name: 'Chen Wei',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      location: 'Golden Fields, TX',
      rating: 4.8,
      totalSales: 145
    },
    description: 'Premium organic jasmine rice grown with traditional methods. Aromatic, fluffy texture perfect for any meal. Sustainably farmed.',
    availableQuantity: 100,
    nutritionInfo: ['Complex Carbs', 'Gluten Free', 'B Vitamins', 'Essential Amino Acids']
  },
  {
    id: '6',
    name: 'Bell Peppers',
    price: 380,
    unit: 'kg',
    location: 'Valley Fresh Farm',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop',
    farmer: {
      name: 'Emma Brown',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=400&h=400&fit=crop',
      location: 'Fresh Valley, AZ',
      rating: 4.6,
      totalSales: 98
    },
    description: 'Colorful, crunchy bell peppers in red, yellow, and green. Sweet flavor and crisp texture. Perfect for stir-fries, salads, or stuffing.',
    availableQuantity: 30,
    nutritionInfo: ['Vitamin C', 'Vitamin A', 'Low Calories', 'Antioxidants']
  }
];

const categories = [
  { id: 'all', label: 'All', icon: '🌾' },
  { id: 'vegetables', label: 'Vegetables', icon: '🥬' },
  { id: 'fruits', label: 'Fruits', icon: '🍎' },
  { id: 'grains', label: 'Grains', icon: '🌾' }
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductSelect = (product: Product) => {
    navigation.navigate('ProductDetail' as never, { product } as never);
  };

  const renderProduct = ({ item, index }: { item: Product; index: number }) => (
    <Animated.View
      style={[
        styles.productCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <TouchableOpacity
        onPress={() => handleProductSelect(item)}
        style={[styles.productContainer, { backgroundColor: colors.card + 'CC' }]}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={[styles.priceTag, { backgroundColor: colors.card + 'E6' }]}>
            <Text style={[styles.priceText, { color: colors.foreground }]}>
              ₹{item.price}/{item.unit}
            </Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: colors.foreground }]} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.farmerInfo}>
            <Ionicons name="location-outline" size={12} color={colors.mutedForeground} />
            <Text style={[styles.farmerName, { color: colors.mutedForeground }]} numberOfLines={1}>
              {item.farmer.name}
            </Text>
          </View>
          
          <TouchableOpacity
            style={[styles.viewButton, { backgroundColor: colors.primary }]}
            onPress={() => handleProductSelect(item)}
          >
            <Text style={[styles.viewButtonText, { color: colors.primaryForeground }]}>
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card + 'CC' }]}>
        <View style={styles.headerContent}>
          {/* Logo and Actions */}
          <View style={styles.headerTop}>
            <View style={styles.logoSection}>
              <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
                <View style={styles.logoIcon}>
                  <View style={[styles.logoShape, { backgroundColor: colors.primaryForeground }]} />
                  <View style={[styles.logoCenter, { backgroundColor: colors.secondary }]} />
                </View>
              </View>
              <View>
                <Text style={[styles.appName, { color: colors.foreground }]}>FarmConnect</Text>
                <Text style={[styles.tagline, { color: colors.mutedForeground }]}>Fresh from farm</Text>
              </View>
            </View>
            
            <View style={styles.headerActions}>
              {/* Notification Bell */}
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary + '1A' }]}>
                <Ionicons name="notifications-outline" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <Ionicons name="search-outline" size={20} color={colors.mutedForeground} style={styles.searchIcon} />
            <TextInput
              placeholder="Search fresh produce..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={[styles.searchInput, { color: colors.foreground }]}
              placeholderTextColor={colors.mutedForeground}
            />
          </View>
        </View>
      </View>

      {/* Category Filters */}
      <View style={styles.categoriesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: selectedCategory === category.id ? colors.primary : colors.card,
                  borderColor: colors.border,
                }
              ]}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryLabel,
                { color: selectedCategory === category.id ? colors.primaryForeground : colors.foreground }
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products Grid */}
      <View style={styles.productsSection}>
        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            numColumns={2}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
            columnWrapperStyle={styles.productRow}
          />
        ) : (
          <Animated.View
            style={[
              styles.noResults,
              { opacity: fadeAnim }
            ]}
          >
            <View style={[styles.noResultsIcon, { backgroundColor: colors.primary + '1A' }]}>
              <Ionicons name="search-outline" size={32} color={colors.mutedForeground} />
            </View>
            <Text style={[styles.noResultsTitle, { color: colors.foreground }]}>No products found</Text>
            <Text style={[styles.noResultsText, { color: colors.mutedForeground }]}>
              Try adjusting your search or category filter
            </Text>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
  },
  headerContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  logoShape: {
    width: 16,
    height: 14,
    borderRadius: 8,
    position: 'absolute',
    top: 0,
    left: 2,
  },
  logoCenter: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 6,
    left: 6,
  },
  appName: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
  tagline: {
    fontSize: theme.fontSize.sm,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: theme.fontSize.md,
  },
  categoriesSection: {
    paddingVertical: theme.spacing.md,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.lg,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  productsSection: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  productsContainer: {
    paddingBottom: theme.spacing.xl,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - theme.spacing.lg * 2 - theme.spacing.md) / 2,
    marginBottom: theme.spacing.md,
  },
  productContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  priceTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
  },
  productInfo: {
    padding: theme.spacing.md,
    gap: 8,
  },
  productName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
  },
  farmerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  farmerName: {
    fontSize: theme.fontSize.sm,
    flex: 1,
  },
  viewButton: {
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  noResultsIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  noResultsTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
  },
  noResultsText: {
    fontSize: theme.fontSize.md,
    textAlign: 'center',
  },
});
