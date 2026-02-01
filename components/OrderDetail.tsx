
import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { customerApi, formatPrice } from '../api';

interface OrderDetailProps {
    onNavigate: (view: View) => void;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ onNavigate }) => {
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const orderId = localStorage.getItem('current_order_id');
        if (!orderId) {
            onNavigate('orders');
            return;
        }

        const fetchOrderDetail = async () => {
            try {
                setLoading(true);
                const res = await customerApi.getOrders();
                if (res.success) {
                    const target = res.data.orders.find((o: any) => o.id.toString() === orderId);
                    setOrder(target);
                }
            } catch (error) {
                console.error('Error fetching order detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetail();
    }, [onNavigate]);

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'shipped': return 'text-blue-500 bg-blue-500/10';
            case 'delivered': return 'text-green-500 bg-green-500/10';
            case 'cancelled': return 'text-red-500 bg-red-500/10';
            case 'pending': return 'text-orange-500 bg-orange-500/10';
            case 'processing': return 'text-purple-500 bg-purple-500/10';
            default: return 'text-zinc-500 bg-zinc-500/10';
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background-light dark:bg-background-dark">
                <p className="text-gold-muted mb-4">Order not found.</p>
                <button onClick={() => onNavigate('orders')} className="text-primary font-bold">Back to Orders</button>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-10">
            {/* Header */}
            <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 justify-between border-b border-primary/5">
                <button onClick={() => onNavigate('orders')} className="size-12 flex items-center justify-center text-charcoal dark:text-white active:scale-90 transition-transform">
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </button>
                <h2 className="text-lg font-serif font-bold tracking-tight">Order Details</h2>
                <div className="w-12"></div>
            </div>

            <div className="p-4 space-y-6">
                {/* Status Card */}
                <div className="bg-white dark:bg-zinc-800 rounded-3xl p-6 border border-zinc-100 dark:border-white/5 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div className="space-y-1">
                            <p className="text-xs text-gold-muted font-bold uppercase tracking-[0.2em]">{order.order_number}</p>
                            <h3 className="text-lg font-serif font-bold text-charcoal dark:text-white">Tracking Status</h3>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                    </div>

                    <div className="relative pl-8 space-y-8">
                        <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-zinc-100 dark:bg-zinc-700"></div>

                        <div className="relative">
                            <div className="absolute -left-[23px] top-1 size-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
                            <p className="text-xs font-bold text-charcoal dark:text-white">Order Placed</p>
                            <p className="text-[10px] text-gold-muted">{new Date(order.order_date).toLocaleString()}</p>
                        </div>

                        <div className="relative opacity-50">
                            <div className="absolute -left-[23px] top-1 size-3 rounded-full bg-zinc-200 dark:bg-zinc-600"></div>
                            <p className="text-xs font-bold text-charcoal dark:text-white">In Preparation</p>
                            <p className="text-[10px] text-gold-muted">Our artisans are curating your order</p>
                        </div>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white dark:bg-zinc-800 rounded-3xl p-6 border border-zinc-100 dark:border-white/5 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                        </div>
                        <h3 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest">Shipping To</h3>
                    </div>
                    <p className="text-sm text-gold-muted leading-relaxed italic">
                        {order.shipping_address}
                    </p>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                    <h3 className="px-2 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Items Portfolio</h3>
                    {order.items?.map((item: any, i: number) => (
                        <div key={i} className="bg-white dark:bg-zinc-800 rounded-2xl p-4 border border-zinc-100 dark:border-white/5 shadow-sm flex gap-4">
                            {item.product_image && (
                                <div
                                    className="size-20 rounded-xl bg-cover bg-center border border-zinc-100 dark:border-white/5"
                                    style={{ backgroundImage: `url("${item.product_image}")` }}
                                ></div>
                            )}
                            <div className="flex-1 flex flex-col justify-center gap-1">
                                <h4 className="text-sm font-bold text-charcoal dark:text-white line-clamp-1">{item.product_name}</h4>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-gold-muted">Qty: {item.quantity}</p>
                                    <p className="text-sm font-bold text-primary">{formatPrice(item.total)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price Summary */}
                <div className="bg-zinc-900 dark:bg-zinc-800 rounded-3xl p-6 text-white overflow-hidden relative shadow-2xl">
                    <div className="relative z-10 space-y-3">
                        <div className="flex justify-between text-xs">
                            <span className="opacity-60">Subtotal Value</span>
                            <span>{formatPrice(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="opacity-60">Shipping & Insurance</span>
                            <span className="text-green-400">Complimentary</span>
                        </div>
                        {order.b2b_discount_applied && (
                            <div className="flex justify-between text-xs">
                                <span className="opacity-60">B2B Privilege Discount ({order.b2b_discount_percentage}%)</span>
                                <span className="text-primary italic">Applied</span>
                            </div>
                        )}
                        <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">Total Investment</p>
                                <p className="text-2xl font-bold tracking-tight">{formatPrice(order.total)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] uppercase font-bold tracking-widest opacity-40 italic">Secure Payment</p>
                                <p className="text-[10px] font-bold">Credit Card</p>
                            </div>
                        </div>
                    </div>
                    {/* Subtle decorative element */}
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="material-symbols-outlined !text-6xl">diamond</span>
                    </div>
                </div>

                <button
                    onClick={() => window.location.href = `mailto:concierge@sultanjewels.com?subject=Inquiry for Order ${order.order_number}`}
                    className="w-full py-5 rounded-3xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-white/5 text-charcoal dark:text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                >
                    <span className="material-symbols-outlined text-sm">support_agent</span>
                    Contact Concierge
                </button>
            </div>
        </div>
    );
};
