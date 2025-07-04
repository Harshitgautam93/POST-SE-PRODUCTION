import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from './auth';

// Types
export interface Influencer {
  id: string;
  name: string;
  handle: string;
  niche: string;
  followers: string;
  engagement: string;
  rating: number;
  location: string;
  priceRange: string;
  verified: boolean;
  recentWork: string[];
  platforms: string[];
  status: 'active' | 'pending' | 'inactive';
  email: string;
  bio: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  conversionRate: string;
  influencerContent: {
    name: string;
    handle: string;
    contentType: string;
    views: string;
    engagement: string;
  }[];
  inStock: boolean;
  tags: string[];
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'planning' | 'completed' | 'paused';
  progress: number;
  reach: number;
  engagement: string;
  budget: number;
  startDate: string;
  endDate: string;
  influencers: string[];
  products: string[];
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    roi: number;
  };
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

// Store interface
interface AppState {
  // Data
  influencers: Influencer[];
  products: Product[];
  campaigns: Campaign[];
  cart: CartItem[];
  // UI State
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string;
  selectedInfluencer: Influencer | null;
  selectedProduct: Product | null;
  // Actions
  fetchAll: () => Promise<void>;
  setInfluencers: (influencers: Influencer[]) => void;
  addInfluencer: (influencer: Omit<Influencer, 'id'>) => Promise<void>;
  updateInfluencer: (id: string, updates: Partial<Influencer>) => Promise<void>;
  deleteInfluencer: (id: string) => Promise<void>;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  setCampaigns: (campaigns: Campaign[]) => void;
  addCampaign: (campaign: Omit<Campaign, 'id'>) => Promise<void>;
  updateCampaign: (id: string, updates: Partial<Campaign>) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (userId: string, productId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedInfluencer: (influencer: Influencer | null) => void;
  setSelectedProduct: (product: Product | null) => void;
  setLoading: (loading: boolean) => void;
}

const API = 'http://localhost:3001/api';

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      influencers: [],
      products: [],
      campaigns: [],
      cart: [],
      isLoading: false,
      searchQuery: '',
      selectedCategory: '',
      selectedInfluencer: null,
      selectedProduct: null,

      // Fetch all data
      fetchAll: async () => {
        set({ isLoading: true });
        const headers = auth.getAuthHeaders();
        const [influencers, products, campaigns] = await Promise.all([
          fetch(`${API}/influencers`, { headers }).then(r => r.json()),
          fetch(`${API}/products`, { headers }).then(r => r.json()),
          fetch(`${API}/campaigns`, { headers }).then(r => r.json()),
        ]);
        set({ influencers, products, campaigns, isLoading: false });
      },

      // Influencer actions
      setInfluencers: (influencers) => set({ influencers }),
      addInfluencer: async (influencer) => {
        await fetch(`${API}/influencers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(influencer),
        });
        await get().fetchAll();
      },
      updateInfluencer: async (id, updates) => {
        await fetch(`${API}/influencers/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        await get().fetchAll();
      },
      deleteInfluencer: async (id) => {
        await fetch(`${API}/influencers/${id}`, { method: 'DELETE' });
        await get().fetchAll();
      },

      // Product actions
      setProducts: (products) => set({ products }),
      addProduct: async (product) => {
        await fetch(`${API}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
        await get().fetchAll();
      },
      updateProduct: async (id, updates) => {
        await fetch(`${API}/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        await get().fetchAll();
      },
      deleteProduct: async (id) => {
        await fetch(`${API}/products/${id}`, { method: 'DELETE' });
        await get().fetchAll();
      },

      // Campaign actions
      setCampaigns: (campaigns) => set({ campaigns }),
      addCampaign: async (campaign) => {
        await fetch(`${API}/campaigns`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(campaign),
        });
        await get().fetchAll();
      },
      updateCampaign: async (id, updates) => {
        await fetch(`${API}/campaigns/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        await get().fetchAll();
      },
      deleteCampaign: async (id) => {
        await fetch(`${API}/campaigns/${id}`, { method: 'DELETE' });
        await get().fetchAll();
      },

      // Cart actions
      fetchCart: async (userId) => {
        const cart = await fetch(`${API}/cart/${userId}`).then(r => r.json());
        set({ cart });
      },
      addToCart: async (userId, productId, quantity) => {
        await fetch(`${API}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, productId, quantity }),
        });
        await get().fetchCart(userId);
      },
      removeFromCart: async (itemId) => {
        await fetch(`${API}/cart/${itemId}`, { method: 'DELETE' });
        // You may want to refetch cart here if you have userId in state
      },
      updateCartQuantity: async (itemId, quantity) => {
        await fetch(`${API}/cart/${itemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity }),
        });
        // You may want to refetch cart here if you have userId in state
      },
      clearCart: () => set({ cart: [] }),

      // UI actions
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setSelectedInfluencer: (selectedInfluencer) => set({ selectedInfluencer }),
      setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
      setLoading: (isLoading) => set({ isLoading })
    }),
    {
      name: 'post-se-production-app-store',
      partialize: (state) => ({
        influencers: state.influencers,
        products: state.products,
        campaigns: state.campaigns,
        cart: state.cart
      })
    }
  )
);