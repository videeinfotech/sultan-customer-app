
import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { customerApi } from '../api';

interface AddressesProps {
    onNavigate: (view: View) => void;
}

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export const Addresses: React.FC<AddressesProps> = ({ onNavigate }) => {
    const [user, setUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'India'
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    useEffect(() => {
        const userData = localStorage.getItem('customer_user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setFormData({
                name: parsedUser.name || '',
                phone: parsedUser.phone || '',
                address: parsedUser.address || '',
                city: parsedUser.city || '',
                state: parsedUser.state || '',
                zip: parsedUser.zip || '',
                country: parsedUser.country || 'India'
            });
        }
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.state) {
            setToast({ message: 'Please select a state.', type: 'error' });
            return;
        }
        try {
            setLoading(true);
            const res = await customerApi.updateProfile(formData);
            if (res.success) {
                // Update local storage with fresh data from server
                const updatedUser = res.data.user;
                localStorage.setItem('customer_user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setIsEditing(false);
                setToast({ message: 'Address updated with distinction.', type: 'success' });
            }
        } catch (error: any) {
            setToast({ message: error.message || 'Failed to update address.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-32">
            {/* Toast */}
            {toast && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px] animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className={`p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${toast.type === 'success' ? 'bg-white/90 dark:bg-zinc-900/90 border-primary/20 text-charcoal' : 'bg-red-50/90 border-red-200 text-red-600'
                        }`}>
                        <p className="text-xs font-bold tracking-wide text-center">{toast.message}</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 justify-between border-b border-primary/5">
                <button onClick={() => onNavigate('checkout')} className="size-12 flex items-center justify-center text-charcoal dark:text-white active:scale-90 transition-transform">
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </button>
                <h2 className="text-lg font-serif font-bold tracking-tight">Shipping Address</h2>
                <div className="w-12"></div>
            </div>

            {!isEditing ? (
                <div className="p-4 flex flex-col gap-6">
                    <div className="bg-white dark:bg-zinc-800 rounded-3xl p-6 border border-zinc-100 dark:border-white/5 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="bg-primary/10 text-primary text-[9px] px-2 py-0.5 rounded font-bold uppercase">Default</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">home</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest">Main Residence</p>
                                    <p className="text-xs text-gold-muted">{user?.name}</p>
                                </div>
                            </div>

                            <div className="space-y-1 text-sm text-gold-muted leading-relaxed">
                                <p>{user?.address || 'Address not set'}</p>
                                <p>{user?.city}{user?.city && user?.state ? ', ' : ''}{user?.state} {user?.zip}</p>
                                <p>{user?.country || 'India'}</p>
                                <p className="pt-2 font-noto text-xs font-medium">{user?.phone}</p>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full mt-4 py-4 rounded-2xl border border-primary/20 text-primary font-bold text-xs uppercase tracking-[0.2em] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">edit</span>
                                Modify Information
                            </button>
                        </div>
                    </div>

                    <button className="py-5 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 text-zinc-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">add</span>
                        Add New Address
                    </button>
                </div>
            ) : (
                <div className="p-4">
                    <form onSubmit={handleUpdate} className="flex flex-col gap-5">
                        <div className="bg-white dark:bg-zinc-800 rounded-3xl p-6 border border-zinc-100 dark:border-white/5 shadow-sm space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-gold-muted ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-gold-muted ml-1">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    placeholder="+91 xxxxx xxxxx"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-gold-muted ml-1">Street Address</label>
                                <textarea
                                    rows={3}
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                                    placeholder="Street name, Area, Colony"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gold-muted ml-1">City</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-900/50 border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gold-muted ml-1">State</label>
                                    <select
                                        value={formData.state}
                                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-900/50 border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
                                        required
                                    >
                                        <option value="">Select State</option>
                                        {INDIAN_STATES.map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gold-muted ml-1">Postal Code</label>
                                    <input
                                        type="text"
                                        value={formData.zip}
                                        onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-900/50 border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gold-muted ml-1">Country</label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                                        className="w-full bg-zinc-50 dark:bg-zinc-900/50 border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="flex-1 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-charcoal font-bold text-xs uppercase tracking-widest active:scale-[0.98] transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-[2] py-4 rounded-2xl bg-primary text-[#181611] font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Confirm Update'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
