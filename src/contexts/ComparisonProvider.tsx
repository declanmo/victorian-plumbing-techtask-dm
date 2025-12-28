import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../api/listingsClient';
import { ComparisonContext } from './comparisonContext';

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    if (comparedProducts.length < 5 && !comparedProducts.find(p => p.id === product.id)) {
      setComparedProducts(prev => [...prev, product]);
    }
  };

  const removeProduct = (productId: string) => {
    setComparedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const isComparing = (productId: string) => {
    return comparedProducts.some(p => p.id === productId);
  };

  const clearAll = () => {
    setComparedProducts([]);
  };

  const canAddMore = comparedProducts.length < 5;

  return (
    <ComparisonContext.Provider 
        value={{
        comparedProducts,
        addProduct,
        removeProduct,
        isComparing,
        canAddMore,
        clearAll,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}
