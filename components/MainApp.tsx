import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HomeScreen } from './HomeScreen';
import { ProductDetailScreen } from './ProductDetailScreen';
import { CartScreen } from './CartScreen';
import { ProfileScreen } from './ProfileScreen';
import { EnhancedProfileScreen } from './EnhancedProfileScreen';
import { ChatScreen } from './ChatScreen';
import { OrderSummaryScreen } from './OrderSummaryScreen';
import { NotificationSystem, useNotifications } from './NotificationSystem';

type Screen = 'home' | 'product-detail' | 'cart' | 'profile' | 'enhanced-profile' | 'chat' | 'order-summary';

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

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
  image: string;
  farmer: string;
}

export function MainApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [chatFarmer, setChatFarmer] = useState<{
    id: string;
    name: string;
    avatar: string;
    location: string;
  } | null>(null);

  const { 
    notifications, 
    unreadCount, 
    addNotification, 
    markAsRead, 
    clearAll 
  } = useNotifications();

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product-detail');
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    if (!selectedProduct) return;

    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      setCartItems(items =>
        items.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        unit: selectedProduct.unit,
        quantity,
        image: selectedProduct.image,
        farmer: selectedProduct.farmer.name,
        location: selectedProduct.farmer.location
      };
      setCartItems(items => [...items, newItem]);
    }

    // Add notification for successful add to cart
    addNotification({
      type: 'order_update',
      title: 'Added to Cart',
      message: `${selectedProduct.name} (${quantity} ${selectedProduct.unit}) added to your cart`,
      actionText: 'View Cart'
    });
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const handleCheckout = (items: CartItem[], total: number) => {
    // Convert cart items to order items
    const orderItemsForSummary: OrderItem[] = items.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      unit: item.unit,
      image: item.image,
      farmer: item.farmer
    }));

    setOrderItems(orderItemsForSummary);
    setCurrentScreen('order-summary');
  };

  const handleConfirmOrder = (paymentMethod: string, items: OrderItem[], total: number) => {
    // Simulate successful order placement
    setCartItems([]);
    setOrderItems([]);
    setCurrentScreen('home');
    
    // Add order confirmation notification
    addNotification({
      type: 'order_update',
      title: 'Order Placed Successfully!',
      message: `Your order of ₹${total} has been placed. You'll receive updates soon.`,
      actionText: 'Track Order'
    });

    console.log('Order confirmed:', { paymentMethod, items, total });
  };

  const handleChatWithFarmer = (farmerInfo: string | { name: string; avatar: string; location: string }) => {
    if (typeof farmerInfo === 'string') {
      // Handle string case (farmer name only)
      setChatFarmer({
        id: farmerInfo,
        name: farmerInfo,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        location: 'Unknown Location'
      });
    } else {
      // Handle object case (full farmer info)
      setChatFarmer({
        id: farmerInfo.name,
        ...farmerInfo
      });
    }
    setCurrentScreen('chat');
  };

  const handleBack = () => {
    if (currentScreen === 'product-detail') {
      setCurrentScreen('home');
      setSelectedProduct(null);
    } else if (currentScreen === 'chat') {
      setCurrentScreen(selectedProduct ? 'product-detail' : 'home');
      setChatFarmer(null);
    } else if (currentScreen === 'order-summary') {
      setCurrentScreen('cart');
    } else if (currentScreen === 'enhanced-profile') {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleCartOpen = () => {
    setCurrentScreen('cart');
  };

  const handleProfileOpen = () => {
    setCurrentScreen('enhanced-profile'); // Use enhanced profile by default
  };

  const handleEditProfile = () => {
    console.log('Opening profile edit');
  };

  const handleNotificationAction = (notification: any) => {
    switch (notification.type) {
      case 'order_update':
        if (notification.actionText === 'View Cart') {
          handleCartOpen();
        }
        break;
      case 'new_product':
        setCurrentScreen('home');
        break;
      case 'price_drop':
        setCurrentScreen('home');
        break;
      case 'farmer_message':
        // Open chat with farmer
        handleChatWithFarmer({
          name: 'John Smith',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
          location: 'Green Valley, CA'
        });
        break;
      default:
        setCurrentScreen('home');
    }
  };

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen w-full relative"
    >
      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onClearAll={clearAll}
        onNotificationAction={handleNotificationAction}
      />

      {currentScreen === 'home' && (
        <HomeScreen
          onProductSelect={handleProductSelect}
          onCartOpen={handleCartOpen}
          onProfileOpen={handleProfileOpen}
          cartItemCount={cartItemCount}
          unreadNotifications={unreadCount}
        />
      )}

      {currentScreen === 'product-detail' && selectedProduct && (
        <ProductDetailScreen
          product={selectedProduct}
          onBack={handleBack}
          onAddToCart={handleAddToCart}
          onChatWithFarmer={handleChatWithFarmer}
        />
      )}

      {currentScreen === 'cart' && (
        <CartScreen
          cartItems={cartItems}
          onBack={handleBack}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {currentScreen === 'order-summary' && (
        <OrderSummaryScreen
          items={orderItems}
          onBack={handleBack}
          onConfirmOrder={handleConfirmOrder}
        />
      )}

      {currentScreen === 'chat' && chatFarmer && (
        <ChatScreen
          farmerId={chatFarmer.id}
          farmerName={chatFarmer.name}
          farmerAvatar={chatFarmer.avatar}
          farmerLocation={chatFarmer.location}
          onBack={handleBack}
          productName={selectedProduct?.name}
          currentPrice={selectedProduct?.price}
          unit={selectedProduct?.unit}
        />
      )}

      {currentScreen === 'enhanced-profile' && (
        <EnhancedProfileScreen
          user={{
            id: '1',
            name: 'John Smith',
            role: 'farmer', // Change to 'buyer' to see buyer view
            email: 'john.smith@farmconnect.com',
            phone: '+91 98765 43210',
            location: 'Green Valley, California, USA',
            bio: 'Passionate organic farmer with over 15 years of experience. I grow fresh, pesticide-free vegetables using sustainable farming practices. My farm is certified organic and I take pride in delivering the highest quality produce directly to your table.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
            memberSince: '2018-03-15',
            rating: 4.8,
            totalReviews: 247,
            totalSales: 1526,
            verified: true
          }}
          reviews={[
            {
              id: '1',
              reviewerName: 'Sarah Johnson',
              reviewerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop',
              rating: 5,
              comment: 'Amazing quality tomatoes! Fresh and perfectly ripe. John is very responsive and helpful.',
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
              comment: 'Best spinach I\'ve bought in months! Super fresh and crispy. Highly recommend!',
              date: '2024-01-05',
              productName: 'Fresh Spinach'
            }
          ]}
          onBack={handleBack}
          onEditProfile={handleEditProfile}
        />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen
          user={{
            id: '1',
            name: 'Alex Johnson',
            email: 'alex.johnson@email.com',
            phone: '+91 98765 43210',
            address: '123 Green Street, Bangalore, Karnataka 560001',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
            memberSince: '2023-06-15',
            totalOrders: 24,
            totalSpent: 38540
          }}
          orders={[
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
            }
          ]}
          onBack={handleBack}
          onEditProfile={handleEditProfile}
        />
      )}
    </motion.div>
  );
}