
import React, { useEffect, useState } from 'react';
import { View } from '../types';
import { customerApi, formatPrice } from '../api';

interface OrderSuccessProps {
    onNavigate: (view: View) => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ onNavigate }) => {
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        const orderId = localStorage.getItem('last_order_id');
        if (orderId) {
            const fetchOrder = async () => {
                try {
                    const res = await customerApi.getOrders();
                    if (res.success) {
                        const lastOrder = res.data.orders.find((o: any) => o.id.toString() === orderId);
                        if (lastOrder) setOrder(lastOrder);
                    }
                } catch (error) {
                    console.error('Error fetching last order:', error);
                }
            };
            fetchOrder();
        }
    }, []);

    return (
        <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display items-center justify-center px-8 text-center bg-white dark:bg-zinc-950">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 animate-in zoom-in duration-700">
                <span className="material-symbols-outlined text-primary text-5xl">verified_user</span>
            </div>

            <div className="space-y-3 mb-10">
                <p className="text-primary text-xs font-bold tracking-[0.4em] uppercase">Order Confirmed</p>
                <h2 className="text-3xl font-serif font-bold text-charcoal dark:text-white leading-tight">
                    A Legacy Begins
                </h2>
                <p className="text-gold-muted dark:text-zinc-400 text-sm leading-relaxed max-w-[280px] mx-auto">
                    Your handcrafted masterpiece has been secured. Our artisans will now begin preparing your selection for its arrival.
                </p>
            </div>

            <div className="w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-100 dark:border-white/5 mb-10 text-left">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-200/50 dark:border-white/5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-muted">Order Number</span>
                    <span className="text-sm font-bold text-charcoal dark:text-white">{order?.order_number || '#ORD-000000'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-muted">Estimated Delivery</span>
                    <span className="text-sm font-bold text-primary">3-5 Business Days</span>
                </div>
            </div>

            <div className="w-full space-y-4">
                <button
                    onClick={() => {
                        if (order) localStorage.setItem('current_order_id', order.id);
                        onNavigate('orderDetail');
                    }}
                    className="w-full h-14 bg-primary text-background-dark font-bold tracking-widest uppercase text-xs rounded-full shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                    View Order Info
                    <span className="material-symbols-outlined text-sm">info</span>
                </button>

                <button
                    onClick={() => onNavigate('home')}
                    className="w-full h-14 bg-transparent border border-primary/20 text-primary font-bold tracking-widest uppercase text-xs rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                    Continue Discovery
                </button>
            </div>
        </div>
    );
};
