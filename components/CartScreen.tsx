import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface CartScreenProps {
  cartItems: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: (items: CartItem[], total: number) => void;
}

export function CartScreen({ 
  cartItems, 
  onBack, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: CartScreenProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 1000 ? 0 : 49;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    onCheckout(cartItems, total);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-sm text-muted-foreground">{cartItems.length} items</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        // Empty Cart
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col items-center justify-center px-6 py-12"
        >
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-sm">
            Discover fresh, organic produce from local farmers and start building your cart.
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-medium transition-colors"
          >
            Start Shopping
          </motion.button>
        </motion.div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex-1 px-6 py-6">
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-border"
                >
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted/20 flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">From: {item.farmer}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-foreground">₹{item.price}/{item.unit}</span>
                        <span className="text-sm text-muted-foreground">
                          Total: ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3 bg-muted/30 rounded-xl p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-primary" />
                      </button>
                      <span className="font-bold text-foreground min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-primary" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border mt-6"
            >
              <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold text-foreground">₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className={`font-bold ${deliveryFee === 0 ? 'text-green-600' : 'text-foreground'}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                
                {deliveryFee === 0 && (
                  <div className="text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                    🎉 You saved ₹49 on delivery!
                  </div>
                )}
                
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground text-lg">Total</span>
                    <span className="font-bold text-foreground text-xl">₹{total}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Checkout Button */}
          <div className="bg-card/90 backdrop-blur-sm border-t border-border p-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              className="w-full py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-2xl font-medium shadow-lg transition-all duration-200"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}