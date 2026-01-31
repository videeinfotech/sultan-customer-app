
import React, { useState } from 'react';

export const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const orders = [
    {
      id: 'ORD-99281',
      date: 'Oct 24, 2023',
      title: '18k Gold Diamond Ring',
      price: '$2,450.00',
      status: 'Shipped',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrvsxKSh5JEhFMRQLA5KyqCM3N1JYXK1_nmQ_EOjkCl81eyK0IFJ_i9esGYvmcw7p15mQQsCHeh1i_ty2lZtyjOu4urEQRHyqIZBgQ7KffYle5Wf4t3h0Ae7tmtfhqI_O6u6hFlqj-k3xGtucoFRCa2VzHCl2mga2q8C7dKPGzI7Jxjqq5c01SUMP1bE6g4YSCDicxf0jY_Wi09V7ylfnybOzx12M5djqc1DlAvDUDi1nr8Vzx1vqANliy_hpfNenys2EZnh4taCGl',
      type: 'active'
    },
    {
      id: 'ORD-88172',
      date: 'Sep 15, 2023',
      title: 'Solitaire Diamond Necklace',
      price: '$1,890.00',
      status: 'Delivered',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSV1yvhPp7df-jI8OfmNrUGEK6lg96vHm2UGWn4YuZTf4GFuw08_2KphuwhtLv3_aqdX1JgpkfACalwkFA8_ydEQErcZEbIxj0umDsoUeWzNoeT7IiW6kVLgx07uIQb5XbecmZGSqtShp9-7TUgwC9TDZ70VLpH-I4ny5dsUmofzUf_QAyJEFuOnRvgC7VBbt1MrKsWTobaltE4a-FIi0lxd8C1RhTU2KYBacPJzGN_mACIkgnIZWNV0XZTehbOTlhxMrFWJy5Wxmq',
      type: 'history'
    }
  ];

  const filteredOrders = orders.filter(o => o.type === activeTab || (activeTab === 'history' && o.type === 'history'));

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-32">
      {/* Segmented Control */}
      <div className="px-4 py-6">
        <div className="flex h-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 h-full rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'active' 
                ? 'bg-white dark:bg-primary shadow-sm text-charcoal dark:text-[#181611]' 
                : 'text-gold-muted'
            }`}
          >
            Active Orders
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 h-full rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'history' 
                ? 'bg-white dark:bg-primary shadow-sm text-charcoal dark:text-[#181611]' 
                : 'text-gold-muted'
            }`}
          >
            Order History
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="flex flex-col gap-4 rounded-xl bg-white dark:bg-zinc-800 p-4 shadow-sm border border-zinc-100 dark:border-zinc-700">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    order.status === 'Shipped' ? 'bg-primary text-white' : 'bg-green-500 text-white'
                  }`}>
                    {order.status}
                  </span>
                  <h3 className="text-sm font-bold text-charcoal dark:text-white mt-2">{order.title}</h3>
                  <p className="text-gold-muted text-[10px]">#{order.id} • {order.date}</p>
                </div>
                <div 
                  className="h-20 w-20 rounded-lg bg-cover bg-center shrink-0 border border-zinc-100 dark:border-zinc-700" 
                  style={{ backgroundImage: `url("${order.img}")` }}
                ></div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-zinc-50 dark:border-zinc-700">
                <p className="text-base font-extrabold text-charcoal dark:text-primary">{order.price}</p>
                <div className="flex gap-2">
                  {order.status === 'Shipped' ? (
                    <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary/10 text-primary gap-2 text-[11px] font-bold transition-transform active:scale-95">
                      <span className="material-symbols-outlined text-sm">local_shipping</span>
                      <span>Track Order</span>
                    </button>
                  ) : (
                    <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary text-[#181611] gap-2 text-[11px] font-bold transition-transform active:scale-95">
                      Buy Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center text-center px-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">shopping_bag</span>
            </div>
            <h4 className="text-lg font-bold">No {activeTab} orders</h4>
            <p className="text-xs text-gold-muted dark:text-zinc-400 mt-2">Explore our latest collection of handcrafted masterpieces.</p>
          </div>
        )}
      </div>
    </div>
  );
};
