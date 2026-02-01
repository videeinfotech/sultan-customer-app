
export const formatPrice = (price: number | string) => {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return `₹${Math.round(num || 0).toLocaleString('en-IN')}`;
};

// Automatically detect if running locally or on production
const isLocalhost = window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]';

const BASE_URL = isLocalhost
    ? 'http://localhost:8000/api/v1'
    : 'https://sultan.quicdeal.in/api/v1';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('customer_token');

    const headers: any = {
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...((options.headers as any) || {}),
    };

    // Only set Content-Type if not FormData (Fetch automatically handles boundary for FormData)
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem('customer_token');
        // We might want to trigger a logout in the app state instead of just reloading
        // but for now, this matches the super-admin pattern if that's what's desired.
    }

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.message || 'Something went wrong') as any;
        error.errors = data.errors;
        throw error;
    }

    return data;
};

export const customerApi = {
    // Auth
    login: (credentials: any) => apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
    register: (data: any) => apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    loginWithOtp: (data: { mobile: string; otp: string }) => apiFetch('/auth/login-otp', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    sendOtp: (mobile: string) => apiFetch('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ mobile }),
    }),
    getUser: () => apiFetch('/user'),
    updateProfile: (data: any) => apiFetch('/user', { method: 'PUT', body: JSON.stringify(data) }),
    checkout: (data: any) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) }),

    // Products & Categories
    getProducts: (params: string = '') => apiFetch(`/products${params}`),
    getProduct: (id: string | number) => apiFetch(`/products/${id}`),
    getCategories: () => apiFetch('/categories'),
    searchProducts: (query: string) => apiFetch(`/products/search?q=${query}`),

    // Banners
    getBanners: () => apiFetch('/banners'),

    // Cart
    getCart: () => apiFetch('/cart'),
    addToCart: (data: {
        product_id: number;
        quantity: number;
        unit_price: number;
        selected_metal_id?: number;
        selected_metal_name?: string;
        selected_metal_price?: number;
        selected_shape_id?: number;
        selected_shape_name?: string;
        gst_amount?: number;
        size?: string;
    }) => apiFetch('/cart', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    updateCartItem: (id: number, quantity: number) => apiFetch(`/cart/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
    }),
    removeCartItem: (id: number) => apiFetch(`/cart/${id}`, { method: 'DELETE' }),
    clearCart: () => apiFetch('/cart', { method: 'DELETE' }),

    // Orders
    getOrders: () => apiFetch('/orders'),
    getOrder: (id: string | number) => apiFetch(`/orders/${id}`),
    createOrder: (data: any) => apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    // Auctions
    getAuctions: (page: number = 1) => apiFetch(`/auctions?page=${page}`),
    getAuction: (id: string | number) => apiFetch(`/auctions/${id}`),
    placeBid: (id: string | number, amount: number) => apiFetch(`/auctions/${id}/bid`, {
        method: 'POST',
        body: JSON.stringify({ amount }),
    }),
    getMyBids: () => apiFetch('/auctions/my-bids'),

    // Contests
    getContests: () => apiFetch('/contests'),
    getContest: (id: string | number) => apiFetch(`/contests/${id}`),
    participateInContest: (id: string | number, data: FormData) => apiFetch(`/contests/${id}/participate`, {
        method: 'POST',
        body: data,
    }),
    getMyEntries: () => apiFetch('/contests/my-entries'),

    // Payment
    getPaymentGateways: () => apiFetch('/payment-gateways'),

    // Wishlist
    getWishlist: () => apiFetch('/wishlist'),
    addToWishlist: (productId: number) => apiFetch('/wishlist', {
        method: 'POST',
        body: JSON.stringify({ product_id: productId }),
    }),
    removeFromWishlist: (productId: number) => apiFetch(`/wishlist/${productId}`, {
        method: 'DELETE',
    }),
};
