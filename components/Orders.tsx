
import React, { useState, useEffect } from 'react';
import { customerApi, formatPrice } from '../api';
import { View } from '../types';

interface OrdersProps {
  onNavigate: (view: View) => void;
}

export const Orders: React.FC<OrdersProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await customerApi.getOrders();
        if (res.success) {
          setOrders(res.data.orders || []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const filteredOrders = orders.filter(o => {
    const isActiveStatus = ['pending', 'processing', 'shipped', 'out_for_delivery'].includes(o.status.toLowerCase());
    return activeTab === 'active' ? isActiveStatus : !isActiveStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'shipped': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'pending': return 'bg-orange-500';
      case 'processing': return 'bg-purple-500';
      default: return 'bg-zinc-500';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-32">
      {/* Segmented Control */}
      <div className="px-6 py-6">
        <div className="flex h-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 p-1 divide-x divide-zinc-200 dark:divide-zinc-700">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 h-full rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'active'
              ? 'bg-white dark:bg-primary shadow-sm text-charcoal dark:text-zinc-950'
              : 'text-gold-muted hover:text-charcoal dark:hover:text-white'
              }`}
          >
            Active Orders
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 h-full rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'history'
              ? 'bg-white dark:bg-primary shadow-sm text-charcoal dark:text-zinc-950'
              : 'text-gold-muted hover:text-charcoal dark:hover:text-white'
              }`}
          >
            Order History
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const firstItem = order.items?.[0];
            return (
              <div key={order.id} className="group flex flex-col gap-4 rounded-[2rem] bg-white dark:bg-zinc-800/50 p-6 shadow-sm border border-zinc-100 dark:border-white/5 hover:border-primary/20 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] ${getStatusColor(order.status)} text-white`}>
                        {order.status}
                      </span>
                      <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{order.order_number}</span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-charcoal dark:text-white leading-tight mt-1">
                      {firstItem ? firstItem.product_name : 'Bespoke Selection'}
                      {order.items?.length > 1 && (
                        <span className="ml-2 text-[10px] font-normal text-gold-muted">(+{order.items.length - 1} more)</span>
                      )}
                    </h3>

                    <div className="flex items-center gap-2 text-[10px] text-gold-muted italic">
                      <span className="material-symbols-outlined text-[12px]">calendar_today</span>
                      {order.order_date ? new Date(order.order_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : 'Date Unknown'}
                    </div>
                  </div>

                  {firstItem?.product_image && (
                    <div
                      className="h-20 w-20 rounded-2xl bg-cover bg-center shrink-0 border border-zinc-100 dark:border-white/5 shadow-inner group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url("${firstItem.product_image}")` }}
                    ></div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-white/5">
                  <div className="flex flex-col">
                    <p className="text-[8px] uppercase tracking-widest text-gold-muted font-bold mb-0.5">Total Value</p>
                    <p className="text-lg font-bold text-charcoal dark:text-primary leading-none">{formatPrice(order.total)}</p>
                  </div>

                  <button
                    onClick={() => {
                      localStorage.setItem('current_order_id', order.id);
                      onNavigate('orderDetail');
                    }}
                    className="flex items-center justify-center rounded-2xl h-10 px-6 bg-zinc-900 dark:bg-primary text-white dark:text-zinc-950 gap-2 text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 hover:bg-zinc-800 dark:hover:bg-primary-light"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="mt-20 flex flex-col items-center justify-center text-center px-10 space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-primary text-4xl opacity-50">shopping_bag</span>
            </div>
            <h4 className="text-xl font-serif font-bold text-charcoal dark:text-white">No {activeTab} Orders Available</h4>
            <p className="text-xs text-gold-muted dark:text-zinc-500 leading-relaxed">
              Your journey with Sultan Jewels is just beginning. Explore our masterpiece collections and find your next legacy piece.
            </p>
            <button
              onClick={() => onNavigate('collection')}
              className="mt-4 px-8 py-3 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-all"
            >
              Discover Collections
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
