import { createContext } from 'react';
import type { Product } from '../api/listingsClient';

export interface ComparisonContextType {
  comparedProducts: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  isComparing: (productId: string) => boolean;
  canAddMore: boolean;
  clearAll: () => void;
}

export const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);