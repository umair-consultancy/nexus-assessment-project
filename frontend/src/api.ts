import { Model, Lab, ResearchItem, UseCase, ComparisonRow, TrendingItem, BudgetTier, FilterState, PaginatedResponse, ChatConversation, ChatMessage, Agent, User, AuthState } from './types';

// Import JSON data
import models from './data/models.json';
import labs from './data/labs.json';
import research from './data/research.json';
import usecases from './data/usecases.json';
import comparison from './data/comparison.json';
import trending from './data/trending.json';
import budgetTiers from './data/budget-tiers.json';

// Type assertions for imported JSON
const modelsData: Model[] = models as Model[];
const labsData: Lab[] = labs as Lab[];
const researchData: ResearchItem[] = research as ResearchItem[];
const usecasesData: UseCase[] = usecases as UseCase[];
const comparisonData: ComparisonRow[] = comparison as ComparisonRow[];
const trendingData: TrendingItem[] = trending as TrendingItem[];
const budgetTiersData: BudgetTier[] = budgetTiers as BudgetTier[];

// API Methods
export const api = {
  // Models
  getModels: (filters: FilterState, page = 1, pageSize = 20): PaginatedResponse<Model> => {
    let filtered = [...modelsData];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(searchLower) ||
        m.desc.toLowerCase().includes(searchLower) ||
        m.org.toLowerCase().includes(searchLower) ||
        m.tags.some(t => t.toLowerCase().includes(searchLower))
      );
    }

    // Lab filter
    if (filters.selectedLabs.length > 0 && !filters.selectedLabs.includes('all')) {
      filtered = filtered.filter(m => filters.selectedLabs.includes(m.lab));
    }

    // Price range filter
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10) {
      filtered = filtered.filter(m => {
        if (!m.priceStart) return true;
        return m.priceStart >= filters.priceRange[0] && m.priceStart <= filters.priceRange[1];
      });
    }

    // Type filter
    if (filters.types.length > 0) {
      filtered = filtered.filter(m => m.types.some(t => filters.types.includes(t)));
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = (b.rating || 0) - (a.rating || 0);
          break;
        case 'price':
          comparison = (a.priceStart || 0) - (b.priceStart || 0);
          break;
        case 'recent':
          comparison = 0; // Would need createdAt field
          break;
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    // Pagination
    const total = filtered.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

    return {
      data: paginatedData,
      total,
      page,
      pageSize,
      hasMore: startIndex + pageSize < total
    };
  },

  getModelById: (id: string): Model | undefined => {
    return modelsData.find(m => m.id === id);
  },

  // Labs
  getLabs: (): Lab[] => labsData,

  // Research
  getResearch: (): ResearchItem[] => researchData,

  // Use Cases
  getUseCases: (): UseCase[] => usecasesData,

  // Comparison
  getComparison: (): ComparisonRow[] => comparisonData,

  // Trending
  getTrending: (): TrendingItem[] => trendingData,

  // Budget Tiers
  getBudgetTiers: (): BudgetTier[] => budgetTiersData,

  // Featured & Trending Models
  getFeaturedModels: (): Model[] => modelsData.filter(m => m.isFeatured),
  getTrendingModels: (): Model[] => modelsData
    .filter(m => m.isTrending)
    .sort((a, b) => (a.trendingOrder || 0) - (b.trendingOrder || 0))
};

// Auth Mock (localStorage)
export const authApi = {
  getAuthState: (): AuthState => {
    const stored = localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : { isAuthenticated: false, user: null, loading: false };
  },

  setAuthState: (state: AuthState): void => {
    localStorage.setItem('auth', JSON.stringify(state));
  },

  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const user: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            avatar: '👤',
            preferences: { theme: 'light', language: 'en', notifications: true }
          };
          authApi.setAuthState({ isAuthenticated: true, user, loading: false });
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  logout: (): void => {
    localStorage.removeItem('auth');
  },

  updatePreferences: (preferences: Partial<User['preferences']>): void => {
    const state = authApi.getAuthState();
    if (state.user) {
      state.user.preferences = { ...state.user.preferences, ...preferences };
      authApi.setAuthState(state);
    }
  }
};

// Chat Mock (localStorage)
export const chatApi = {
  getConversations: (): ChatConversation[] => {
    const stored = localStorage.getItem('conversations');
    return stored ? JSON.parse(stored) : [];
  },

  saveConversations: (conversations: ChatConversation[]): void => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  },

  createConversation: (modelId: string, title?: string): ChatConversation => {
    const conversations = chatApi.getConversations();
    const newConversation: ChatConversation = {
      id: Date.now().toString(),
      title: title || 'New Conversation',
      modelId,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    conversations.unshift(newConversation);
    chatApi.saveConversations(conversations);
    return newConversation;
  },

  getConversation: (id: string): ChatConversation | undefined => {
    return chatApi.getConversations().find(c => c.id === id);
  },

  addMessage: (conversationId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage => {
    const conversations = chatApi.getConversations();
    const conv = conversations.find(c => c.id === conversationId);
    if (conv) {
      const newMessage: ChatMessage = {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      conv.messages.push(newMessage);
      conv.updatedAt = new Date().toISOString();
      chatApi.saveConversations(conversations);
      return newMessage;
    }
    throw new Error('Conversation not found');
  },

  deleteConversation: (id: string): void => {
    const conversations = chatApi.getConversations().filter(c => c.id !== id);
    chatApi.saveConversations(conversations);
  }
};

// Agents Mock (localStorage)
export const agentsApi = {
  getAgents: (): Agent[] => {
    const stored = localStorage.getItem('agents');
    return stored ? JSON.parse(stored) : [];
  },

  saveAgents: (agents: Agent[]): void => {
    localStorage.setItem('agents', JSON.stringify(agents));
  },

  createAgent: (data: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>): Agent => {
    const agents = agentsApi.getAgents();
    const newAgent: Agent = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    agents.push(newAgent);
    agentsApi.saveAgents(agents);
    return newAgent;
  },

  updateAgent: (id: string, data: Partial<Agent>): Agent | undefined => {
    const agents = agentsApi.getAgents();
    const index = agents.findIndex(a => a.id === id);
    if (index !== -1) {
      agents[index] = { ...agents[index], ...data, updatedAt: new Date().toISOString() };
      agentsApi.saveAgents(agents);
      return agents[index];
    }
    return undefined;
  },

  deleteAgent: (id: string): void => {
    const agents = agentsApi.getAgents().filter(a => a.id !== id);
    agentsApi.saveAgents(agents);
  }
};