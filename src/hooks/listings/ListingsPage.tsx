import React, { useEffect } from 'react';
import { useListings } from './useListings';
import SortSelect from '../../components/SortSelect/SortSelect';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';

interface ListingsPageProps {
  query: string;
}

const ListingsPage: React.FC<ListingsPageProps> = ({ query }) => {
  const {
    products,
    totalResults,
    sort,
    setSort,
    loadMore,
    hasMore,
    isLoading,
    error,
    refetch,
    availableFacets,
    selectedFacets,
    setFacets,
  } = useListings({ query });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex gap-6 p-4">
      <FilterSidebar
        availableFacets={availableFacets}
        selectedFacets={selectedFacets}
        onFacetChange={setFacets}
      />

      {/* Main Content */}
      <section className="flex-1" aria-label="Product listings">
        <div className="mb-4 flex justify-end">
          <SortSelect value={sort} onChange={setSort} />
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500 mb-4" role="alert">{error}</p>}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3" role="region" aria-label="Product results" aria-live="polite" aria-atomic="false">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 animate-pulse rounded-lg"
                role="status"
                aria-label="Loading product"
              />
            ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="mt-6 text-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              aria-label="Load more products"
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition-colors"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
            <p className="text-gray-600 text-sm mt-2" role="status" aria-live="polite">
              Viewing {products.length} of {totalResults} products
            </p>
          </div>
        )}
        
        {!hasMore && products.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm" role="status" aria-live="polite">
              Viewing all {totalResults} products
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ListingsPage;
