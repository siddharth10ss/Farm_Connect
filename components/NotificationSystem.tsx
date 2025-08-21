import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Package, ShoppingCart, X, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Notification {
  id: string;
  type: 'order_update' | 'new_product' | 'price_drop' | 'delivery' | 'farmer_message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  image?: string;
  actionText?: string;
  onAction?: () => void;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onClearAll: () => void;
  onNotificationAction: (notification: Notification) => void;
}

interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
  onAction?: () => void;
}

// Individual notification toast component
function NotificationToast({ notification, onClose, onAction }: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case 'order_update':
        return <Package className="w-5 h-5 text-primary" />;
      case 'new_product':
        return <ShoppingCart className="w-5 h-5 text-secondary" />;
      case 'price_drop':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'delivery':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'farmer_message':
        return <Bell className="w-5 h-5 text-primary" />;
      default:
        return <Bell className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.95 }}
      className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-lg mx-4 mb-2"
    >
      <div className="flex items-start space-x-3">
        {notification.image ? (
          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
            <ImageWithFallback
              src={notification.image}
              alt="Notification"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            {getIcon()}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-foreground text-sm">{notification.title}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed mt-1">{notification.message}</p>
          <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
          
          {notification.actionText && onAction && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onAction}
              className="mt-3 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {notification.actionText}
            </motion.button>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-primary/20 transition-colors"
        >
          <X className="w-4 h-4 text-primary" />
        </button>
      </div>
    </motion.div>
  );
}

// Notification bell component for header
export function NotificationBell({ 
  unreadCount, 
  onClick 
}: { 
  unreadCount: number; 
  onClick: () => void; 
}) {
  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
      >
        <Bell className="w-5 h-5 text-primary" />
      </motion.button>
      
      {unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
        >
          <span className="text-xs font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        </motion.div>
      )}
    </div>
  );
}

// Main notification system component
export function NotificationSystem({ 
  notifications, 
  onMarkAsRead, 
  onClearAll, 
  onNotificationAction 
}: NotificationSystemProps) {
  const [activeToasts, setActiveToasts] = useState<Notification[]>([]);

  // Add new notifications as toasts
  useEffect(() => {
    const newNotifications = notifications.filter(n => !n.read && 
      !activeToasts.some(t => t.id === n.id)
    );
    
    if (newNotifications.length > 0) {
      setActiveToasts(prev => [...prev, ...newNotifications.slice(-3)]); // Show max 3 toasts
    }
  }, [notifications, activeToasts]);

  const handleCloseToast = (notificationId: string) => {
    setActiveToasts(prev => prev.filter(toast => toast.id !== notificationId));
    onMarkAsRead(notificationId);
  };

  const handleToastAction = (notification: Notification) => {
    onNotificationAction(notification);
    handleCloseToast(notification.id);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <AnimatePresence>
          {activeToasts.map((notification) => (
            <NotificationToast
              key={notification.id}
              notification={notification}
              onClose={() => handleCloseToast(notification.id)}
              onAction={() => handleToastAction(notification)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Hook to simulate push notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order_update',
      title: 'Order Shipped!',
      message: 'Your Fresh Tomatoes order is on its way. Expected delivery: Tomorrow',
      timestamp: '5 min ago',
      read: false,
      image: 'https://images.unsplash.com/photo-1546470427-e5e4b8b53b06?w=100&h=100&fit=crop',
      actionText: 'Track Order'
    },
    {
      id: '2',
      type: 'new_product',
      title: 'New Organic Mangoes Available!',
      message: 'Fresh Alphonso mangoes from Maharashtra just arrived. Limited stock!',
      timestamp: '15 min ago',
      read: false,
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=100&h=100&fit=crop',
      actionText: 'View Product'
    }
  ]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: 'Just now',
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate receiving notifications
  useEffect(() => {
    const intervals = [
      setTimeout(() => {
        addNotification({
          type: 'price_drop',
          title: 'Price Drop Alert!',
          message: 'Red Apples now available at ₹380/kg (was ₹420/kg)',
          actionText: 'Buy Now'
        });
      }, 10000),
      
      setTimeout(() => {
        addNotification({
          type: 'farmer_message',
          title: 'Message from John Smith',
          message: 'Hi! I can do bulk pricing for orders above 10kg. Interested?',
          actionText: 'Reply'
        });
      }, 20000)
    ];

    return () => intervals.forEach(clearTimeout);
  }, []);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    clearAll
  };
}