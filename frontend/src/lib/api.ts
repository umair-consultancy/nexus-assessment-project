import { api } from "../api";
import type {
  BudgetTier,
  ComparisonRow,
  FilterState,
  Lab,
  Model,
  ResearchItem,
  UseCase,
  TrendingItem,
} from "./types";

const defaultFilters: FilterState = {
  search: "",
  selectedLabs: [],
  priceRange: [0, 10],
  types: [],
  sortBy: "name",
  sortOrder: "asc",
};

export function getMarketplaceModels(filters: Partial<FilterState> = {}, pageSize = 60): Model[] {
  return api.getModels({ ...defaultFilters, ...filters }, 1, pageSize).data;
}

export function getFeaturedModels(): Model[] {
  return api.getFeaturedModels();
}

export function getTrendingModels(): Model[] {
  return api.getTrendingModels();
}

export function getLabs(): Lab[] {
  return api.getLabs();
}

export function getComparisonRows(): ComparisonRow[] {
  return api.getComparison();
}

export function getBudgetTiers(): BudgetTier[] {
  return api.getBudgetTiers();
}

export function getUseCases(): UseCase[] {
  return api.getUseCases();
}

export function getResearchFeed(): ResearchItem[] {
  return api.getResearch();
}

export function getTrendingItems(): TrendingItem[] {
  return api.getTrending();
}

export function getModelById(id: string): Model | undefined {
  return api.getModelById(id);
}
