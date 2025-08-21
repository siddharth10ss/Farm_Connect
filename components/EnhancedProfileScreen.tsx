import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Sun, 
  Moon, 
  Settings, 
  Package, 
  ShoppingBag,
  Clock,
  TrendingUp,
  MessageCircle,
  Edit
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTheme } from './ThemeContext';

interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  productName?: string;
}

interface Listing {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  stock: number;
  sold: number;
  status: 'active' | 'out_of_stock' | 'paused';
}

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'in-transit' | 'processing' | 'cancelled';
  total: number;
  itemCount: number;
  farmerName: string;
  image: string;
}

interface UserProfile {
  id: string;
  name: string;
  role: 'farmer' | 'buyer';
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
  memberSince: string;
  rating: number;
  totalReviews: number;
  totalSales?: number; // For farmers
  totalOrders?: number; // For buyers
  verified: boolean;
}

interface EnhancedProfileScreenProps {
  user: UserProfile;
  listings?: Listing[];
  orders?: Order[];
  reviews: Review[];
  onBack: () => void;
  onEditProfile: () => void;
}

const mockListings: Listing[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 350,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1546470427-e5e4b8b53b06?w=400&h=300&fit=crop',
    stock: 25,
    sold: 156,
    status: 'active'
  },
  {
    id: '2',
    name: 'Organic Bananas',
    price: 280,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=300&fit=crop',
    stock: 0,
    sold: 203,
    status: 'out_of_stock'
  },
  {
    id: '3',
    name: 'Fresh Spinach',
    price: 220,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
    stock: 15,
    sold: 89,
    status: 'active'
  }
];

const mockOrders: Order[] = [
  {
    id: '1',
    date: '2024-01-15',
    status: 'delivered',
    total: 1890,
    itemCount: 3,
    farmerName: 'Green Valley Farm',
    image: 'https://images.unsplash.com/photo-1546470427-e5e4b8b53b06?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    date: '2024-01-10',
    status: 'in-transit',
    total: 1460,
    itemCount: 2,
    farmerName: 'Mountain View Orchard',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop'
  }
];

const mockReviews: Review[] = [
  {
    id: '1',
    reviewerName: 'Sarah Johnson',
    reviewerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Amazing quality tomatoes! Fresh and perfectly ripe. Will definitely order again.',
    date: '2024-01-12',
    productName: 'Fresh Tomatoes'
  },
  {
    id: '2',
    reviewerName: 'Mike Chen',
    reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 4,
    comment: 'Good quality produce and fast delivery. The farmer was very responsive to questions.',
    date: '2024-01-08',
    productName: 'Organic Bananas'
  },
  {
    id: '3',
    reviewerName: 'Emily Davis',
    reviewerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Best spinach I\'ve bought in months! Super fresh and crispy.',
    date: '2024-01-05',
    productName: 'Fresh Spinach'
  }
];

export function EnhancedProfileScreen({ 
  user, 
  listings = mockListings,
  orders = mockOrders,
  reviews = mockReviews,
  onBack, 
  onEditProfile 
}: EnhancedProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'orders' | 'reviews'>('listings');
  const { theme, toggleTheme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'delivered':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'out_of_stock':
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'in-transit':
      case 'processing':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'paused':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'fill-[#FFD54F] text-[#FFD54F]' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted transition-colors duration-300">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-[#4CAF50]/10 dark:bg-[#4CAF50]/20 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-[#4CAF50]" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Profile</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 bg-[#FFD54F]/10 dark:bg-[#FFD54F]/20 rounded-xl flex items-center justify-center transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-[#FFD54F]" />
              ) : (
                <Sun className="w-5 h-5 text-[#FFD54F]" />
              )}
            </button>
            
            {/* Settings */}
            <button
              onClick={onEditProfile}
              className="w-10 h-10 bg-[#4CAF50]/10 dark:bg-[#4CAF50]/20 rounded-xl flex items-center justify-center"
            >
              <Settings className="w-5 h-5 text-[#4CAF50]" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-border"
        >
          <div className="flex items-start space-x-4 mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-[#4CAF50]/10">
                <ImageWithFallback
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {user.verified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'farmer' 
                        ? 'bg-[#4CAF50]/20 text-[#4CAF50]' 
                        : 'bg-[#FFD54F]/20 text-[#FFD54F]'
                    }`}>
                      {user.role === 'farmer' ? '🌾 Farmer' : '🛒 Buyer'}
                    </span>
                    {user.verified && (
                      <span className="text-sm text-[#4CAF50] font-medium">Verified</span>
                    )}
                  </div>
                </div>
                <button className="p-2 bg-muted/50 rounded-xl">
                  <Edit className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              
              <div className="flex items-center space-x-1 mb-2">
                <MapPin className="w-4 h-4 text-[#4CAF50]" />
                <span className="text-sm text-muted-foreground">{user.location}</span>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center space-x-1">
                  {renderStars(Math.floor(user.rating))}
                </div>
                <span className="text-sm font-medium text-foreground">{user.rating}</span>
                <span className="text-sm text-muted-foreground">({user.totalReviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="font-bold text-foreground mb-2">About</h3>
            <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/20 rounded-xl">
              <p className="text-lg font-bold text-foreground">
                {user.role === 'farmer' ? user.totalSales : user.totalOrders}
              </p>
              <p className="text-sm text-muted-foreground">
                {user.role === 'farmer' ? 'Total Sales' : 'Orders Placed'}
              </p>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-xl">
              <p className="text-lg font-bold text-foreground">{user.totalReviews}</p>
              <p className="text-sm text-muted-foreground">Reviews</p>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-xl">
              <p className="text-lg font-bold text-foreground">
                {new Date().getFullYear() - new Date(user.memberSince).getFullYear()}
              </p>
              <p className="text-sm text-muted-foreground">Years Active</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-border"
        >
          <div className="flex bg-muted/30 rounded-2xl p-1 mb-6">
            {user.role === 'farmer' && (
              <button
                onClick={() => setActiveTab('listings')}
                className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  activeTab === 'listings'
                    ? 'bg-[#4CAF50] text-white shadow-lg'
                    : 'text-muted-foreground'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Listings</span>
              </button>
            )}
            
            {user.role === 'buyer' && (
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  activeTab === 'orders'
                    ? 'bg-[#FFD54F] text-[#2E7D32] shadow-lg'
                    : 'text-muted-foreground'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>My Orders</span>
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'reviews'
                  ? 'bg-[#FFD54F] text-[#2E7D32] shadow-lg'
                  : 'text-muted-foreground'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Reviews</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'listings' && user.role === 'farmer' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {listings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-muted/10 rounded-2xl"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#4CAF50]/10">
                    <ImageWithFallback
                      src={listing.image}
                      alt={listing.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-foreground">{listing.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                        {listing.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">₹{listing.price}/{listing.unit}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Stock: {listing.stock}</span>
                      <span>Sold: {listing.sold}</span>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Popular</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'orders' && user.role === 'buyer' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-muted/10 rounded-2xl"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#4CAF50]/10">
                    <ImageWithFallback
                      src={order.image}
                      alt="Order"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-foreground">Order #{order.id}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">From: {order.farmerName}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                      <span className="font-bold text-foreground">₹{order.total}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 bg-muted/10 rounded-2xl"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#4CAF50]/10">
                      <ImageWithFallback
                        src={review.reviewerAvatar}
                        alt={review.reviewerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-foreground">{review.reviewerName}</h5>
                        <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        {review.productName && (
                          <span className="text-xs text-muted-foreground">• {review.productName}</span>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  );
}