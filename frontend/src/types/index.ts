export interface Model {
  id: string;
  icon: string;
  bg: string;
  name: string;
  lab: string;
  org: string;
  desc: string;
  tags: string[];
  badge?: string;
  badgeClass?: string;
  rating?: number;
  reviews?: number;
  price: string;
  types: string[];
  priceStart?: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  trendingOrder?: number;
  variations?: Variation[];
  comparison?: ComparisonData;
  promptExamples?: PromptExample[];
}

export interface Variation {
  id: string;
  icon: string;
  name: string;
  tag: string;
  desc: string;
  ctx: string;
  speed: string;
  price: string;
  updated: string;
  badge?: string;
  benefits: string[];
}

export interface ComparisonData {
  context: string;
  input: string;
  output: string;
  multimodal: boolean;
  speed: string;
  bestFor: string;
}

export interface PromptExample {
  useCase: string;
  prompt: string;
}

export interface Lab {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ResearchItem {
  date: string;
  org: string;
  title: string;
  summary: string;
}

export interface UseCase {
  icon: string;
  title: string;
  desc: string;
  prompt: string;
  models: string[];
}

export interface ComparisonRow {
  icon: string;
  name: string;
  org: string;
  context: string;
  input: string;
  output: string;
  multimodal: boolean;
  speed: string;
  bestFor: string;
}

export interface TrendingItem {
  badge: string;
  badgeBg: string;
  badgeColor: string;
  org: string;
  title: string;
  summary: string;
}

export interface BudgetTier {
  icon: string;
  title: string;
  bg: string;
  border: string;
  color: string;
  desc: string;
  count: string;
  modelIds: string[];
}

export interface FilterState {
  search: string;
  selectedLabs: string[];
  priceRange: [number, number];
  types: string[];
  sortBy: 'name' | 'rating' | 'price' | 'recent';
  sortOrder: 'asc' | 'desc';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

export interface ChatConversation {
  id: string;
  title: string;
  modelId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  modelId: string;
  instructions: string;
  capabilities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}