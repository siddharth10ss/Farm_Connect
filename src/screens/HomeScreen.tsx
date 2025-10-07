import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, Dimensions, Image, Animated, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme } from '../theme';
import { supabase } from '../utils/supabase';

const { width } = Dimensions.get('window');

export interface Product {
  id: string;
  created_at: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
  farmer_id: string;
}

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase.from('products').select('*');

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [searchQuery, selectedCategory]);

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
            source={{ uri: item.image_url }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={[styles.priceTag, { backgroundColor: colors.card + 'E6' }]}>
            <Text style={[styles.priceText, { color: colors.foreground }]}>
              ₹{item.price}/kg
            </Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: colors.foreground }]} numberOfLines={1}>
            {item.name}
          </Text>
          
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
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : products.length > 0 ? (
          <FlatList
            data={products}
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
              <Ionicons name="add" size={32} color={colors.mutedForeground} />
            </View>
            <Text style={[styles.noResultsTitle, { color: colors.foreground }]}>No products yet</Text>
            <Text style={[styles.noResultsText, { color: colors.mutedForeground }]}>
              Add a product to get started.
            </Text>
          </Animated.View>
        )}
      </View>

      {/* Add Product FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('AddProduct' as never)}
      >
        <Ionicons name="add" size={24} color={colors.primaryForeground} />
      </TouchableOpacity>
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
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
});
