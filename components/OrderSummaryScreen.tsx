import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
  image: string;
  farmer: string;
}

interface OrderSummaryScreenProps {
  items: OrderItem[];
  onBack: () => void;
  onConfirmOrder: (paymentMethod: string, items: OrderItem[], total: number) => void;
}

type PaymentMethod = 'upi' | 'cod' | 'card';

export function OrderSummaryScreen({ items, onBack, onConfirmOrder }: OrderSummaryScreenProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('upi');
  const [isConfirming, setIsConfirming] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 1000 ? 0 : 49;
  const platformFee = Math.round(subtotal * 0.02); // 2% platform fee
  const total = subtotal + deliveryFee + platformFee;

  const handleConfirmOrder = () => {
    setIsConfirming(true);
    setTimeout(() => {
      onConfirmOrder(selectedPayment, items, total);
      setIsConfirming(false);
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'upi' as PaymentMethod,
      name: 'UPI',
      description: 'Pay with Google Pay, PhonePe, Paytm',
      icon: Smartphone,
      recommended: true
    },
    {
      id: 'cod' as PaymentMethod,
      name: 'Cash on Delivery',
      description: 'Pay when you receive the order',
      icon: Banknote,
      recommended: false
    },
    {
      id: 'card' as PaymentMethod,
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: CreditCard,
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#E8F5E8]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[#4CAF50]/10 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-[#4CAF50]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#2E7D32]">Order Summary</h1>
            <p className="text-sm text-[#4CAF50]">{items.length} items</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50"
        >
          <h2 className="font-bold text-[#2E7D32] mb-4">Your Order</h2>
          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-4 pb-4 border-b border-[#4CAF50]/10 last:border-b-0 last:pb-0"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#4CAF50]/10">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-[#2E7D32]">{item.name}</h3>
                  <p className="text-sm text-[#4CAF50]">From: {item.farmer}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-[#4CAF50]">
                      Qty: {item.quantity} {item.unit} × ₹{item.price}
                    </span>
                    <span className="font-bold text-[#2E7D32]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bill Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50"
        >
          <h2 className="font-bold text-[#2E7D32] mb-4">Bill Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#4CAF50]">Item Total</span>
              <span className="font-bold text-[#2E7D32]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4CAF50]">Delivery Fee</span>
              <span className={`font-bold ${deliveryFee === 0 ? 'text-green-600' : 'text-[#2E7D32]'}`}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4CAF50]">Platform Fee</span>
              <span className="font-bold text-[#2E7D32]">₹{platformFee}</span>
            </div>
            {deliveryFee === 0 && (
              <div className="text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                🎉 You saved ₹49 on delivery!
              </div>
            )}
            <div className="border-t border-[#4CAF50]/20 pt-3 mt-3">
              <div className="flex justify-between">
                <span className="font-bold text-[#2E7D32] text-lg">Total Amount</span>
                <span className="font-bold text-[#2E7D32] text-xl">₹{total}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50"
        >
          <h2 className="font-bold text-[#2E7D32] mb-4">Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <motion.button
                  key={method.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
                    selectedPayment === method.id
                      ? 'border-[#4CAF50] bg-[#4CAF50]/5'
                      : 'border-[#4CAF50]/20 bg-transparent hover:border-[#4CAF50]/40'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedPayment === method.id ? 'bg-[#4CAF50] text-white' : 'bg-[#4CAF50]/10 text-[#4CAF50]'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-[#2E7D32]">{method.name}</h3>
                        {method.recommended && (
                          <span className="bg-[#FFD54F] text-[#2E7D32] px-2 py-1 rounded-full text-xs font-medium">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#4CAF50] mt-1">{method.description}</p>
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === method.id
                        ? 'border-[#4CAF50] bg-[#4CAF50]'
                        : 'border-[#4CAF50]/30'
                    }`}>
                      {selectedPayment === method.id && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Confirm Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-[#4CAF50]/20 p-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleConfirmOrder}
          disabled={isConfirming}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg transition-all duration-200 ${
            isConfirming
              ? 'bg-[#FFD54F] text-[#2E7D32]'
              : 'bg-[#4CAF50] hover:bg-[#2E7D32] text-white'
          }`}
        >
          {isConfirming ? (
            <>
              <div className="w-5 h-5 border-2 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Order...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Confirm Order ₹{total}</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Bottom padding */}
      <div className="h-24"></div>
    </div>
  );
}