
import React from 'react';

export const Auctions: React.FC = () => {
  const auctions = [
    {
      title: 'Pear Drop Diamond',
      price: '$24,500',
      startPrice: 'Starts at $18k',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvvCEJ1WeRGneQq7N1X60az1VJ_5_z_sQc7FQVYE2buPegqEq-jQEHVRmtr5s00UuWSGyaCF7I40FjbAEk87GoXLX_zPoISa5TGsu7Ji4sZ4-5ugptvY9pT1B5bzh99KogqdVyOW4PS_77y5vtBsu-Kvefx-w98lVniNUVSwpF_wwMO5QGsYfYvBfI2Ln04xYxLzuSh7ZvMI-O_0BUGimuvNlJnbX1rMGMbgzfLYd4aLyzJPl19oFlCGNCxdBR4YnH1FMUzmWgmQPd',
      status: 'Live'
    },
    {
      title: 'Imperial Canary Ring',
      price: '$12,200',
      startPrice: 'Starts at $10k',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy5uKsdTJvtQDVWeEB8yPh8fWp8pAmuQbwoqw-E8zIdrErBa641KlPs9sdSCG8AAc3egUsDgy_h0ECYgpT-Bu-hbl1HH9c7MNc-yhiGNDnUIZS3Qed1_OMyEs0syfLyP_zdMf492y94W01C-GLbB46prDopQtNq4NzipO8NqiKctBxOmpqUnv80Kk_z0d8z1UoWeRw_a6tsq7fi4lsB2YirAw-SaDKThgncf9NXQGz3XrF-8nTny3s1wMUD8j4e4tTOj3etIWGXmjP',
      status: 'Live'
    },
    {
      title: 'Royal Eternity Cuff',
      price: '$8,900',
      startPrice: 'Starts at $7k',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtIsdrvkhRNn83EE398bAb6dpBuGUkN5DZVkfC0Zlerw9RvxNHlcTa0_WwTGJeMTd_rMehpPraAly6CXKBiDhaeNtlRlugaNvSVa54If9DJq_iKYJLbm-Ha9wI9PvPh7woGvVe_NdFljJDttwN-OTK7aZzbJekzFhddhb9PwIOC_7I4e1LwZTbVqBRRMDzfv6YiFPzbVBaZOiTVzJadvCzqgPc3pYMt8AH6IKqxQkPFyEt0sSik7pNPCubz7A4qHTzkIYXPYIivkpw',
      status: 'Live'
    },
    {
      title: 'Solitaire Studs 2ct',
      price: '$5,400',
      startPrice: 'Starts at $4k',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlsXDUPWcfIS1oaSw2iEJg0fSV8ns9gyEy22clOmnoEsxVYaNR1HCZi3qbhdKqmKvti6ILV2X03TkuCJBVlA3TWDy7U0_qYHVwomxaOIxQ-SHXeDkFs1lYQ65qvtBZNB1X2HM3etIoHRjiQRIt_CEHYzLHx77BYZ4bBzaHTHYXk41xgRron58juLJN3fb8aWn83V4e3IESoEnoZRq-Xxed-iClpraDwEGtXMB-2FDF_VUcQF4FoyT7WmWRncixBLXFlVdnTihGWfkU',
      status: 'Live'
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-32 font-noto">
      {/* Live Countdown Summary */}
      <div className="px-4 pt-6">
        <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
          <p className="text-charcoal dark:text-white text-[10px] font-bold uppercase tracking-widest text-center mb-3">Elite Collection Ends In</p>
          <div className="flex gap-4 justify-center">
            {[
              { val: '04', label: 'HOURS' },
              { val: '22', label: 'MINS' },
              { val: '18', label: 'SECS', active: true }
            ].map((time, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-zinc-800 shadow-sm ${time.active ? 'border border-primary/40' : ''}`}>
                  <p className={`text-lg font-bold ${time.active ? 'text-primary' : 'text-charcoal dark:text-white'}`}>{time.val}</p>
                </div>
                <p className="text-gold-muted text-[10px] mt-1 font-bold">{time.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auction Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {auctions.map((auc, i) => (
          <div key={i} className="flex flex-col bg-white dark:bg-zinc-800/50 rounded-xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 transition-transform active:scale-[0.98]">
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <img src={auc.img} className="w-full h-full object-cover" alt={auc.title} />
              <div className="absolute top-2 left-2 bg-primary px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                <span className="size-1.5 rounded-full bg-white animate-pulse"></span>
                <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Live</span>
              </div>
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-charcoal dark:text-white text-sm font-bold leading-tight mb-1 truncate">{auc.title}</h3>
              <div className="mb-3">
                <p className="text-primary text-base font-bold leading-none">{auc.price}</p>
                <p className="text-gold-muted text-[10px] font-medium">{auc.startPrice}</p>
              </div>
              <button className="mt-auto w-full py-2 border border-primary text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all">
                View Auction
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination/Load More */}
      <div className="flex justify-center p-8">
        <button className="flex items-center gap-2 px-6 py-3 bg-[#181611] dark:bg-primary text-white dark:text-[#181611] rounded-full text-sm font-bold tracking-wide active:scale-95 transition-transform">
          Load More Pieces
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
      </div>
    </div>
  );
};
