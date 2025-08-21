import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, MapPin, Phone, Mail, Star, Package, Clock, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'in-transit' | 'processing';
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  farmer: string;
}

interface UserProfile {
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

interface ProfileScreenProps {
  user: UserProfile;
  orders: Order[];
  onBack: () => void;
  onEditProfile: () => void;
}

const mockOrders: Order[] = [
  {
    id: '1',
    date: '2024-01-15',
    status: 'delivered',
    total: 1890,
    items: [
      { name: 'Fresh Tomatoes', quantity: 2, price: 350, image: 'https://images.unsplash.com/photo-1546470427-e5e4b8b53b06?w=400&h=300&fit=crop' },
      { name: 'Organic Bananas', quantity: 3, price: 280, image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=300&fit=crop' }
    ],
    farmer: 'Green Valley Farm'
  },
  {
    id: '2',
    date: '2024-01-10',
    status: 'delivered',
    total: 1460,
    items: [
      { name: 'Fresh Spinach', quantity: 1, price: 220, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop' },
      { name: 'Red Apples', quantity: 2, price: 420, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop' }
    ],
    farmer: 'Mountain View Orchard'
  },
  {
    id: '3',
    date: '2024-01-08',
    status: 'in-transit',
    total: 1240,
    items: [
      { name: 'Bell Peppers', quantity: 2, price: 380, image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop' }
    ],
    farmer: 'Valley Fresh Farm'
  }
];

const mockUser: UserProfile = {
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

export function ProfileScreen({ 
  user = mockUser, 
  orders = mockOrders, 
  onBack, 
  onEditProfile 
}: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'in-transit': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'in-transit': return 'In Transit';
      case 'processing': return 'Processing';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#E8F5E8]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[#4CAF50]/10 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-[#4CAF50]" />
            </button>
            <h1 className="text-xl font-bold text-[#2E7D32]">Profile</h1>
          </div>
          <button
            onClick={onEditProfile}
            className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-[#4CAF50]" />
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#4CAF50]/10">
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#2E7D32]">{user.name}</h2>
              <p className="text-[#4CAF50]">Member since {new Date(user.memberSince).toLocaleDateString()}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Package className="w-4 h-4 text-[#4CAF50]" />
                  <span className="text-sm font-medium text-[#2E7D32]">{user.totalOrders} orders</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-[#FFD54F] text-[#FFD54F]" />
                  <span className="text-sm font-medium text-[#2E7D32]">₹{user.totalSpent.toLocaleString()} spent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#4CAF50]/10 rounded-2xl p-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'bg-[#4CAF50] text-white shadow-lg'
                  : 'text-[#4CAF50]'
              }`}
            >
              Profile Info
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'orders'
                  ? 'bg-[#4CAF50] text-white shadow-lg'
                  : 'text-[#4CAF50]'
              }`}
            >
              Order History
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tab Content */}
      <div className="px-6 pb-6">
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Contact Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 space-y-4">
              <h3 className="font-bold text-[#2E7D32] mb-4">Contact Information</h3>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#4CAF50]" />
                <div>
                  <p className="text-sm text-[#4CAF50]">Email</p>
                  <p className="font-medium text-[#2E7D32]">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#4CAF50]" />
                <div>
                  <p className="text-sm text-[#4CAF50]">Phone</p>
                  <p className="font-medium text-[#2E7D32]">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#4CAF50] mt-1" />
                <div>
                  <p className="text-sm text-[#4CAF50]">Address</p>
                  <p className="font-medium text-[#2E7D32]">{user.address}</p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 text-center">
                <Package className="w-8 h-8 text-[#4CAF50] mx-auto mb-2" />
                <p className="font-bold text-[#2E7D32] text-xl">{user.totalOrders}</p>
                <p className="text-sm text-[#4CAF50]">Total Orders</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 text-center">
                <Star className="w-8 h-8 fill-[#FFD54F] text-[#FFD54F] mx-auto mb-2" />
                <p className="font-bold text-[#2E7D32] text-xl">₹{Math.floor(user.totalSpent / 1000)}k</p>
                <p className="text-sm text-[#4CAF50]">Total Spent</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
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
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-[#2E7D32]">Order #{order.id}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-[#4CAF50]" />
                      <span className="text-sm text-[#4CAF50]">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    <p className="font-bold text-[#2E7D32] mt-1">₹{order.total}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#4CAF50]/10">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#2E7D32] text-sm">{item.name}</p>
                        <p className="text-xs text-[#4CAF50]">{item.quantity}x ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#4CAF50]/20 pt-2 mt-3">
                  <p className="text-sm text-[#4CAF50]">From: {order.farmer}</p>
                </div>
              </motion.div>
            ))}

            {orders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-[#4CAF50]/60 mx-auto mb-4" />
                <h3 className="font-bold text-[#2E7D32] mb-2">No orders yet</h3>
                <p className="text-[#4CAF50]/80">Start shopping to see your order history here!</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  );
}