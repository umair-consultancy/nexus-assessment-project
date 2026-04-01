import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Model, Lab, FilterState, AuthState, ChatConversation, Agent, UserPreferences } from './types';
import { api, authApi, chatApi, agentsApi } from './api';

// Auth Store
interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,

  login: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const user = await authApi.login(email, password);
      set({ isAuthenticated: true, user, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: () => {
    authApi.logout();
    set({ isAuthenticated: false, user: null, loading: false });
  },

  updatePreferences: (preferences: Partial<UserPreferences>) => {
    const state = useAuthStore.getState();
    if (state.user) {
      authApi.updatePreferences(preferences);
      set({
        user: {
          ...state.user,
          preferences: { ...state.user.preferences, ...preferences }
        }
      });
    }
  }
}));

// Models Store
interface ModelsStore {
  models: Model[];
  labs: Lab[];
  featuredModels: Model[];
  trendingModels: Model[];
  loading: boolean;
  setModels: (models: Model[]) => void;
  setLabs: (labs: Lab[]) => void;
  setFeaturedModels: (models: Model[]) => void;
  setTrendingModels: (models: Model[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useModelsStore = create<ModelsStore>((set) => ({
  models: [],
  labs: [],
  featuredModels: [],
  trendingModels: [],
  loading: false,

  setModels: (models: Model[]) => set({ models }),
  setLabs: (labs: Lab[]) => set({ labs }),
  setFeaturedModels: (featuredModels: Model[]) => set({ featuredModels }),
  setTrendingModels: (trendingModels: Model[]) => set({ trendingModels }),
  setLoading: (loading: boolean) => set({ loading })
}));

// Chat Store
interface ChatStore {
  conversations: ChatConversation[];
  currentConversation: ChatConversation | null;
  loading: boolean;
  setConversations: (conversations: ChatConversation[]) => void;
  setCurrentConversation: (conversation: ChatConversation | null) => void;
  createConversation: (modelId: string, title?: string) => ChatConversation;
  addMessage: (conversationId: string, role: 'user' | 'assistant' | 'system', content: string) => void;
  deleteConversation: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: [],
  currentConversation: null,
  loading: false,

  setConversations: (conversations: ChatConversation[]) => set({ conversations }),
  setCurrentConversation: (conversation: ChatConversation | null) => set({ currentConversation: conversation }),

  createConversation: (modelId: string, title?: string) => {
    const newConversation = chatApi.createConversation(modelId, title);
    set({
      conversations: chatApi.getConversations(),
      currentConversation: newConversation
    });
    return newConversation;
  },

  addMessage: (conversationId: string, role: 'user' | 'assistant' | 'system', content: string) => {
    chatApi.addMessage(conversationId, { role, content });
    const updatedConversations = chatApi.getConversations();
    set({
      conversations: updatedConversations,
      currentConversation: updatedConversations.find(c => c.id === conversationId) || null
    });
  },

  deleteConversation: (id: string) => {
    chatApi.deleteConversation(id);
    set({
      conversations: chatApi.getConversations(),
      currentConversation: get().currentConversation?.id === id ? null : get().currentConversation
    });
  },

  setLoading: (loading: boolean) => set({ loading })
}));

// Filter Store
interface FilterStore extends FilterState {
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  search: '',
  selectedLabs: [],
  priceRange: [0, 10],
  types: [],
  sortBy: 'name',
  sortOrder: 'asc'
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialFilters,

  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    set({ [key]: value } as unknown as Partial<FilterState>);
  },

  resetFilters: () => set(initialFilters)
}));

// Agents Store
interface AgentsStore {
  agents: Agent[];
  loading: boolean;
  setAgents: (agents: Agent[]) => void;
  createAgent: (data: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAgent: (id: string, data: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useAgentsStore = create<AgentsStore>((set) => ({
  agents: [],
  loading: false,

  setAgents: (agents: Agent[]) => set({ agents }),

  createAgent: (data: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAgent = agentsApi.createAgent(data);
    set({ agents: agentsApi.getAgents() });
  },

  updateAgent: (id: string, data: Partial<Agent>) => {
    agentsApi.updateAgent(id, data);
    set({ agents: agentsApi.getAgents() });
  },

  deleteAgent: (id: string) => {
    agentsApi.deleteAgent(id);
    set({ agents: agentsApi.getAgents() });
  },

  setLoading: (loading: boolean) => set({ loading })
}));

// Initialize data
const initializeData = () => {
  useModelsStore.getState().setModels(api.getModels({ ...initialFilters }, 1, 100).data);
  useModelsStore.getState().setLabs(api.getLabs());
  useModelsStore.getState().setFeaturedModels(api.getFeaturedModels());
  useModelsStore.getState().setTrendingModels(api.getTrendingModels());

  const authState = authApi.getAuthState();
  if (authState.isAuthenticated) {
    useAuthStore.setState({ isAuthenticated: true, user: authState.user, loading: false });
  }

  useChatStore.getState().setConversations(chatApi.getConversations());
  useAgentsStore.getState().setAgents(agentsApi.getAgents());
};

// Call initialization
if (typeof window !== 'undefined') {
  initializeData();
}
