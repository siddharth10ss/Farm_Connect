import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, ShoppingCart, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { NotificationBell } from './NotificationSystem';

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

interface HomeScreenProps {
  onProductSelect: (product: Product) => void;
  onCartOpen: () => void;
  onProfileOpen: () => void;
  cartItemCount: number;
  unreadNotifications?: number;
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

export function HomeScreen({ 
  onProductSelect, 
  onCartOpen, 
  onProfileOpen,
  cartItemCount = 0,
  unreadNotifications = 0 
}: HomeScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNotificationClick = () => {
    // For now, just log - in a real app you might open a notifications panel
    console.log('Notifications clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-6 py-4">
          {/* Logo and Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="text-primary-foreground"
                >
                  <path
                    d="M20 35C20 35 32 25 32 15C32 8.5 26.5 5 20 5C13.5 5 8 8.5 8 15C8 25 20 35 20 35Z"
                    fill="currentColor"
                  />
                  <path
                    d="M20 25C22.7614 25 25 22.7614 25 20C25 17.2386 22.7614 15 20 15C17.2386 15 15 17.2386 15 20C15 22.7614 17.2386 25 20 25Z"
                    fill="#FFD54F"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">FarmConnect</h1>
                <p className="text-sm text-muted-foreground">Fresh from farm</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Notification Bell */}
              <NotificationBell 
                unreadCount={unreadNotifications} 
                onClick={handleNotificationClick} 
              />

              {/* Profile Button */}
              <button 
                onClick={onProfileOpen}
                className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <User className="w-5 h-5 text-primary" />
              </button>

              {/* Cart Button */}
              <div className="relative">
                <button 
                  onClick={onCartOpen}
                  className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </button>
                {cartItemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-secondary rounded-full flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-secondary-foreground">{cartItemCount}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search fresh produce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-2xl focus:border-primary focus:outline-none text-foreground placeholder-muted-foreground transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-6 py-4">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
                  : 'bg-card text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6 pb-6">
        <motion.div
          layout
          className="grid grid-cols-2 gap-4"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => onProductSelect(product)}
              className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              {/* Product Image */}
              <div className="aspect-square relative overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-bold text-foreground">
                    ₹{product.price}/{product.unit}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-foreground truncate">{product.name}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground truncate">{product.farmer.name}</p>
                  </div>
                </div>

                {/* View Details Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all duration-200"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </motion.div>
        )}
      </div>

      {/* Bottom Padding for better scrolling */}
      <div className="h-20"></div>
    </div>
  );
}